import { NextApiRequest, NextApiResponse } from 'next';
import { getSearchAnalytics } from '../../services/searchService';

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
    const analytics = getSearchAnalytics();
    
    return res.status(200).json({ 
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Search analytics error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error fetching search analytics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}