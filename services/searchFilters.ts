/**
 * Advanced search filters service for creating complex search queries
 */

import { Document } from './searchService';

// Filter operators
export type FilterOperator = 
  | 'equals' 
  | 'notEquals' 
  | 'contains' 
  | 'notContains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'greaterThan' 
  | 'lessThan' 
  | 'greaterThanOrEquals' 
  | 'lessThanOrEquals' 
  | 'in' 
  | 'notIn' 
  | 'between' 
  | 'exists' 
  | 'notExists';

// Filter condition
export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value?: any;
  values?: any[];
  min?: any;
  max?: any;
}

// Filter group
export interface FilterGroup {
  operator: 'and' | 'or';
  conditions: (FilterCondition | FilterGroup)[];
}

// Advanced search filter
export interface AdvancedSearchFilter {
  filters: FilterGroup;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * Evaluate a single filter condition against a document
 */
function evaluateCondition(document: Document, condition: FilterCondition): boolean {
  const { field, operator, value, values, min, max } = condition;
  
  // Get the field value from the document
  const fieldValue = (document as any)[field];
  
  switch (operator) {
    case 'equals':
      return fieldValue === value;
      
    case 'notEquals':
      return fieldValue !== value;
      
    case 'contains':
      if (typeof fieldValue === 'string' && typeof value === 'string') {
        return fieldValue.toLowerCase().includes(value.toLowerCase());
      }
      return false;
      
    case 'notContains':
      if (typeof fieldValue === 'string' && typeof value === 'string') {
        return !fieldValue.toLowerCase().includes(value.toLowerCase());
      }
      return true;
      
    case 'startsWith':
      if (typeof fieldValue === 'string' && typeof value === 'string') {
        return fieldValue.toLowerCase().startsWith(value.toLowerCase());
      }
      return false;
      
    case 'endsWith':
      if (typeof fieldValue === 'string' && typeof value === 'string') {
        return fieldValue.toLowerCase().endsWith(value.toLowerCase());
      }
      return false;
      
    case 'greaterThan':
      return fieldValue > value;
      
    case 'lessThan':
      return fieldValue < value;
      
    case 'greaterThanOrEquals':
      return fieldValue >= value;
      
    case 'lessThanOrEquals':
      return fieldValue <= value;
      
    case 'in':
      if (Array.isArray(values)) {
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(val => values.includes(val));
        }
        return values.includes(fieldValue);
      }
      return false;
      
    case 'notIn':
      if (Array.isArray(values)) {
        if (Array.isArray(fieldValue)) {
          return !fieldValue.some(val => values.includes(val));
        }
        return !values.includes(fieldValue);
      }
      return true;
      
    case 'between':
      return fieldValue >= min && fieldValue <= max;
      
    case 'exists':
      return fieldValue !== undefined && fieldValue !== null;
      
    case 'notExists':
      return fieldValue === undefined || fieldValue === null;
      
    default:
      return false;
  }
}

/**
 * Evaluate a filter group against a document
 */
function evaluateGroup(document: Document, group: FilterGroup): boolean {
  const { operator, conditions } = group;
  
  if (operator === 'and') {
    return conditions.every(condition => {
      if ('conditions' in condition) {
        // It's a nested group
        return evaluateGroup(document, condition);
      } else {
        // It's a condition
        return evaluateCondition(document, condition);
      }
    });
  } else {
    // operator === 'or'
    return conditions.some(condition => {
      if ('conditions' in condition) {
        // It's a nested group
        return evaluateGroup(document, condition);
      } else {
        // It's a condition
        return evaluateCondition(document, condition);
      }
    });
  }
}

/**
 * Apply advanced filters to a list of documents
 */
