import { NextApiRequest, NextApiResponse } from 'next';
import { getSearchAnalytics } from '../../services/searchService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
      data: analytics
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error fetching analytics data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}