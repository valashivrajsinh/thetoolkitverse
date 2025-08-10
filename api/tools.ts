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

  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const tools = await aiService.findTools(query);
    res.status(200).json(tools);
  } catch (error) {
    console.error('Error in /api/tools:', error);
    res.status(500).json({ error: 'Failed to find tools' });
  }
}
