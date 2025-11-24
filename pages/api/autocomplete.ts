import { NextApiRequest, NextApiResponse } from 'next';
import { getAutocompleteSuggestions, getTrendingSearchTerms } from '../../services/autocomplete';

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

  const { q: query, type = 'suggestions' } = req.query;

  try {
    if (type === 'trending') {
      const trendingTerms = getTrendingSearchTerms(10);
      return res.status(200).json({ 
        success: true,
        type: 'trending',
        terms: trendingTerms
      });
    }

    if (!query || typeof query !== 'string') {
      // Return trending terms if no query
      const trendingTerms = getTrendingSearchTerms(10);
      return res.status(200).json({ 
        success: true,
        type: 'trending',
        terms: trendingTerms
      });
    }

    const suggestions = getAutocompleteSuggestions(query, 10);
    
    return res.status(200).json({ 
      success: true,
      type: 'suggestions',
      query,
      suggestions
    });
  } catch (error) {
    console.error('Autocomplete error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error generating autocomplete suggestions',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}