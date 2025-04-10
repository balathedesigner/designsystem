import React from 'react';
import { cn } from '@/lib/utils';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200',
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  info: <Info className="h-5 w-5 text-blue-500" />,
  success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * The title of the alert
   */
  title?: string;

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * Whether to show the icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * The content of the alert
   */
  children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'info',
    title,
    dismissible = false,
    onDismiss,
    showIcon = true,
    icon,
    className,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex gap-3 rounded-lg border p-4',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {showIcon && (
          <div className="flex-shrink-0">
            {icon || variantIcons[variant]}
          </div>
        )}
        <div className="flex-1 break-words">
          {title && (
            <h5 className="mb-1 font-medium leading-6">{title}</h5>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            className={cn(
              'absolute right-2 top-2 rounded-lg p-1.5 opacity-70 transition-opacity hover:opacity-100',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              {
                'focus:ring-blue-500': variant === 'info',
                'focus:ring-green-500': variant === 'success',
                'focus:ring-yellow-500': variant === 'warning',
                'focus:ring-red-500': variant === 'error',
              }
            )}
            onClick={onDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert'; 