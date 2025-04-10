import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'h-4 w-4 rounded border focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none transition-colors',
  {
    variants: {
      variant: {
        default: 'border-gray-300 text-blue-600 focus:ring-blue-500',
        primary: 'border-gray-300 text-blue-600 focus:ring-blue-500',
        secondary: 'border-gray-300 text-gray-700 focus:ring-gray-500',
        success: 'border-gray-300 text-green-600 focus:ring-green-500',
        warning: 'border-gray-300 text-yellow-600 focus:ring-yellow-500',
        danger: 'border-gray-300 text-red-600 focus:ring-red-500',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed bg-gray-100',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isDisabled: false,
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  isLabelHidden?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      indeterminate = false,
      isLabelHidden = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => checkboxRef.current!);
    
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            ref={checkboxRef}
            className={cn(
              checkboxVariants({ variant, size, isDisabled: disabled }),
              className
            )}
            disabled={disabled}
            {...props}
          />
        </div>
        
        {label && !isLabelHidden && (
          <div className="ml-2 text-sm">
            <label
              htmlFor={props.id}
              className={cn(
                "font-medium",
                disabled ? "text-gray-400" : "text-gray-700"
              )}
            >
              {label}
            </label>
            
            {description && (
              <p className="text-gray-500">{description}</p>
            )}
            
            {error && (
              <p className="text-red-600 text-xs mt-1">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Custom checkmark component for the styled checkbox
export function CheckboxIndicator({ 
  checked, 
  indeterminate,
  className
}: { 
  checked?: boolean; 
  indeterminate?: boolean;
  className?: string;
}) {
  if (indeterminate) {
    return <Minus className={cn("h-3 w-3", className)} />;
  }
  
  if (checked) {
    return <Check className={cn("h-3 w-3", className)} />;
  }
  
  return null;
}

export default Checkbox; 