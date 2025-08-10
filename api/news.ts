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

  try {
    const news = await aiService.getNews();
    res.status(200).json(news);
  } catch (error) {
    console.error('Error in /api/news:', error);
    res.status(500).json({ error: 'Failed to get news' });
  }
}
