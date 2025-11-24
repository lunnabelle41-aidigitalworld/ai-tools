import { NextApiRequest, NextApiResponse } from 'next';
import { 
  addToSearchHistory, 
  recordClickedResult, 
  getRecentSearches, 
  getPersonalizedSuggestions,
  getUserSearchStats,
  clearSearchHistory
} from '../../services/searchHistory';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // For demo purposes, we'll use a simple user ID
  // In a real application, this would come from authentication
  const userId = (req.headers['x-user-id'] as string) || 'anonymous';
  
  try {
    switch (req.method) {
      case 'GET':
        const { action: getAction = 'recent', query } = req.query;
        
        switch (getAction) {
          case 'recent':
            const recentSearches = getRecentSearches(userId, 10);
            return res.status(200).json({ 
              success: true,
              action: 'recent',
              searches: recentSearches
            });
            
          case 'suggestions':
            const suggestions = getPersonalizedSuggestions(userId, query as string, 10);
            return res.status(200).json({ 
              success: true,
              action: 'suggestions',
              query,
              suggestions
            });
            
          case 'stats':
            const stats = getUserSearchStats(userId);
            return res.status(200).json({ 
              success: true,
              action: 'stats',
              stats
            });
            
          default:
            return res.status(400).json({ 
              success: false,
              message: 'Invalid action parameter' 
            });
        }
        
      case 'POST':
        const { action: postAction, data } = req.body;
        
        switch (postAction) {
          case 'recordSearch':
            if (!data?.query) {
              return res.status(400).json({ 
                success: false,
                message: 'Query is required' 
              });
            }
            addToSearchHistory(userId, data.query, data.resultsCount || 0);
            return res.status(200).json({ 
              success: true,
              message: 'Search recorded'
            });
            
          case 'recordClick':
            if (!data?.query || !data?.resultId) {
              return res.status(400).json({ 
                success: false,
                message: 'Query and resultId are required' 
              });
            }
            recordClickedResult(userId, data.query, data.resultId);
            return res.status(200).json({ 
              success: true,
              message: 'Click recorded'
            });
            
          default:
            return res.status(400).json({ 
              success: false,
              message: 'Invalid action' 
            });
        }
        
      case 'DELETE':
        clearSearchHistory(userId);
        return res.status(200).json({ 
          success: true,
          message: 'Search history cleared'
        });
        
      default:
        return res.status(405).json({ 
          success: false,
          message: 'Method not allowed' 
        });
    }
  } catch (error) {
    console.error('Search history error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error processing search history request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}