import React from 'react';
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const breadcrumbsVariants = cva(
  'flex items-center text-sm',
  {
    variants: {
      variant: {
        default: 'text-gray-600',
        muted: 'text-gray-400',
        inverted: 'text-gray-200',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BreadcrumbsProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbsVariants> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  homeIcon?: boolean;
  className?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
}

export function Breadcrumbs({
  items,
  separator = <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />,
  maxItems = 0,
  homeIcon = false,
  className,
  variant,
  size,
  ...props
}: BreadcrumbsProps) {
  // Handle item truncation if maxItems is set and there are more items than allowed
  const showTruncation = maxItems > 0 && items.length > maxItems;
  const visibleItems: BreadcrumbItem[] = showTruncation
    ? [
        ...items.slice(0, maxItems - 2), 
        { label: '...', icon: <MoreHorizontal className="h-4 w-4" /> } as BreadcrumbItem,
        items[items.length - 1]
      ]
    : items;

  return (
    <nav className={cn(breadcrumbsVariants({ variant, size }), className)} aria-label="Breadcrumbs" {...props}>
      <ol className="flex items-center flex-wrap">
        {homeIcon && (
          <li className="flex items-center">
            <a href="/" className="hover:text-gray-800 transition-colors">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </a>
            <span className="mx-2" aria-hidden="true">{separator}</span>
          </li>
        )}
        
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <a 
                  href={item.href}
                  className={cn(
                    "hover:text-gray-800 transition-colors",
                    item.current && "font-medium"
                  )}
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span 
                  className={cn(
                    "font-medium",
                    isLast ? "text-gray-900" : ""
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
              
              {!isLast && <span className="mx-2" aria-hidden="true">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs; 