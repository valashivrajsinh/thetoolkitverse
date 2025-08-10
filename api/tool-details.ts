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

  const { tool } = req.query;

  if (!tool || typeof tool !== 'string') {
    return res.status(400).json({ error: 'Tool parameter is required' });
  }

  try {
    const details = await aiService.getToolDetails(tool);
    res.status(200).json(details);
  } catch (error) {
    console.error('Error in /api/tool-details:', error);
    res.status(500).json({ error: 'Failed to get tool details' });
  }
}
