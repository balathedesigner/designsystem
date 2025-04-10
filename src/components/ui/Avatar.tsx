import React from 'react';
import { cn } from '@/lib/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  
  /**
   * The shape variant of the avatar
   * @default 'circle'
   */
  variant?: AvatarVariant;
  
  /**
   * The image source URL
   */
  src?: string;
  
  /**
   * Alternative text for the avatar image
   */
  alt?: string;
  
  /**
   * Fallback content to display when image fails to load or no src is provided
   */
  fallback?: React.ReactNode;
  
  /**
   * Whether to show a border around the avatar
   * @default false
   */
  bordered?: boolean;
  
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const variantClasses: Record<AvatarVariant, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({
    size = 'md',
    variant = 'circle',
    src,
    alt,
    fallback,
    bordered = false,
    className,
    ...props
  }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    const handleError = () => {
      setHasError(true);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center bg-gray-200 overflow-hidden',
          sizeClasses[size],
          variantClasses[variant],
          bordered && 'border-2 border-white ring-2 ring-gray-200',
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={handleError}
            className="w-full h-full object-cover"
          />
        ) : fallback ? (
          <div className="flex items-center justify-center w-full h-full text-gray-600">
            {fallback}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600">
            {alt ? alt.charAt(0).toUpperCase() : '?'}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar; 