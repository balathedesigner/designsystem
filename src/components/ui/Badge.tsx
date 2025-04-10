import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onRemove?: () => void;
}

const variantStyles = {
  default: {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  },
  outline: {
    primary: 'border border-blue-500 text-blue-600',
    secondary: 'border border-gray-500 text-gray-600',
    success: 'border border-green-500 text-green-600',
    warning: 'border border-yellow-500 text-yellow-600',
    error: 'border border-red-500 text-red-600',
  },
  solid: {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
  },
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-base px-3 py-1',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  className,
  variant = 'default',
  color = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  onRemove,
  children,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full',
        variantStyles[variant][color],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-1',
            'transition-colors',
            variant === 'solid' ? 'focus:ring-white/30' : 'focus:ring-current/30'
          )}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </span>
  );
});

Badge.displayName = 'Badge'; 