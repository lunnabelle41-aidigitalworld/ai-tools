import React, { CSSProperties } from 'react';
import { motion, Variants, Variant } from 'framer-motion';

// Common SVG icon paths
const ICONS = {
  // Basic shapes
  circle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  square: 'M3 3h18v18H3z',
  triangle: 'M12 2L2 22h20z',
  
  // Common UI icons
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z',
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  
  // Arrows
  arrowRight: 'M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z',
  arrowLeft: 'M15.41 16.59L10 11.17l5.59-5.58L14 4l-8 8 8 8 1.41-1.41z',
  
  // Social
  github: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1.9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.8-1.4-2.9-.3-6-1.4-6-6.3 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.2 0 0 1.1-.3 3.5 1.3a12.3 12.3 0 0 1 3.2-.4c1.1 0 2.2.1 3.2.4 2.4-1.6 3.5-1.3 3.5-1.3.7 1.6.2 2.9.1 3.2.8.9 1.3 2.1 1.3 3.5 0 4.8-3.1 6-6.1 6.3.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.8.6A12 12 0 0 0 12 .3z',
  twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  
  // Tools
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  search: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  
  // Status
  error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
};

type IconName = keyof typeof ICONS;

interface SVGIconProps {
  name: IconName | string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  viewBox?: string;
  animate?: boolean;
  hoverEffect?: 'scale' | 'rotate' | 'pulse' | 'bounce' | 'none';
  onClick?: () => void;
}

const hoverVariants: Record<string, Variant> = {
  scale: {
    scale: 1.1,
    transition: { 
      type: 'spring',
      stiffness: 400, 
      damping: 10 
    },
  },
  rotate: {
    rotate: 360,
    transition: { 
      duration: 1, 
      ease: 'linear'
    },
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: { 
      duration: 0.5, 
      repeat: Infinity
    },
  },
  bounce: {
    y: [0, -10, 0],
    transition: { 
      duration: 0.5, 
      repeat: Infinity
    },
  },
  none: {},
} as const;

const SVGIcon: React.FC<SVGIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  style = {},
  viewBox = '0 0 24 24',
  animate = false,
  hoverEffect = 'none',
  onClick,
}) => {
  const path = ICONS[name as IconName] || ICONS.circle;
  
  const iconStyle: CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    display: 'inline-block',
    verticalAlign: 'middle',
    fill: color,
    ...style,
  };

  const icon = (
    <svg
      className={`svg-icon ${className}`}
      style={iconStyle}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d={path} />
    </svg>
  );

  if (animate || hoverEffect !== 'none') {
    return (
      <motion.div
        whileHover={hoverEffect !== 'none' ? hoverEffect : undefined}
        animate={animate ? hoverEffect : undefined}
        variants={hoverVariants}
        style={{ display: 'inline-flex' }}
      >
        {icon}
      </motion.div>
    );
  }

  return icon;
};

export default SVGIcon;

// Export the icon names for easier usage
export const IconNames = Object.keys(ICONS) as IconName[];
