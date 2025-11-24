import { NextApiRequest, NextApiResponse } from 'next';
import { applyAdvancedFilters, getAvailableFilterFields, getFilterFieldStatistics, createSimpleFilter, parseFilterString } from '../../services/searchFilters';
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
    // Load documents
    const documents = await loadDocuments();
    
    switch (req.method) {
      case 'GET':
        const { 
          action = 'filter',
          filter: filterString,
          category,
          subcategory,
          minRating,
          maxPrice,
          tags,
          type,
          sortBy,
          sortOrder,
          limit,
          offset
        } = req.query;
        
        switch (action) {
          case 'fields':
            // Get available filter fields
            const fields = getAvailableFilterFields(documents);
            return res.status(200).json({ 
              success: true,
              fields
            });
            
          case 'statistics':
            // Get field statistics
            const field = req.query.field as string;
            if (!field) {
              return res.status(400).json({ 
                success: false,
                message: 'Field parameter is required for statistics'
              });
            }
            
            const statistics = getFilterFieldStatistics(documents, field);
            return res.status(200).json({ 
              success: true,
              field,
              statistics
            });
            
          case 'filter':
          default:
            // Apply filters
            let filter;
            
            // Parse filter string if provided
            if (filterString && typeof filterString === 'string') {
              filter = parseFilterString(filterString);
            } else {
              // Create simple filter from query parameters
              filter = createSimpleFilter({
                category: category as string,
                subcategory: subcategory as string,
                minRating: minRating ? Number(minRating) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                tags: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
                type: type as string
              });
            }
            
            // Add sorting and pagination if specified
            if (filter) {
              if (sortBy) filter.sortBy = sortBy as string;
              if (sortOrder) filter.sortOrder = sortOrder as 'asc' | 'desc';
              if (limit) filter.limit = Number(limit);
              if (offset) filter.offset = Number(offset);
              
              const filteredDocuments = applyAdvancedFilters(documents, filter);
              
              return res.status(200).json({ 
                success: true,
                count: filteredDocuments.length,
                documents: filteredDocuments
              });
            }
            
            return res.status(400).json({ 
              success: false,
              message: 'No valid filter provided'
            });
        }
        
      case 'POST':
        // Apply advanced filters from request body
        const { filter } = req.body;
        
        if (!filter) {
          return res.status(400).json({ 
            success: false,
            message: 'Filter object is required in request body'
          });
        }
        
        const filteredDocuments = applyAdvancedFilters(documents, filter);
        
        return res.status(200).json({ 
          success: true,
          count: filteredDocuments.length,
          documents: filteredDocuments
        });
        
      default:
        return res.status(405).json({ 
          success: false,
          message: 'Method not allowed' 
        });
    }
  } catch (error) {
    console.error('Search filters error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error processing search filters',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}