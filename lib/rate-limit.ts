import type { VercelRequest } from '@vercel/node';
import { getDynamoDb } from './dynamodb';

interface RateLimitResult {
  success: boolean;
  remaining?: number;
  reset?: number;
}

// Rate limiting using DynamoDB
export async function rateLimit(req: VercelRequest): Promise<RateLimitResult> {
  const db = getDynamoDb();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const WINDOW_SIZE = 60; // 1 minute
  const MAX_REQUESTS = 60; // 60 requests per minute

  if (!ip) {
    return { success: false };
  }

  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - WINDOW_SIZE;

  try {
    // Clean up old records and get current count
    const result = await db.update({
      TableName: 'rate-limits',
      Key: { ip },
      UpdateExpression: 'SET requests = if_not_exists(requests, :empty_list) + :new_request',
      ExpressionAttributeValues: {
        ':empty_list': [],
        ':new_request': [now],
        ':window_start': windowStart
      },
      ReturnValues: 'ALL_NEW'
    }).promise();

    const requests = (result.Attributes?.requests || []) as number[];
    const recentRequests = requests.filter(time => time >= windowStart);

    if (recentRequests.length > MAX_REQUESTS) {
      return {
        success: false,
        remaining: 0,
        reset: windowStart + WINDOW_SIZE
      };
    }

    return {
      success: true,
      remaining: MAX_REQUESTS - recentRequests.length,
      reset: windowStart + WINDOW_SIZE
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open if rate limiting is broken
    return { success: true };
  }
}
