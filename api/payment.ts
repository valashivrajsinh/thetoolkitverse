import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PaymentService } from '../lib/payment-service';
import { rateLimit } from '../lib/rate-limit';
import { validateRequest } from '../lib/security';

const paymentService = new PaymentService();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(req);
    if (!rateLimitResult.success) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    // Validate request headers and origin
    const validationResult = validateRequest(req);
    if (!validationResult.success) {
      return res.status(403).json({ error: validationResult.error });
    }

    if (req.method === 'POST' && req.url?.includes('/create')) {
      const { amount, currency, userId } = req.body;
      
      if (!amount || !currency || !userId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const order = await paymentService.createPaymentOrder(amount, currency, userId);
      return res.status(200).json(order);
    }

    if (req.method === 'POST' && req.url?.includes('/verify')) {
      const { orderId, paymentId, signature } = req.body;
      
      if (!orderId || !paymentId || !signature) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const verified = await paymentService.verifyPayment(orderId, paymentId, signature);
      return res.status(200).json({ success: verified });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in payment API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
