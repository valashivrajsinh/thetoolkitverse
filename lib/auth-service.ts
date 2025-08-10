import { getDynamoDb, Tables } from './dynamodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    plan: 'free' | 'premium';
    createdAt: string;
    lastLoginAt?: string;
}

interface UserResponse {
    id: string;
    email: string;
    name: string;
    plan: 'free' | 'premium';
    token?: string;
}

export class AuthService {
    private db = getDynamoDb();
    private readonly JWT_SECRET = process.env.JWT_SECRET || '';
    private readonly SALT_ROUNDS = 10;

    private generateToken(userId: string): string {
        return jwt.sign({ userId }, this.JWT_SECRET, {
            expiresIn: '7d'
        });
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    private async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async signup(email: string, password: string, name: string): Promise<UserResponse> {
        // Check if user already exists
        const existingUser = await this.db.query({
            TableName: Tables.USERS,
            IndexName: 'email-index',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        }).promise();

        if (existingUser.Items && existingUser.Items.length > 0) {
            throw new Error('User already exists with this email');
        }

        const hashedPassword = await this.hashPassword(password);
        const userId = uuidv4();

        const user: User = {
            id: userId,
            email,
            password: hashedPassword,
            name,
            plan: 'free',
            createdAt: new Date().toISOString()
        };

        await this.db.put({
            TableName: Tables.USERS,
            Item: user
        }).promise();

        const token = this.generateToken(userId);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            plan: user.plan,
            token
        };
    }

    async login(email: string, password: string): Promise<UserResponse> {
        const result = await this.db.query({
            TableName: Tables.USERS,
            IndexName: 'email-index',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        }).promise();

        if (!result.Items || result.Items.length === 0) {
            throw new Error('Invalid email or password');
        }

        const user = result.Items[0] as User;
        const isValidPassword = await this.comparePasswords(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Update last login time
        await this.db.update({
            TableName: Tables.USERS,
            Key: { id: user.id },
            UpdateExpression: 'SET lastLoginAt = :now',
            ExpressionAttributeValues: {
                ':now': new Date().toISOString()
            }
        }).promise();

        const token = this.generateToken(user.id);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            plan: user.plan,
            token
        };
    }

    async verifyToken(token: string): Promise<UserResponse | null> {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
            const result = await this.db.get({
                TableName: Tables.USERS,
                Key: { id: decoded.userId }
            }).promise();

            if (!result.Item) {
                return null;
            }

            const user = result.Item as User;
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                plan: user.plan
            };
        } catch (error) {
            return null;
        }
    }

    async updateUserPlan(userId: string, plan: 'free' | 'premium'): Promise<void> {
        await this.db.update({
            TableName: Tables.USERS,
            Key: { id: userId },
            UpdateExpression: 'SET plan = :plan',
            ExpressionAttributeValues: {
                ':plan': plan
            }
        }).promise();
    }
}
