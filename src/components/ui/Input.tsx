import React, { ReactNode, useState, useId } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** The visual variant of the input */
  variant?: InputVariant;
  /** Whether to show an error state */
  error?: boolean;
  /** Text to display when there's an error */
  errorMessage?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Whether the input should take the full width of its container */
  fullWidth?: boolean;
  /** Prefix icon to display before the input text */
  prefixIcon?: ReactNode;
  /** Suffix icon to display after the input text */
  suffixIcon?: ReactNode;
  /** Whether to show a toggle for password visibility (for password inputs) */
  showPasswordToggle?: boolean;
  /** Whether to show number increment/decrement controls (for number inputs) */
  showNumberControls?: boolean;
  /** Size of the input */
  size?: InputSize;
  /** Label for the input field */
  label?: string;
  /** Whether the input is required */
  required?: boolean;
  /** ID for the input element - will be auto-generated if not provided */
  id?: string;
  /** Direction of text, supports RTL languages */
  dir?: 'ltr' | 'rtl';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant = 'default',
    error,
    errorMessage,
    helperText,
    fullWidth,
    prefixIcon,
    suffixIcon,
    showPasswordToggle,
    showNumberControls,
    size = 'md',
    label,
    required,
    id: providedId,
    type = 'text',
    value,
    onChange,
    onBlur,
    dir,
    ...props
  }, ref) => {
    // Generate unique ID for input accessibility
    const reactId = useId();
    const [generatedId] = useState(() => providedId || `input-${reactId}`);
    const id = providedId || generatedId;
    
    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;
    
    // State for number controls
    const [numberValue, setNumberValue] = useState<string>(value?.toString() || '');
    
    // Determine text direction - default to inheriting from context
    const textDirection = dir || 'inherit';
    
    // Handle number increment/decrement
    const handleNumberChange = (delta: number) => {
      if (type !== 'number') return;
      
      const currentValue = parseFloat(numberValue || '0');
      if (isNaN(currentValue)) return;
      
      const newValue = String(currentValue + delta);
      setNumberValue(newValue);
      
      // Simulate input change event
      if (onChange) {
        const event = {
          target: { value: newValue }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };
    
    // Handle regular input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // For number inputs, validate before setting
      if (type === 'number') {
        const newValue = e.target.value;
        // Allow only numbers, decimal point, and minus sign
        if (!/^-?\d*\.?\d*$/.test(newValue) && newValue !== '') {
          return;
        }
        setNumberValue(newValue);
      }
      
      if (onChange) {
        onChange(e);
      }
    };
    
    // Handle input blur for formatting numbers
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (type === 'number' && e.target.value !== '') {
        try {
          const num = parseFloat(e.target.value.replace(/,/g, ''));
          if (!isNaN(num) && num >= 1000) {
            const formattedValue = num.toLocaleString('en-US');
            setNumberValue(formattedValue);
            
            // Update the actual input value with formatted value
            if (onChange) {
              const event = {
                target: { value: formattedValue }
              } as React.ChangeEvent<HTMLInputElement>;
              onChange(event);
            }
          }
        } catch (err) {
          // Keep original value if parsing fails
        }
      }
      
      if (onBlur) {
        onBlur(e);
      }
    };
    
    // Base styles for input - consistent across all platforms
    const baseStyles = "rounded-md border border-gray-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 w-full";
    
    // Size styles with consistent heights across platforms
    const sizeClasses = {
      sm: "h-8 text-xs py-1",
      md: "h-10 text-sm py-2",
      lg: "h-12 text-base py-3"
    };
    
    // Calculate horizontal padding based on presence of icons and direction
    const getPadding = () => {
      const isRTL = textDirection === 'rtl';
      
      // Start padding (left in LTR, right in RTL)
      const startPadding = prefixIcon
        ? size === 'sm' ? 'ps-7' : size === 'md' ? 'ps-9' : 'ps-11'
        : 'ps-3';
        
      // End padding (right in LTR, left in RTL)
      const endPadding = (suffixIcon || (type === 'password' && showPasswordToggle) || (type === 'number' && showNumberControls))
        ? size === 'sm' ? 'pe-8' : size === 'md' ? 'pe-10' : 'pe-12'
        : 'pe-3';
        
      return `${startPadding} ${endPadding}`;
    };
    
    // Variant styles - consistent across platforms with theming support
    const variantStyles = {
      default: "bg-white",
      filled: "bg-gray-100 border-transparent focus:bg-white",
      outlined: "bg-transparent border-gray-300 hover:border-gray-400"
    };
    
    // Error styles - accessible contrast ratios
    const errorStyles = error 
      ? "border-red-500 focus:ring-red-500 aria-invalid:border-red-500" 
      : "";
    
    // Width class
    const widthClass = fullWidth ? "w-full" : "w-auto";
    
    // Main input element - with proper RTL support
    const inputElement = (
      <div className="relative w-full" dir={textDirection}>
        {/* Input element */}
        <input
          ref={ref}
          id={id}
          type={inputType}
          className={cn(
            baseStyles,
            sizeClasses[size],
            variantStyles[variant],
            errorStyles,
            getPadding(),
            widthClass,
            "placeholder:text-gray-400",
            "focus:ring-opacity-50",
            textDirection === 'rtl' ? "text-right" : "",
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={helperText || errorMessage ? `${id}-description` : undefined}
          aria-required={required ? 'true' : undefined}
          required={required}
          value={type === 'number' ? numberValue : value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={props.placeholder || ''}
          dir={textDirection}
          {...props}
        />
        
        {/* Prefix icon - positioned based on text direction */}
        {prefixIcon && (
          <div className={cn(
            "absolute inset-y-0 flex items-center justify-center pointer-events-none text-gray-500",
            textDirection === 'rtl' ? 'right-0' : 'left-0',
            size === 'sm' ? (textDirection === 'rtl' ? 'pe-2.5' : 'ps-2.5') : 
            size === 'md' ? (textDirection === 'rtl' ? 'pe-3' : 'ps-3') : 
            (textDirection === 'rtl' ? 'pe-3.5' : 'ps-3.5')
          )}>
            <div className="flex items-center justify-center" 
              style={{ transform: `scale(${size === 'sm' ? 0.75 : size === 'md' ? 0.85 : 1})` }}>
              {prefixIcon}
            </div>
          </div>
        )}
        
        {/* Password toggle icon - positioned based on text direction */}
        {type === 'password' && showPasswordToggle && (
          <div
            className={cn(
              "absolute inset-y-0 flex items-center justify-center cursor-pointer text-gray-500",
              textDirection === 'rtl' ? 'left-0' : 'right-0',
              size === 'sm' ? (textDirection === 'rtl' ? 'ps-2.5' : 'pe-3.5') : 
              size === 'md' ? (textDirection === 'rtl' ? 'ps-3' : 'pe-4') : 
              (textDirection === 'rtl' ? 'ps-3.5' : 'pe-4.5')
            )}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowPassword(!showPassword)}
          >
            <div className="flex items-center justify-center" 
              style={{ transform: `scale(${size === 'sm' ? 0.7 : size === 'md' ? 0.8 : 0.9})` }}>
              {showPassword ? <EyeOff size={size === 'lg' ? 20 : 18} /> : <Eye size={size === 'lg' ? 20 : 18} />}
            </div>
          </div>
        )}
        
        {/* Number controls - positioned based on text direction */}
        {type === 'number' && showNumberControls && (
          <div className={cn(
            "absolute inset-y-0 flex flex-col h-full",
            textDirection === 'rtl' ? 'left-0' : 'right-0',
            size === 'sm' ? (textDirection === 'rtl' ? 'ps-1.5' : 'pe-1.5') : 
            size === 'md' ? (textDirection === 'rtl' ? 'ps-2' : 'pe-2') : 
            (textDirection === 'rtl' ? 'ps-2.5' : 'pe-2.5')
          )}>
            <button 
              type="button"
              className="flex items-center justify-center h-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-blue-500"
              onClick={() => handleNumberChange(1)}
              aria-label="Increment"
              tabIndex={-1}
            >
              <div className="flex items-center justify-center" 
                style={{ transform: `scale(${size === 'sm' ? 0.75 : size === 'md' ? 0.85 : 1})` }}>
                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </button>
            <button 
              type="button"
              className="flex items-center justify-center h-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-blue-500"
              onClick={() => handleNumberChange(-1)}
              aria-label="Decrement"
              tabIndex={-1}
            >
              <div className="flex items-center justify-center" 
                style={{ transform: `scale(${size === 'sm' ? 0.75 : size === 'md' ? 0.85 : 1})` }}>
                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>
        )}
        
        {/* Suffix icon - positioned based on text direction */}
        {suffixIcon && !(type === 'password' && showPasswordToggle) && !(type === 'number' && showNumberControls) && (
          <div className={cn(
            "absolute inset-y-0 flex items-center justify-center pointer-events-none text-gray-500",
            textDirection === 'rtl' ? 'left-0' : 'right-0',
            size === 'sm' ? (textDirection === 'rtl' ? 'ps-2.5' : 'pe-2.5') : 
            size === 'md' ? (textDirection === 'rtl' ? 'ps-3' : 'pe-3') : 
            (textDirection === 'rtl' ? 'ps-3.5' : 'pe-3.5')
          )}>
            <div className="flex items-center justify-center" 
              style={{ transform: `scale(${size === 'sm' ? 0.75 : size === 'md' ? 0.85 : 1})` }}>
              {suffixIcon}
            </div>
          </div>
        )}
      </div>
    );
    
    return (
      <div className={cn("w-full", className)} dir={textDirection}>
        {/* Label with proper association and RTL support */}
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
              "block text-sm font-medium text-gray-700 mb-1",
              textDirection === 'rtl' ? "text-right" : ""
            )}
          >
            {label}
            {required && <span className="text-red-500 mx-1" aria-hidden="true">*</span>}
          </label>
        )}
        
        {/* Input with icons */}
        {inputElement}
        
        {/* Helper text or error message with RTL support */}
        {(helperText || errorMessage) && (
          <p 
            id={`${id}-description`} 
            className={cn(
              "mt-1 text-sm", 
              error ? "text-red-500" : "text-gray-500",
              textDirection === 'rtl' ? "text-right" : ""
            )}
            aria-live={error ? "assertive" : "polite"}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 