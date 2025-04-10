import React from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'thumbnail';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The image source URL
   */
  src?: string;
  
  /**
   * Alternative text for the image
   */
  alt?: string;
  
  /**
   * Height of the media container
   * @default 'auto'
   */
  height?: string | number;
}

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to align actions to the right
   * @default false
   */
  alignEnd?: boolean;
}

export interface CardActionAreaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether to disable the action area
   * @default false
   */
  disabled?: boolean;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style variant of the card
   * @default 'elevated'
   */
  variant?: CardVariant;

  /**
   * The amount of padding inside the card
   * @default 'md'
   */
  padding?: CardPadding;

  /**
   * Whether to disable all card styling (useful for nested cards)
   * @default false
   */
  unstyled?: boolean;

  /**
   * Optional header content
   */
  header?: React.ReactNode;

  /**
   * Optional footer content
   */
  footer?: React.ReactNode;

  /**
   * Optional media content
   */
  media?: CardMediaProps;

  /**
   * Optional action area props - makes the entire card clickable
   */
  actionArea?: CardActionAreaProps;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  elevated: 'bg-white shadow-md hover:shadow-lg transition-shadow',
  outlined: 'bg-white border border-gray-200',
  filled: 'bg-gray-50',
  thumbnail: 'bg-white shadow-sm hover:shadow-md transition-shadow flex flex-row items-start gap-4',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ src, alt, height = 'auto', className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={{ ...style, height }}
        {...props}
      >
        {src && (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    );
  }
);

CardMedia.displayName = 'CardMedia';

export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ alignEnd = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 mt-4',
          alignEnd && 'justify-end',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardActions.displayName = 'CardActions';

export const CardActionArea = React.forwardRef<HTMLButtonElement, CardActionAreaProps>(
  ({ disabled = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'w-full text-left transition-colors',
          !disabled && 'hover:bg-gray-50 active:bg-gray-100',
          disabled && 'cursor-default',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CardActionArea.displayName = 'CardActionArea';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'elevated',
    padding = 'md',
    unstyled = false,
    header,
    footer,
    media,
    actionArea,
    className,
    children,
    ...props
  }, ref) => {
    const cardClasses = cn(
      'rounded-lg overflow-hidden',
      !unstyled && [
        variantClasses[variant],
        !media && variant !== 'thumbnail' && paddingClasses[padding]
      ],
      className
    );

    const headerClasses = cn(
      'border-b border-gray-200 -mt-4 -mx-4 px-4 pt-4 pb-3 mb-4',
      padding === 'lg' && '-mt-6 -mx-6 px-6 pt-6'
    );

    const footerClasses = cn(
      'border-t border-gray-200 -mb-4 -mx-4 px-4 pt-3 pb-4 mt-4',
      padding === 'lg' && '-mb-6 -mx-6 px-6 pb-6'
    );

    const contentClasses = cn(
      variant === 'thumbnail' ? 'flex-1 p-4' : (media && paddingClasses[padding])
    );

    const content = (
      <>
        {media && variant !== 'thumbnail' && <CardMedia {...media} />}
        {variant === 'thumbnail' && media && (
          <div className="w-24 h-24 flex-shrink-0">
            <CardMedia {...media} height="100%" />
          </div>
        )}
        <div className={contentClasses}>
          {header && (
            <div className={headerClasses}>
              {header}
            </div>
          )}
          {children}
          {footer && (
            <div className={footerClasses}>
              {footer}
            </div>
          )}
        </div>
      </>
    );

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {actionArea ? (
          <CardActionArea {...actionArea}>{content}</CardActionArea>
        ) : (
          content
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card; 