export function applyAdvancedFilters(documents: Document[], filter: AdvancedSearchFilter): Document[] {
  const { filters, sortBy, sortOrder = 'desc', limit, offset = 0 } = filter;
  
  // Apply filters
  let filteredDocuments = documents.filter(document => evaluateGroup(document, filters));
  
  // Apply sorting
  if (sortBy) {
    filteredDocuments.sort((a, b) => {
      const aValue = (a as any)[sortBy];
      const bValue = (b as any)[sortBy];
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortOrder === 'asc' ? -1 : 1;
      if (bValue === undefined) return sortOrder === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === 'asc' ? comparison : -comparison;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  // Apply pagination
  if (limit) {
    filteredDocuments = filteredDocuments.slice(offset, offset + limit);
  } else if (offset > 0) {
    filteredDocuments = filteredDocuments.slice(offset);
  }
  
  return filteredDocuments;
}

/**
 * Get available filter fields from documents
 */
export function getAvailableFilterFields(documents: Document[]): string[] {
  const fields = new Set<string>();
  
  documents.forEach(document => {
    Object.keys(document).forEach(key => {
      fields.add(key);
    });
  });
  
  return Array.from(fields).sort();
}

/**
 * Get filter field statistics
 */
export function getFilterFieldStatistics(documents: Document[], field: string): {
  type: string;
  uniqueValues?: any[];
  min?: number;
  max?: number;
  average?: number;
  count?: number;
} {
  const values = documents
    .map(doc => (doc as any)[field])
    .filter(value => value !== undefined && value !== null);
  
  if (values.length === 0) {
    return { type: 'unknown' };
  }
  
  const firstValue = values[0];
  const type = typeof firstValue;
  
  switch (type) {
    case 'number':
      return {
        type: 'number',
        min: Math.min(...values as number[]),
        max: Math.max(...values as number[]),
        average: values.reduce((sum, val) => sum + (val as number), 0) / values.length,
        count: values.length
      };
      
    case 'string':
      const uniqueValues = Array.from(new Set(values));
      return {
        type: 'string',
        uniqueValues: uniqueValues.slice(0, 100), // Limit to 100 unique values
        count: values.length
      };
      
    case 'boolean':
      return {
        type: 'boolean',
        count: values.length
      };
      
    default:
      return {
        type,
        count: values.length
      };
  }
}

/**
 * Create a simple filter from basic parameters
 */
export function createSimpleFilter(params: {
  category?: string;
  subcategory?: string;
  minRating?: number;
  maxPrice?: number;
  tags?: string[];
  type?: string;
}): AdvancedSearchFilter {
  const conditions: FilterCondition[] = [];
  
  if (params.category) {
    conditions.push({
      field: 'category',
      operator: 'contains',
      value: params.category
    });
  }
  
  if (params.subcategory) {
    conditions.push({
      field: 'subcategory',
      operator: 'contains',
      value: params.subcategory
    });
  }
  
  if (params.minRating !== undefined) {
    conditions.push({
      field: 'rating',
      operator: 'greaterThanOrEquals',
      value: params.minRating
    });
  }
  
  if (params.maxPrice !== undefined) {
    conditions.push({
      field: 'price',
      operator: 'lessThanOrEquals',
      value: params.maxPrice
    });
  }
  
  if (params.tags && params.tags.length > 0) {
    conditions.push({
      field: 'tags',
      operator: 'in',
      values: params.tags
    });
  }
  
  if (params.type) {
    conditions.push({
      field: 'type',
      operator: 'equals',
      value: params.type
    });
  }
  
  return {
    filters: {
      operator: 'and',
      conditions
    }
  };
}

/**
 * Parse a filter string into an AdvancedSearchFilter
 * Supports syntax like: "category:AI AND rating:>4 OR price:<100"
 */
export function parseFilterString(filterString: string): AdvancedSearchFilter | null {
  if (!filterString || filterString.trim().length === 0) {
    return null;
  }
  
  // This is a simplified parser - a full implementation would be more complex
  const conditions: FilterCondition[] = [];
  const parts = filterString.split(/\s+(AND|OR)\s+/i);
  
  parts.forEach(part => {
    if (part.toUpperCase() === 'AND' || part.toUpperCase() === 'OR') {
      return; // Skip operators for this simple implementation
    }
    
    // Parse field:value pairs
    const match = part.match(/([^:]+):(.+)/);
    if (match) {
      const [, field, value] = match;
      
      // Handle comparison operators
      if (value.startsWith('>')) {
        conditions.push({
          field: field.trim(),
          operator: 'greaterThan',
          value: parseValue(value.substring(1))
        });
      } else if (value.startsWith('<')) {
        conditions.push({
          field: field.trim(),
          operator: 'lessThan',
          value: parseValue(value.substring(1))
        });
      } else if (value.startsWith('>=')) {
        conditions.push({
          field: field.trim(),
          operator: 'greaterThanOrEquals',
          value: parseValue(value.substring(2))
        });
      } else if (value.startsWith('<=')) {
        conditions.push({
          field: field.trim(),
          operator: 'lessThanOrEquals',
          value: parseValue(value.substring(2))
        });
      } else {
        conditions.push({
          field: field.trim(),
          operator: 'contains',
          value: parseValue(value)
        });
      }
    }
  });
  
  return {
    filters: {
      operator: 'and',
      conditions
    }
  };
  
  function parseValue(value: string): any {
    // Try to parse as number
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    
    // Try to parse as boolean
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    
    // Return as string
    return value;
  }
}