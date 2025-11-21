import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
}) => {
  return (
    <motion.div
      className={`relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
