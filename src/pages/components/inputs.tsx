import React, { useState, useEffect, useCallback } from 'react';
import { 
  ComponentDocTemplate, 
  SectionContentWrapper, 
  BestPracticeItem,
  DoIcon,
  DontIcon,
  ANIMATION_SPEEDS,
  getAnimationClass,
  AnimationSpeed
} from '@/components/shared/ComponentDocTemplate';
import { Input, InputVariant, InputSize } from '@/components/ui/Input';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Lock, 
  Eye, 
  EyeOff, 
  Calendar, 
  Clock, 
  Mail, 
  User, 
  Hash, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';

// Type definitions
type InputState = 'default' | 'hover' | 'focused' | 'disabled' | 'error';
type InputType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'date' 
  | 'time' 
  | 'datetime-local' 
  | 'file'
  | 'color'
  | 'tel'
  | 'url';

// Configuration constants for inputs
const INPUT_CONFIG = {
  variants: ['default', 'filled', 'outlined'] as const,
  sizes: ['sm', 'md', 'lg'] as const,
  states: ['default', 'hover', 'focused', 'disabled', 'error'] as const
};

// Navigation structure similar to buttons page
const rightNavItems = {
  items: [
    {
      id: 'getting-started',
      label: 'Getting Started',
      subItems: [
        { id: 'import', label: 'Import' },
        { id: 'core-variants', label: 'Core Variants' }
      ]
    },
    {
      id: 'usage',
      label: 'Usage',
      subItems: [
        { id: 'compositions', label: 'Input Compositions' },
        { id: 'interactive-states', label: 'Interactive States' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'use-cases',
      label: 'Common Use Cases',
      subItems: [
        { id: 'specialized-inputs', label: 'Specialized Inputs' },
        { id: 'input-with-icons', label: 'Input with Icons' },
        { id: 'validation', label: 'Input Validation' }
      ]
    },
    {
      id: 'playground',
      label: 'Interactive Playground'
    },
    {
      id: 'api',
      label: 'API Reference'
    }
  ]
};

// Define the input features interface with more options
interface PlaygroundProps {
  variant: InputVariant;
  state: InputState;
  inputType: InputType;
  label: string;
  helperText: string;
  placeholder: string;
  disabled: boolean;
  error: boolean;
  fullWidth: boolean;
  required: boolean;
  readOnly: boolean;
  value?: string;
  prefixIcon: boolean;
  suffixIcon: boolean;
  showPasswordToggle: boolean;
  showNumberControls: boolean;
  min?: number;
  max?: number;
  step?: string;
  defaultValue?: string;
  size?: InputSize;
  animationSpeed: AnimationSpeed;
}

interface ExampleProps extends PlaygroundProps {
  className?: string;
}

// Default playground props
const defaultPlaygroundProps: PlaygroundProps = {
    variant: 'default',
  state: 'default',
  inputType: 'text',
  label: '',
    helperText: '',
  placeholder: 'Enter text...',
    disabled: false,
    error: false,
  fullWidth: false,
  required: false,
  readOnly: false,
  prefixIcon: false,
  suffixIcon: false,
  showPasswordToggle: false,
  showNumberControls: false,
  animationSpeed: 'normal'
};

// Define the InputExample component outside of InputsPage
const InputExample: React.FC<Partial<ExampleProps>> = (props) => {
  const mergedProps = { ...defaultPlaygroundProps, ...props };
  const [inputValue, setInputValue] = useState(mergedProps.value || '');
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  // Apply default features based on input type
  useEffect(() => {
    if (mergedProps.inputType === 'password' && !('showPasswordToggle' in props)) {
      mergedProps.showPasswordToggle = true;
    }
    if (mergedProps.inputType === 'email' && !('prefixIcon' in props)) {
      mergedProps.prefixIcon = true;
      if (!('placeholder' in props)) {
        mergedProps.placeholder = 'example@domain.com';
      }
    }
  }, [mergedProps.inputType, mergedProps.prefixIcon, mergedProps.showPasswordToggle, props]);

  // Input validation logic
  const validateInput = useCallback((value: string, type: InputType) => {
    if (!value) {
      setIsValid(true);
      setValidationMessage('');
      return true;
    }
    switch (type) {
      case 'number':
        const isValidNumber = /^-?\d*\.?\d*$/.test(value);
        setIsValid(isValidNumber);
        setValidationMessage(isValidNumber ? '' : 'Please enter only numbers');
        return isValidNumber;
      case 'email':
        if (!value.includes('@')) {
          setIsValid(false);
          setValidationMessage('Email must include @ symbol');
          return false;
        }
        const [localPart, domain] = value.split('@');
        if (!localPart || localPart.length < 1) {
          setIsValid(false);
          setValidationMessage('Username part before @ is required');
          return false;
        }
        if (!domain || !domain.includes('.')) {
          setIsValid(false);
          setValidationMessage('Domain must include a dot (example.com)');
          return false;
        }
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setIsValid(isValidEmail);
        if (!isValidEmail) {
          setValidationMessage('Please enter a valid email address');
        } else {
          setValidationMessage('');
        }
        return isValidEmail;
      case 'password':
        const hasMinLength = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const isStrongPassword = hasMinLength && hasUppercase && hasLowercase && hasNumber;
        setIsValid(isStrongPassword);
        if (!isStrongPassword) {
          const requirements = [
            `${hasMinLength ? '✓' : '✗'} Minimum 8 characters`,
            `${hasUppercase ? '✓' : '✗'} At least one uppercase letter`,
            `${hasLowercase ? '✓' : '✗'} At least one lowercase letter`,
            `${hasNumber ? '✓' : '✗'} At least one number`
          ];
          setValidationMessage(requirements.join('\n'));
        } else {
          setValidationMessage('✓ Strong password');
        }
        return isStrongPassword;
      default:
        setIsValid(true);
        setValidationMessage('');
        return true;
    }
  }, []);

  // Input change handler with validation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    validateInput(newValue, mergedProps.inputType);
  }, [mergedProps.inputType, validateInput]);

  // Determine which icon to use based on input type
  const getIconForType = (type: InputType) => {
    switch (type) {
      case 'text': return <User size={16} />;
      case 'password': return <Lock size={16} />;
      case 'number': return <Hash size={16} />;
      case 'email': return <Mail size={16} />;
      case 'date': return <Calendar size={16} />;
      case 'time': return <Clock size={16} />;
      default: return <Search size={16} />;
    }
  };

  // Compute validation message or helper text
  const displayMessage = !isValid ? validationMessage : mergedProps.helperText;
  const isErrorState = !isValid || mergedProps.error || mergedProps.state === 'error';

  return (
    <div className={cn(
      "w-full",
      mergedProps.fullWidth ? "w-full" : "max-w-sm",
      props.className
    )}>
      <Input
        type={mergedProps.inputType}
        variant={mergedProps.variant}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled || mergedProps.state === 'disabled'}
        error={isErrorState}
        errorMessage={isValid ? undefined : validationMessage}
        helperText={isValid ? mergedProps.helperText : undefined}
        readOnly={mergedProps.readOnly}
        className={cn(
          mergedProps.state === 'hover' && 'hover:border-gray-400',
          mergedProps.state === 'focused' && 'ring-2 ring-blue-500 border-transparent',
          'transition-all',
          getAnimationClass(mergedProps.animationSpeed)
        )}
        value={inputValue}
        onChange={handleInputChange}
        label={mergedProps.label}
        required={mergedProps.required}
        fullWidth={mergedProps.fullWidth}
        prefixIcon={mergedProps.prefixIcon ? getIconForType(mergedProps.inputType) : undefined}
        suffixIcon={mergedProps.suffixIcon ? <Search size={16} /> : undefined}
        showPasswordToggle={mergedProps.inputType === 'password' && mergedProps.showPasswordToggle}
        showNumberControls={mergedProps.inputType === 'number' && mergedProps.showNumberControls}
        size={mergedProps.size}
      />
    </div>
  );
};

