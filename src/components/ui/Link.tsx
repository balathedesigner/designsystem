import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'muted' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'left' | 'right';
  icon?: React.ReactNode;
  underline?: 'none' | 'hover' | 'always';
  external?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    iconPosition = 'right',
    icon,
    underline = 'hover',
    external = false,
    children, 
    className, 
    href,
    ...props 
  }, ref) => {
    const underlineClasses = {
      'none': '',
      'hover': 'hover:underline',
      'always': 'underline'
    };

    const sizeClasses = {
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg'
    };

    const variantClasses = {
      'default': 'text-gray-700 hover:text-gray-900',
      'primary': 'text-blue-600 hover:text-blue-700',
      'secondary': 'text-purple-600 hover:text-purple-700',
      'muted': 'text-gray-500 hover:text-gray-700',
      'danger': 'text-red-600 hover:text-red-700'
    };

    const externalProps = external ? {
      target: '_blank',
      rel: 'noopener noreferrer'
    } : {};

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'transition-colors duration-200',
          sizeClasses[size],
          variantClasses[variant],
          underlineClasses[underline],
          'inline-flex items-center gap-1',
          className
        )}
        {...externalProps}
        {...props}
      >
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
        {external && !icon && <ExternalLink className="ml-1 h-4 w-4" />}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link; 