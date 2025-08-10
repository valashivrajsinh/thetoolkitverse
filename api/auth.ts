import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AuthService } from '@/lib/auth-service';
import { validateRequest } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';

const authService = new AuthService();

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

    if (req.method === 'POST' && req.url?.includes('/signup')) {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await authService.signup(email, password, name);
      return res.status(201).json(user);
    }

    if (req.method === 'POST' && req.url?.includes('/login')) {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await authService.login(email, password);
      return res.status(200).json(user);
    }

    if (req.method === 'GET' && req.url?.includes('/verify')) {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const user = await authService.verifyToken(token);
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      return res.status(200).json(user);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('User already exists')) {
        return res.status(409).json({ error: error.message });
      }
      if (error.message.includes('Invalid email or password')) {
        return res.status(401).json({ error: error.message });
      }
    }
    console.error('Error in auth API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