function InputsPage() {
  // State for playground props
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  // Generate code for the playground
  const generateCode = () => {
    const props = [];
    const imports = ['import { Input } from "@/components/ui/Input";'];
    
    // Variant
    if (playgroundProps.variant !== defaultPlaygroundProps.variant) {
      props.push(`variant="${playgroundProps.variant}"`);
    }
    
    // Input type
    if (playgroundProps.inputType !== defaultPlaygroundProps.inputType) {
      props.push(`type="${playgroundProps.inputType}"`);
    }
    
    // Size
    if (playgroundProps.size && playgroundProps.size !== 'md') {
      props.push(`size="${playgroundProps.size}"`);
    }
    
    // States
    if (playgroundProps.disabled) {
      props.push('disabled={true}');
    }
    
    if (playgroundProps.error) {
      props.push('error={true}');
    }
    
    if (playgroundProps.required) {
      props.push('required={true}');
    }
    
    if (playgroundProps.readOnly) {
      props.push('readOnly={true}');
    }
    
    if (playgroundProps.fullWidth) {
      props.push('fullWidth={true}');
    }
    
    // Label
    if (playgroundProps.label) {
      props.push(`label="${playgroundProps.label}"`);
    }
    
    // Animation speed
    if (playgroundProps.animationSpeed !== 'normal') {
      props.push(`className="transition-all ${ANIMATION_SPEEDS[playgroundProps.animationSpeed]}"`);
    }
    
    // Placeholder
    if (playgroundProps.placeholder && playgroundProps.placeholder !== defaultPlaygroundProps.placeholder) {
      props.push(`placeholder="${playgroundProps.placeholder}"`);
    }
    
    // Helper text
    if (playgroundProps.helperText) {
      props.push(`helperText="${playgroundProps.helperText}"`);
    }
    
    // Handle icons
    if (playgroundProps.prefixIcon) {
      let iconType;
      switch (playgroundProps.inputType) {
        case 'email': iconType = 'Mail'; break;
        case 'password': iconType = 'Lock'; break;
        case 'number': iconType = 'Hash'; break;
        case 'date': iconType = 'Calendar'; break;
        case 'time': iconType = 'Clock'; break;
        default: iconType = 'User';
      }
      
      if (!imports.some(i => i.includes(iconType))) {
        imports.push(`import { ${iconType} } from "lucide-react";`);
      }
      props.push(`prefixIcon={<${iconType} size={16} />}`);
    }
    
    if (playgroundProps.suffixIcon) {
      if (!imports.some(i => i.includes('Search'))) {
        imports.push(`import { Search } from "lucide-react";`);
      }
      props.push(`suffixIcon={<Search size={16} />}`);
    }
    
    // Handle password toggle
    if (playgroundProps.showPasswordToggle && playgroundProps.inputType === 'password') {
      props.push('showPasswordToggle={true}');
    }
    
    // Handle number controls
    if (playgroundProps.showNumberControls && playgroundProps.inputType === 'number') {
      props.push('showNumberControls={true}');
    }
    
    // Build the code
    const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
    
    return `${imports.join('\n')}
    
export default function Example() {
  return (
    <Input${propsString} />
  );
}`;
  };

  // Helper function to render an input example - now just uses the component
  const renderDocExample = (props: Partial<ExampleProps>) => {
    return <InputExample {...props} />;
  };

  // Core variants section - refactored to match button page pattern
  const renderCoreVariants = () => (
    <SectionContentWrapper>
    <div className="space-y-8">
        {/* Input Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Core Variants */}
        <div className="space-y-4">
          <SubsectionHeader title="Input Variants" />
          <div className="flex flex-wrap gap-4">
              {INPUT_CONFIG.variants.map(variant => (
                <div key={variant} className="flex-none">
                  {renderDocExample({ variant: variant as InputVariant })}
      </div>
              ))}
          </div>
        </div>
        
          {/* Sizes */}
        <div className="space-y-4">
            <SubsectionHeader title="Input Sizes" />
          <div className="flex flex-wrap gap-4">
              {INPUT_CONFIG.sizes.map(size => (
                <div key={size} className="flex-none">
                  {renderDocExample({ size: size as InputSize })}
            </div>
              ))}
            </div>
            </div>
          </div>

        {/* Basic Examples */}
        <div className="space-y-4">
          <SubsectionHeader title="Basic Input Types" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>{renderDocExample({ inputType: 'text', placeholder: 'Text input' })}</div>
            <div>{renderDocExample({ inputType: 'email', placeholder: 'Email input' })}</div>
            <div>{renderDocExample({ inputType: 'password', placeholder: 'Password input' })}</div>
        </div>
      </div>
    </div>
    </SectionContentWrapper>
  );

  // Compositions section - refactored to match button page pattern
  const renderCompositions = () => (
    <SectionContentWrapper>
    <div className="space-y-8">
        {/* Input with Labels */}
        <div className="space-y-4">
          <SubsectionHeader title="Input with Labels" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>{renderDocExample({ label: 'Username', placeholder: 'Enter username' })}</div>
            <div>{renderDocExample({ label: 'Email', placeholder: 'Enter email', required: true })}</div>
            </div>
            </div>
        
        {/* Input with Helper Text */}
        <div className="space-y-4">
          <SubsectionHeader title="Input with Helper Text" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>{renderDocExample({ 
              label: 'Password', 
              placeholder: 'Enter password', 
              helperText: 'Must be at least 8 characters',
              inputType: 'password'
            })}</div>
            <div>{renderDocExample({ 
              label: 'Email', 
              placeholder: 'Enter email', 
              helperText: 'Please enter a valid email address',
              error: true
            })}</div>
            </div>
        </div>
        
        {/* Input with Icons */}
        <div className="space-y-4">
          <SubsectionHeader title="Input with Icons" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>{renderDocExample({ 
              prefixIcon: true, 
              placeholder: 'Search...'
            })}</div>
            <div>{renderDocExample({ 
              suffixIcon: true, 
              placeholder: 'Search with suffix icon'
            })}</div>
          </div>
        </div>
        
        {/* Input Groups */}
        <div className="space-y-4">
          <SubsectionHeader title="Input Compositions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>{renderDocExample({ 
              label: 'Email Address', 
              placeholder: 'Enter email', 
              helperText: 'We\'ll never share your email', 
              prefixIcon: true,
              required: true
            })}</div>
            <div>{renderDocExample({ 
              label: 'Password', 
              placeholder: 'Enter password', 
              helperText: 'Must be at least 8 characters', 
              inputType: 'password',
              showPasswordToggle: true,
              required: true
            })}</div>
            </div>
        </div>
      </div>
    </SectionContentWrapper>
  );

  // Interactive states section - refactored to match button page pattern
  const renderInteractiveStates = () => (
    <SectionContentWrapper>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4">Input States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {INPUT_CONFIG.states.map(state => (
            <div key={state} className="flex flex-col items-center">
              <div className="mb-2 text-sm text-gray-500 capitalize">{state}</div>
              {renderDocExample({ state: state as InputState })}
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <SubsectionHeader title="Input Validation States" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              {renderDocExample({ 
                label: 'Email',
                placeholder: 'Enter email',
                helperText: 'Please enter a valid email',
                error: true
              })}
            </div>
            <div>
              {renderDocExample({ 
                label: 'Username',
                placeholder: 'Enter username',
                helperText: 'Username is available',
                error: false,
                value: 'johndoe'
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionContentWrapper>
  );

  // Best practices section - refactored to match button page pattern
  const renderPatterns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SectionContentWrapper>
        <h3 className="text-lg font-semibold text-green-600 mb-4">Do's</h3>
        <ul className="space-y-4">
          <BestPracticeItem
            icon={<DoIcon />}
            title="Clear Labels"
            description="Always use clear, descriptive labels that indicate what information is expected."
            example={renderDocExample({
              label: 'Email Address',
              placeholder: 'example@domain.com',
              prefixIcon: true
            })}
          />
          <BestPracticeItem
            icon={<DoIcon />}
            title="Helpful Placeholders"
            description="Include placeholder text that guides users on the expected format."
            example={renderDocExample({
              label: 'Phone Number',
              placeholder: '(123) 456-7890'
            })}
          />
          <BestPracticeItem
            icon={<DoIcon />}
            title="Validation Feedback"
            description="Provide clear feedback for validation errors."
            example={renderDocExample({
              label: 'Password',
              helperText: 'Password must be at least 8 characters',
              error: false,
              inputType: 'password'
            })}
          />
        </ul>
      </SectionContentWrapper>
      
      <SectionContentWrapper>
        <h3 className="text-lg font-semibold text-red-600 mb-4">Don'ts</h3>
        <ul className="space-y-4">
          <BestPracticeItem
            icon={<DontIcon />}
            title="Vague Labels"
            description="Don't use vague or generic labels that don't clearly indicate what information is needed."
            example={renderDocExample({
              label: 'Input',
              placeholder: 'Enter here...'
            })}
          />
          <BestPracticeItem
            icon={<DontIcon />}
            title="Excessive Validation"
            description="Don't frustrate users with excessive validation before they've finished typing."
            example={renderDocExample({
              label: 'Email',
              placeholder: 'example@',
              error: true,
              helperText: 'Invalid email format'
            })}
          />
          <BestPracticeItem
            icon={<DontIcon />}
            title="Missing Error Context"
            description="Don't show error states without explaining what's wrong."
            example={renderDocExample({
              label: 'Username',
              placeholder: 'username',
              error: true
            })}
          />
        </ul>
      </SectionContentWrapper>
    </div>
  );

  // Specialized inputs section - refactored to match button page use cases pattern
  const renderUseCases = () => (
    <SectionContentWrapper>
    <div className="space-y-8">
        {/* Specialized Input Types */}
        <div className="space-y-4">
          <SubsectionHeader title="Specialized Input Types" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Date Input</h4>
              {renderDocExample({ 
                inputType: 'date', 
                label: 'Date', 
                prefixIcon: true
              })}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Time Input</h4>
              {renderDocExample({ 
                inputType: 'time', 
                label: 'Time', 
                prefixIcon: true
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Number Input</h4>
              {renderDocExample({ 
                inputType: 'number', 
                label: 'Quantity', 
                placeholder: '0',
                showNumberControls: true,
                min: 0,
                max: 100
              })}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Password with Toggle</h4>
              {renderDocExample({ 
                inputType: 'password', 
                label: 'Password',
                placeholder: 'Enter password',
                showPasswordToggle: true
              })}
            </div>
          </div>
        </div>
        
        {/* Advanced Input Validation */}
        <div className="space-y-4">
          <SubsectionHeader title="Input Validation Examples" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Email Validation</h4>
              {renderDocExample({ 
                inputType: 'email', 
                label: 'Email', 
                placeholder: 'example@domain.com',
                helperText: 'Please enter a valid email address',
                error: true,
                prefixIcon: true
              })}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Password Strength</h4>
                {renderDocExample({ 
                inputType: 'password', 
                label: 'Create Password', 
                placeholder: 'Enter strong password',
                helperText: 'Password strength: Weak',
                error: true,
                showPasswordToggle: true
                })}
              </div>
            </div>
          </div>
        </div>
    </SectionContentWrapper>
  );

  // Accessibility section
  const renderAccessibility = () => (
    <SectionContentWrapper>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4">Accessibility Guidelines</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Automatic Label Association</h4>
            <p className="text-gray-600 mb-2">The Input component automatically associates labels with inputs using the <code className="bg-gray-100 px-1 rounded">htmlFor</code> attribute and generates unique IDs when needed.</p>
            <div className="bg-gray-50 p-4 rounded-md">
              {renderDocExample({ 
                label: 'Full Name', 
                placeholder: 'Enter your full name'
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">ARIA Attributes</h4>
            <p className="text-gray-600 mb-2">The component automatically sets appropriate ARIA attributes:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li><code className="bg-gray-100 px-1 rounded">aria-invalid</code> for error states</li>
              <li><code className="bg-gray-100 px-1 rounded">aria-describedby</code> for helper text and error messages</li>
              <li><code className="bg-gray-100 px-1 rounded">aria-label</code> for icon buttons</li>
              <li><code className="bg-gray-100 px-1 rounded">role="button"</code> for interactive elements</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-md mt-2">
              {renderDocExample({ 
                label: 'Email',
                placeholder: 'Enter email',
                error: true,
                helperText: 'Please enter a valid email address'
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
            <p className="text-gray-600 mb-2">All interactive elements are keyboard accessible:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Password visibility toggle can be activated with Enter key</li>
              <li>Number controls can be activated with Tab + Enter</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-md mt-2">
              {renderDocExample({ 
                inputType: 'password',
                label: 'Password',
                placeholder: 'Enter password',
                showPasswordToggle: true
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Required Field Indication</h4>
            <p className="text-gray-600">Required fields are clearly marked with an asterisk (*) and also have the HTML <code className="bg-gray-100 px-1 rounded">required</code> attribute set.</p>
            <div className="bg-gray-50 p-4 rounded-md mt-2">
              {renderDocExample({ 
                label: 'Username', 
                placeholder: 'Enter username',
                required: true
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Color Contrast</h4>
            <p className="text-gray-600">All states of the Input component maintain sufficient color contrast ratios for WCAG compliance.</p>
        </div>
      </div>
    </div>
    </SectionContentWrapper>
  );

  // API Reference - refactored to match button page pattern
  const renderApiReference = () => (
    <SectionContentWrapper>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4">Input Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-2 font-medium">Prop</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Default</th>
                <th className="pb-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 font-mono text-xs">variant</td>
                <td className="py-2 font-mono text-xs">'default' | 'filled' | 'outlined'</td>
                <td className="py-2 font-mono text-xs">'default'</td>
                <td className="py-2">The visual style variant of the input</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">type</td>
                <td className="py-2 font-mono text-xs">InputType</td>
                <td className="py-2 font-mono text-xs">'text'</td>
                <td className="py-2">HTML input type attribute</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">size</td>
                <td className="py-2 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td className="py-2 font-mono text-xs">'md'</td>
                <td className="py-2">The size of the input</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">label</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Label text displayed above the input</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">helperText</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Helper text displayed below the input</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">error</td>
                  <td className="py-2 font-mono text-xs">boolean</td>
                  <td className="py-2 font-mono text-xs">false</td>
                  <td className="py-2">Whether to show the input in an error state</td>
                </tr>
                <tr>
                <td className="py-2 font-mono text-xs">errorMessage</td>
                  <td className="py-2 font-mono text-xs">string</td>
                  <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Error message to display when error is true</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">disabled</td>
                  <td className="py-2 font-mono text-xs">boolean</td>
                  <td className="py-2 font-mono text-xs">false</td>
                  <td className="py-2">Whether the input is disabled</td>
                </tr>
              <tr>
                <td className="py-2 font-mono text-xs">required</td>
                <td className="py-2 font-mono text-xs">boolean</td>
                <td className="py-2 font-mono text-xs">false</td>
                <td className="py-2">Whether the input is required</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">fullWidth</td>
                <td className="py-2 font-mono text-xs">boolean</td>
                <td className="py-2 font-mono text-xs">false</td>
                <td className="py-2">Whether the input should take full width</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">readOnly</td>
                  <td className="py-2 font-mono text-xs">boolean</td>
                  <td className="py-2 font-mono text-xs">false</td>
                  <td className="py-2">Whether the input is read-only</td>
                </tr>
                <tr>
                <td className="py-2 font-mono text-xs">prefixIcon</td>
                <td className="py-2 font-mono text-xs">ReactNode</td>
                  <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Icon to display at the start of the input</td>
                </tr>
                <tr>
                <td className="py-2 font-mono text-xs">suffixIcon</td>
                <td className="py-2 font-mono text-xs">ReactNode</td>
                  <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Icon to display at the end of the input</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">showPasswordToggle</td>
                <td className="py-2 font-mono text-xs">boolean</td>
                <td className="py-2 font-mono text-xs">false</td>
                <td className="py-2">Whether to show password visibility toggle (for password inputs)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">showNumberControls</td>
                <td className="py-2 font-mono text-xs">boolean</td>
                <td className="py-2 font-mono text-xs">false</td>
                <td className="py-2">Whether to show increment/decrement controls (for number inputs)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">id</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2 font-mono text-xs">auto-generated</td>
                <td className="py-2">ID for the input element (auto-generated if not provided)</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">...props</td>
                <td className="py-2 font-mono text-xs">InputHTMLAttributes</td>
                  <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">All standard HTML input attributes</td>
                </tr>
              </tbody>
            </table>
                  </div>
                </div>
    </SectionContentWrapper>
  );

  // Playground section
  const renderPlayground = () => {
    // Auto-set appropriate defaults based on input type
    const handleInputTypeChange = (value: InputType) => {
      const newProps = { ...playgroundProps, inputType: value as InputType };
      
      // Auto-enable prefix icon for email
      if (value === 'email' && !playgroundProps.prefixIcon) {
        newProps.prefixIcon = true;
        if (playgroundProps.placeholder === defaultPlaygroundProps.placeholder) {
          newProps.placeholder = 'example@domain.com';
        }
      }
      
      // Auto-enable password toggle for password
      if (value === 'password') {
        newProps.showPasswordToggle = true;
      }
      
      // Auto-enable number controls for number
      if (value === 'number') {
        newProps.showNumberControls = true;
      }
      
      setPlaygroundProps(newProps);
    };

    return (
      <div className="space-y-6">
        <ComponentPlayground
          defaultProps={defaultPlaygroundProps}
          controls={[
            {
              group: 'Appearance',
              items: [
                {
                  type: 'select',
                  label: 'Variant',
                  options: INPUT_CONFIG.variants.map(value => ({ value, label: value })),
                  value: playgroundProps.variant,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, variant: value as InputVariant })
                },
                {
                  type: 'select',
                  label: 'Size',
                  options: INPUT_CONFIG.sizes.map(value => ({ value, label: value })),
                  value: playgroundProps.size || 'md',
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, size: value as InputSize })
                },
                {
                  type: 'select',
                  label: 'Input Type',
                  options: [
                    { value: 'text', label: 'Text' },
                    { value: 'email', label: 'Email' },
                    { value: 'password', label: 'Password' },
                    { value: 'number', label: 'Number' },
                    { value: 'date', label: 'Date' },
                    { value: 'time', label: 'Time' }
                  ],
                  value: playgroundProps.inputType,
                  onChange: handleInputTypeChange
                }
              ]
            },
            {
              group: 'Content',
              items: [
                {
                  type: 'input',
                  label: 'Label',
                  value: playgroundProps.label,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, label: value })
                },
                {
                  type: 'input',
                  label: 'Placeholder',
                  value: playgroundProps.placeholder,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, placeholder: value })
                },
                {
                  type: 'input',
                  label: 'Helper Text',
                  value: playgroundProps.helperText,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, helperText: value })
                }
              ]
            },
            {
              group: 'States',
              items: [
                {
                  type: 'chip',
                  label: 'Disabled',
                  value: playgroundProps.disabled,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, disabled: value })
                },
                {
                  type: 'chip',
                  label: 'Error State',
                  value: playgroundProps.error,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, error: value })
                },
                {
                  type: 'chip',
                  label: 'Required',
                  value: playgroundProps.required,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, required: value })
                },
                {
                  type: 'chip',
                  label: 'Read Only',
                  value: playgroundProps.readOnly,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, readOnly: value })
                },
                {
                  type: 'chip',
                  label: 'Full Width',
                  value: playgroundProps.fullWidth,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, fullWidth: value })
                }
              ]
            },
            {
              group: 'Icons',
              items: [
                {
                  type: 'chip',
                  label: 'Prefix Icon',
                  value: playgroundProps.prefixIcon,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, prefixIcon: value })
                },
                {
                  type: 'chip',
                  label: 'Suffix Icon',
                  value: playgroundProps.suffixIcon,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, suffixIcon: value })
                }
              ]
            },
            {
              group: 'Special Controls',
              items: [
                {
                  type: 'chip',
                  label: 'Password Toggle',
                  value: playgroundProps.showPasswordToggle,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, showPasswordToggle: value })
                },
                {
                  type: 'chip',
                  label: 'Number Controls',
                  value: playgroundProps.showNumberControls,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, showNumberControls: value })
                }
              ]
            },
            {
              group: 'Animation',
              items: [
                {
                  type: 'select',
                  label: 'Animation Speed',
                  options: [
                    { value: 'fast', label: 'Fast' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'slow', label: 'Slow' }
                  ],
                  value: playgroundProps.animationSpeed,
                  onChange: (value) => setPlaygroundProps({ ...playgroundProps, animationSpeed: value as AnimationSpeed })
                }
              ]
            }
          ]}
          preview={
            <div className="w-full flex justify-center p-8 bg-gray-50 rounded-lg">
              <div className={playgroundProps.fullWidth ? 'w-full' : 'w-64'}>
                {renderDocExample(playgroundProps)}
                  </div>
          </div>
          }
          code={generateCode()}
        />
    </div>
  );
  };

  return (
    <ComponentDocTemplate
      title="Input"
      description="Input components allow users to enter text, numbers, or other data in forms. They come in multiple variants, sizes, and states to support various use cases."
      status={{ label: 'Stable', color: 'blue' }}
      importCode={`import { Input } from '@/components/ui/Input';`}
      rightNavItems={rightNavItems}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      renderInteractiveStates={renderInteractiveStates}
      renderPatterns={renderPatterns}
      renderAccessibility={renderAccessibility}
      generateCode={generateCode}
    />
  );
}

export default InputsPage; 