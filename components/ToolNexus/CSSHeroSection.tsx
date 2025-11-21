import { ReactNode } from 'react';

interface CSSHeroSectionProps {
  children: ReactNode;
  className?: string;
}

export const CSSHeroSection: React.FC<CSSHeroSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <section className={`relative py-20 md:py-32 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-50" />
      <div className="relative z-10 container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};
