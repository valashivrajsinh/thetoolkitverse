import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AIService } from '@/lib/ai-service';

const aiService = new AIService();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { tool1, tool2 } = req.query;

  if (!tool1 || !tool2 || typeof tool1 !== 'string' || typeof tool2 !== 'string') {
    return res.status(400).json({ error: 'Both tool1 and tool2 parameters are required' });
  }

  try {
    const comparison = await aiService.compareTools(tool1, tool2);
    res.status(200).json(comparison);
  } catch (error) {
    console.error('Error in /api/compare:', error);
    res.status(500).json({ error: 'Failed to compare tools' });
  }
}
