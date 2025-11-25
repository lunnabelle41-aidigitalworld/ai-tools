import { NextApiRequest, NextApiResponse } from 'next';
import { aiUpdates } from '../../data/ai-updates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    // Get query parameters
    const { limit, category, type } = req.query;
    
    // Filter updates based on query parameters
    let filteredUpdates = [...aiUpdates];
    
    if (category && typeof category === 'string') {
      filteredUpdates = filteredUpdates.filter(update => update.category === category);
    }
    
    if (type && typeof type === 'string') {
      filteredUpdates = filteredUpdates.filter(update => update.type === type);
    }
    
    // Apply limit
    if (limit && typeof limit === 'string') {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredUpdates = filteredUpdates.slice(0, limitNum);
      }
    }
    
    return res.status(200).json({ 
      success: true,
      count: filteredUpdates.length,
      updates: filteredUpdates
    });
  } catch (error) {
    console.error('AI Updates API error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error fetching AI updates',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}