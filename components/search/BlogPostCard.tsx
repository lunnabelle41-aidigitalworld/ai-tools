import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faUser,
  faTags,
  faClock,
  faBookOpen,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    url: string;
    date: string;
    author: string;
    readTime: string;
    tags?: string[];
    category?: string;
    imageUrl?: string;
  };
  query?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, query = '' }) => {
  // Highlight matching text in the title and excerpt
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
      {post.imageUrl && (
        <div className="h-48 bg-gray-100 overflow-hidden">
          <Image 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
            width={400}
            height={200}
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            {post.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                {post.category}
              </span>
            )}
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              <Link href={post.url} className="hover:text-blue-600 transition-colors">
                {highlightText(post.title, query)}
              </Link>
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {highlightText(post.excerpt, query)}
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-1 text-gray-400" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-gray-400" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="mr-1 text-gray-400" />
                  {post.readTime}
                </span>
              </div>
              
              <Link 
                href={post.url}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2 sm:mt-0"
              >
                Read more
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </Link>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500 self-center">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
