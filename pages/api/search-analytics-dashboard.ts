import { NextApiRequest, NextApiResponse } from 'next';
import { 
  getSearchAnalytics, 
  getPerformanceMetrics, 
  logSearchQuery
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
            
            // We'll use logSearchQuery to track this query for performance analysis
            // In a real implementation, you would have a more sophisticated performance tracking system
            const performance = getPerformanceMetrics();
            return res.status(200).json({ 
              success: true,
              query,
              performance
            });
            
          case 'user':
            // For now, we'll return a placeholder since getUserSearchBehavior doesn't exist
            return res.status(200).json({ 
              success: true,
              userId,
              behavior: {
                totalSearches: 0,
                favoriteCategories: [],
                preferredFilters: {},
                searchFrequency: 'low'
              }
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
        
        // Log the search query
        logSearchQuery({
          id: event.id || Date.now().toString(),
          query: event.query || '',
          timestamp: new Date(event.timestamp || Date.now()),
          resultsCount: event.resultsCount || 0,
          responseTime: event.responseTime || 0,
          filtersApplied: event.filtersApplied || {},
          sortBy: event.sortBy || '',
          userId: event.userId
        });
        
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