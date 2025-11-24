import { NextApiRequest, NextApiResponse } from 'next';
import { getSearchSuggestions, trackSearchQuery } from '../../services/searchSuggestions';
import { loadDocuments } from '../../services/searchService';

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
        const { q: query, type = 'all' } = req.query;
        
        // Load documents for context
        const documents = await loadDocuments();
        
        // Get suggestions
        const suggestions = getSearchSuggestions({
          partialQuery: query as string,
          documents,
          type: type as any
        });
        
        return res.status(200).json({ 
          success: true,
          suggestions
        });
        
      case 'POST':
        // Track a search query
        const { searchQuery } = req.body;
        
        if (searchQuery) {
          trackSearchQuery(searchQuery);
        }
        
        return res.status(200).json({ 
          success: true,
          message: 'Search query tracked successfully'
        });
        
      default:
        return res.status(405).json({ 
          success: false,
          message: 'Method not allowed' 
        });
    }
  } catch (error) {
    console.error('Search suggestions error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error processing search suggestions',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}