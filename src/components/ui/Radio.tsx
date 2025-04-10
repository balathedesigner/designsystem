import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioVariants = cva(
  'h-4 w-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none transition-colors',
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

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
  error?: string;
  isLabelHidden?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      isLabelHidden = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="radio"
            ref={ref}
            className={cn(
              radioVariants({ variant, size, isDisabled: disabled }),
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

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  name: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      name,
      onChange,
      orientation = 'vertical',
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
      value || defaultValue
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onChange?.(newValue);
      },
      [onChange]
    );

    // Add name and checked state to Radio children
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child as React.ReactElement<any>, {
        name,
        checked: selectedValue === child.props.value,
        onChange: handleChange,
        disabled: disabled || child.props.disabled,
      });
    });

    return (
      <div
        ref={ref}
        className={cn(
          orientation === 'horizontal' ? 'flex space-x-4' : 'flex flex-col space-y-2',
          className
        )}
        role="radiogroup"
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default Radio; 