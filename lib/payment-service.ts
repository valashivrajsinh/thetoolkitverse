import Razorpay from 'razorpay';
import { createHash, randomBytes } from 'crypto';
import { getDynamoDb, Tables } from '../lib/dynamodb';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

interface PaymentOrder {
    id: string;
    amount: number;
    currency: string;
    userId: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: string;
    paymentId?: string;
}

export class PaymentService {
    private db = getDynamoDb();

    private generateSignature(orderId: string, paymentId: string): string {
        const secret = process.env.RAZORPAY_KEY_SECRET || '';
        const payload = orderId + '|' + paymentId;
        return createHash('sha256')
            .update(payload)
            .digest('hex');
    }

    private validateSignature(orderId: string, paymentId: string, signature: string): boolean {
        const expectedSignature = this.generateSignature(orderId, paymentId);
        return expectedSignature === signature;
    }

    async createPaymentOrder(amount: number, currency: string, userId: string): Promise<PaymentOrder> {
        try {
            const order = await razorpay.orders.create({
                amount: amount * 100, // Convert to smallest currency unit
                currency,
                receipt: `receipt_${randomBytes(8).toString('hex')}`,
                notes: {
                    userId
                }
            });

            const paymentOrder: PaymentOrder = {
                id: order.id,
                amount,
                currency,
                userId,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Store order in DynamoDB
            await this.db.put({
                TableName: Tables.PAYMENTS,
                Item: paymentOrder
            }).promise();

            return paymentOrder;
        } catch (error) {
            console.error('Error creating payment order:', error);
            throw new Error('Failed to create payment order');
        }
    }

    async verifyPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {
        try {
            // Verify signature
            if (!this.validateSignature(orderId, paymentId, signature)) {
                throw new Error('Invalid payment signature');
            }

            // Get order from DynamoDB
            const order = await this.db.get({
                TableName: Tables.PAYMENTS,
                Key: { id: orderId }
            }).promise();

            if (!order.Item) {
                throw new Error('Order not found');
            }

            // Update order status
            await this.db.update({
                TableName: Tables.PAYMENTS,
                Key: { id: orderId },
                UpdateExpression: 'SET #status = :status, paymentId = :paymentId',
                ExpressionAttributeNames: {
                    '#status': 'status'
                },
                ExpressionAttributeValues: {
                    ':status': 'completed',
                    ':paymentId': paymentId
                }
            }).promise();

            return true;
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw new Error('Payment verification failed');
        }
    }
}
