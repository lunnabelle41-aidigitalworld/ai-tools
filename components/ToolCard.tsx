import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ToolCardProps {
  name: string;
  category: string;
  subcategory: string;
  rating: number;
  description: string;
  pricing: string;
  tags: string[];
  url: string;
  favicon?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  name,
  category,
  subcategory,
  rating,
  description,
  pricing,
  tags,
  url,
  favicon
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Track when tool is viewed
  useEffect(() => {
    // In a real implementation, you would send this data to your backend
    // For now, we'll just log it to the console
    console.log(`Tool viewed: ${name}`);
  }, [name]);

  // Function to get pricing color
  const getPricingColor = () => {
    if (pricing.includes('Free')) return 'text-green-400';
    if (pricing.includes('Contact')) return 'text-yellow-400';
    return 'text-blue-400';
  };

  // Function to render stars
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}>
        ★
      </span>
    ));
  };

  return (
    <div 
      className={`relative h-64 cursor-pointer transition-all duration-500 transform ${
        isHovered ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Front of card */}
      <div className={`absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col transition-all duration-700 ${
        isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            {favicon ? (
              <Image src={favicon} alt={name} className="w-10 h-10 rounded-lg mr-3" width={40} height={40} />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">{name.charAt(0)}</span>
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg truncate max-w-[120px]">{name}</h3>
              <p className="text-xs text-gray-400">{subcategory}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold ${getPricingColor()}`}>{pricing}</div>
            <div className="flex text-sm">{renderStars()}</div>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm flex-grow mb-4 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{category}</span>
          <button 
            className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              window.open(url, '_blank');
            }}
          >
            Visit
          </button>
        </div>
        
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          Click for more info
        </div>
      </div>
      
      {/* Back of card */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col transition-all duration-700 ${
        isFlipped ? 'opacity-100' : 'opacity-0 rotate-y-180'
      }`}>
        <div className="flex items-center mb-4">
          {favicon ? (
            <Image src={favicon} alt={name} className="w-12 h-12 rounded-lg mr-3" width={48} height={48} />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold">{name.charAt(0)}</span>
            </div>
          )}
          <div>
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-sm text-gray-300">{subcategory}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-yellow-400 font-bold">{rating}/5</span>
            <div className="flex">{renderStars()}</div>
          </div>
          <div className={`text-sm font-semibold inline-block px-2 py-1 rounded ${getPricingColor()} bg-black/20`}>
            {pricing}
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-200">Tags:</h4>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:from-green-600 hover:to-blue-600 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              window.open(url, '_blank');
            }}
          >
            Visit Website
          </button>
          <button 
            className="flex-1 bg-white/10 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};