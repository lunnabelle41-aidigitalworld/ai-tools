import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CSSHeroSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  backgroundGradient?: string;
  overlayColor?: string;
  textColor?: string;
  padding?: string;
  minHeight?: string;
}

const CSSHeroSection: React.FC<CSSHeroSectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  backgroundGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  overlayColor = 'rgba(0, 0, 0, 0.6)',
  textColor = 'white',
  padding = '6rem 2rem',
  minHeight = '60vh'
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: backgroundGradient,
        color: textColor,
        padding,
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        isolation: 'isolate'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 50%)
          `,
          animation: 'pulse 20s infinite alternate',
        }}
      />
      
      {/* Content container */}
      <motion.div 
        className="relative z-10 max-w-6xl w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            lineHeight: 1.2
          }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              opacity: 0.9
            }}
          >
            {subtitle}
          </motion.p>
        )}
        
        {children && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CSSHeroSection;
