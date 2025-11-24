import { NextApiRequest, NextApiResponse } from 'next';
import { 
  getSearchAnalytics, 
  getQueryPerformance, 
  getUserSearchBehavior, 
  trackSearchEvent,
  cleanupOldEvents
} from '../../services/searchAnalytics';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        const { 
          action = 'overview',
          query,
          userId
        } = req.query;
        
        switch (action) {
          case 'overview':
            // Get overall search analytics
            const analytics = getSearchAnalytics();
            return res.status(200).json({ 
              success: true,
              analytics
            });
            
          case 'query':
            // Get performance data for a specific query
            if (!query || typeof query !== 'string') {
              return res.status(400).json({ 
                success: false,
                message: 'Query parameter is required'
              });
            }
            
            const queryPerformance = getQueryPerformance(query);
            return res.status(200).json({ 
              success: true,
              query,
              performance: queryPerformance
            });
            
          case 'user':
            // Get search behavior for a specific user
            if (!userId || typeof userId !== 'string') {
              return res.status(400).json({ 
                success: false,
                message: 'UserId parameter is required'
              });
            }
            
            const userBehavior = getUserSearchBehavior(userId);
            return res.status(200).json({ 
              success: true,
              userId,
              behavior: userBehavior
            });
            
          default:
            return res.status(400).json({ 
              success: false,
              message: 'Invalid action parameter'
            });
        }
        
      case 'POST':
        // Track a search event
        const { event } = req.body;
        
        if (!event) {
          return res.status(400).json({ 
            success: false,
            message: 'Event object is required in request body'
          });
        }
        
        trackSearchEvent(event);
        
        return res.status(200).json({ 
          success: true,
          message: 'Search event tracked successfully'
        });
        
      default:
        return res.status(405).json({ 
          success: false,
          message: 'Method not allowed' 
        });
    }
  } catch (error) {
    console.error('Search analytics error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error processing search analytics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}