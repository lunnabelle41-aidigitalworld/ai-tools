import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt, 
  faStar, 
  faDollarSign, 
  faTag, 
  faCode, 
  faLayerGroup,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';

interface AIToolCardProps {
  tool: {
    id: string;
    title: string;
    description: string;
    url: string;
    category?: string;
    subcategory?: string;
    rating?: number;
    pricing?: string;
    tags?: string[];
    features?: string[];
    launchDate?: string;
    lastUpdated?: string;
    type: 'tool' | 'blog' | 'news' | 'update';
    [key: string]: any;
  };
  query?: string;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, query = '' }) => {
  // Highlight matching text in the description
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
      <span key={i} className="bg-yellow-100 text-yellow-800 px-1 rounded">{part}</span> : 
      part
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              <Link href={tool.url} className="hover:text-blue-600 transition-colors">
                {highlightText(tool.title, query)}
              </Link>
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {tool.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tool.category}
                </span>
              )}
              {tool.subcategory && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {tool.subcategory}
                </span>
              )}
              {tool.pricing && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
                  {tool.pricing}
                </span>
              )}
              {tool.rating && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
                  {tool.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
          
          {tool.url && (
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors p-1"
              aria-label={`Open ${tool.title} in new tab`}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>

        {tool.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {highlightText(tool.description, query)}
          </p>
        )}

        {tool.features && tool.features.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              <FontAwesomeIcon icon={faLayerGroup} className="mr-1" />
              Key Features
            </h4>
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {feature}
                </span>
              ))}
              {tool.features.length > 3 && (
                <span className="text-xs text-gray-500 self-center">
                  +{tool.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex items-center text-xs text-gray-500">
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                <span>{tool.tags.slice(0, 2).join(', ')}</span>
                {tool.tags.length > 2 && <span>...</span>}
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-400">
            {tool.lastUpdated && (
              <span>Updated: {new Date(tool.lastUpdated).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolCard;
