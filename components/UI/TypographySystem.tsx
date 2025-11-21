import { ReactNode } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  className?: string;
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  className = '',
  children,
  as: Component = 'p',
}) => {
  const baseStyles = 'font-sans text-gray-900 dark:text-white';
  
  const variantStyles = {
    h1: 'text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600',
    h2: 'text-3xl md:text-5xl font-bold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-medium',
    body: 'text-base md:text-lg leading-relaxed',
    caption: 'text-sm text-gray-500 dark:text-gray-400',
  };

  // Use a more specific typing approach
  const props = {
    className: `${baseStyles} ${variantStyles[variant]} ${className}`,
  };

  switch (Component) {
    case 'h1':
      return <h1 {...props}>{children}</h1>;
    case 'h2':
      return <h2 {...props}>{children}</h2>;
    case 'h3':
      return <h3 {...props}>{children}</h3>;
    case 'h4':
      return <h4 {...props}>{children}</h4>;
    case 'p':
      return <p {...props}>{children}</p>;
    case 'span':
      return <span {...props}>{children}</span>;
    default:
      return <p {...props}>{children}</p>;
  }
};

export const TypographySystem: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="space-y-6 max-w-4xl mx-auto">{children}</div>;
};