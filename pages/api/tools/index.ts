import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Tool from '../../../models/Tool';
import { getCurrentUser } from '../../../lib/auth';

type QueryParams = {
  q?: string | string[];
  page?: string | string[];
  limit?: string | string[];
  category?: string | string[];
  pricing?: string | string[];
  sort?: string | string[];
};

type ToolResponse = {
  success: boolean;
  data?: any;
  error?: string;
  details?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ToolResponse>
) {
  const { method } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        const { 
          q = '', 
          page = '1', 
          limit = '10',
          category,
          pricing,
          sort = '-createdAt'
        } = req.query as QueryParams;
        
        // Ensure we have string values
        const searchQuery = Array.isArray(q) ? q[0] : q || '';
        const pageNum = Math.max(1, parseInt(Array.isArray(page) ? page[0] : page || '1', 10));
        const limitNum = Math.min(50, Math.max(1, parseInt(Array.isArray(limit) ? limit[0] : limit || '10', 10)));
        const categoryFilter = Array.isArray(category) ? category[0] : category;
        const pricingFilter = Array.isArray(pricing) ? pricing[0] : pricing;
        const sortField = Array.isArray(sort) ? sort[0] : sort;
        
        const result = await Tool.search(searchQuery, {
          page: pageNum,
          limit: limitNum,
          category: categoryFilter,
          pricing: pricingFilter,
          sort: sortField
        });
        
        res.status(200).json({
          success: true,
          data: result.tools,
          pagination: {
            page: result.page,
            limit: parseInt(limit as string),
            total: result.total,
            totalPages: result.totalPages
          }
        });
      } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ 
          success: false, 
          error: 'Server error while fetching tools',
          details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
      }
      break;
      
    case 'POST':
      try {
        const user = await getCurrentUser(req);
              
        // In production, you might want to add authentication
        // if (!user) {
        //   return res.status(401).json({ success: false, error: 'Not authorized' });
        // }
              
        const tool = await Tool.create({
          ...req.body,
          submittedBy: user?.id || null
        });
              
        res.status(201).json({ success: true, data: tool });
      } catch (error) {
        console.error('Error creating tool:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ 
          success: false, 
          error: 'Error creating tool',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ 
        success: false, 
        error: `Method ${method} not allowed` 
      });
      break;
  }
}
