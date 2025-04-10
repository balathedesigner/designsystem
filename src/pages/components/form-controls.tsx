import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio, RadioGroup } from '@/components/ui/Radio';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import CodeBlock from '@/components/shared/CodeBlock';

// Define navigation items
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
        { id: 'checkbox-compositions', label: 'Checkbox Compositions' },
        { id: 'radio-compositions', label: 'Radio Compositions' },
        { id: 'interactive-states', label: 'Interactive States' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'use-cases',
      label: 'Common Use Cases'
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

// Define playground props interface for Checkbox
interface CheckboxPlaygroundProps {
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'md' | 'lg';
  label: string;
  description: string;
  error: string;
  indeterminate: boolean;
  disabled: boolean;
  className?: string;
  checked: boolean;
  required: boolean;
  helperText: string;
}

const defaultCheckboxPlaygroundProps: CheckboxPlaygroundProps = {
  variant: 'default',
  size: 'md',
  label: 'Checkbox label',
  description: '',
  error: '',
  indeterminate: false,
  disabled: false,
  checked: false,
  required: false,
  helperText: '',
};

// Define playground props interface for Radio
interface RadioPlaygroundProps {
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'md' | 'lg';
  orientation: 'horizontal' | 'vertical';
  disabled: boolean;
  className?: string;
  label: string;
  checked: boolean;
  error: string;
  required: boolean;
  helperText: string;
}

const defaultRadioPlaygroundProps: RadioPlaygroundProps = {
  variant: 'default',
  size: 'md',
  orientation: 'vertical',
  disabled: false,
  label: 'Radio option',
  checked: false,
  error: '',
  required: false,
  helperText: '',
};

// Main component
export default function FormControlsPage() {
  const [activeTab, setActiveTab] = useState<string>('checkbox');
  const [checkboxPlaygroundProps, setCheckboxPlaygroundProps] = useState<CheckboxPlaygroundProps>(defaultCheckboxPlaygroundProps);
  const [radioPlaygroundProps, setRadioPlaygroundProps] = useState<RadioPlaygroundProps>(defaultRadioPlaygroundProps);

  // Generate code based on current props
  const generateCheckboxCode = () => {
    const props = [];
    
    if (checkboxPlaygroundProps.variant !== 'default') {
      props.push(`variant="${checkboxPlaygroundProps.variant}"`);
    }

    if (checkboxPlaygroundProps.size !== 'md') {
      props.push(`size="${checkboxPlaygroundProps.size}"`);
    }

    if (checkboxPlaygroundProps.disabled) {
      props.push(`disabled={true}`);
    }

    if (checkboxPlaygroundProps.indeterminate) {
      props.push(`indeterminate={true}`);
    }

    if (checkboxPlaygroundProps.required) {
      props.push(`required={true}`);
    }

    if (checkboxPlaygroundProps.checked) {
      props.push(`checked={true}`);
    }

    if (checkboxPlaygroundProps.label) {
      props.push(`label="${checkboxPlaygroundProps.label}"`);
    }

    if (checkboxPlaygroundProps.description) {
      props.push(`description="${checkboxPlaygroundProps.description}"`);
    }

    if (checkboxPlaygroundProps.error) {
      props.push(`error="${checkboxPlaygroundProps.error}"`);
    }

    if (checkboxPlaygroundProps.helperText) {
      props.push(`helperText="${checkboxPlaygroundProps.helperText}"`);
    }

    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    
    return `import { Checkbox } from '@/components/ui/Checkbox';

export default function Example() {
  return (
    <Checkbox${propsString} />
  );
}`;
  };

  const generateRadioCode = () => {
    const props = [];
    
    if (radioPlaygroundProps.variant !== 'default') {
      props.push(`variant="${radioPlaygroundProps.variant}"`);
    }

    if (radioPlaygroundProps.size !== 'md') {
      props.push(`size="${radioPlaygroundProps.size}"`);
    }

    if (radioPlaygroundProps.disabled) {
      props.push(`disabled={true}`);
    }

    if (radioPlaygroundProps.required) {
      props.push(`required={true}`);
    }

    if (radioPlaygroundProps.checked) {
      props.push(`checked={true}`);
    }

    if (radioPlaygroundProps.error) {
      props.push(`error="${radioPlaygroundProps.error}"`);
    }

    if (radioPlaygroundProps.label) {
      props.push(`label="${radioPlaygroundProps.label}"`);
    }

    if (radioPlaygroundProps.helperText) {
      props.push(`helperText="${radioPlaygroundProps.helperText}"`);
    }

    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    
    return `import { Radio, RadioGroup } from '@/components/ui/Radio';

export default function Example() {
  return (
    <RadioGroup name="radio-example" orientation="${radioPlaygroundProps.orientation}">
      <Radio${propsString} value="option1" />
      <Radio label="Another option" value="option2" />
      <Radio label="Third option" value="option3" />
    </RadioGroup>
  );
}`;
  };

  const renderCheckboxExample = (props: Partial<CheckboxPlaygroundProps> = {}) => {
    const mergedProps = { ...defaultCheckboxPlaygroundProps, ...props };
    // Extract only the props that exist on Checkbox component
    const { 
      variant, 
      size, 
      label, 
      description, 
      error, 
      indeterminate, 
      disabled, 
      checked, 
      required 
    } = mergedProps;
    
    return (
      <div>
        <Checkbox
          variant={variant}
          size={size}
          label={label}
          description={description}
          error={error}
          indeterminate={indeterminate}
          disabled={disabled}
          checked={checked}
          required={required}
        />
        {mergedProps.helperText && (
          <div className="mt-1 text-sm text-gray-500">{mergedProps.helperText}</div>
        )}
      </div>
    );
  };

  const renderRadioExample = (props: Partial<RadioPlaygroundProps> = {}) => {
    const mergedProps = { ...defaultRadioPlaygroundProps, ...props };
    // Extract only the props that exist on Radio component
    const { 
      variant, 
      size, 
      label, 
      disabled, 
      checked, 
      required,
      error
    } = mergedProps;
    
    return (
      <div>
        <Radio
          variant={variant}
          size={size}
          label={label}
          disabled={disabled}
          checked={checked}
          required={required}
          error={error}
          value="option1"
        />
        {mergedProps.helperText && (
          <div className="mt-1 text-sm text-gray-500">{mergedProps.helperText}</div>
        )}
      </div>
    );
  };

  const renderCoreCheckboxVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ variant: 'default', label: 'Default checkbox' })}
            </div>
            <p className="text-sm text-gray-600">Default checkbox style with standard appearance</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ variant: 'primary', label: 'Primary checkbox' })}
            </div>
            <p className="text-sm text-gray-600">Primary variant for core actions</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ variant: 'secondary', label: 'Secondary checkbox' })}
            </div>
            <p className="text-sm text-gray-600">Secondary variant for alternative styling</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ variant: 'success', label: 'Success checkbox' })}
            </div>
            <p className="text-sm text-gray-600">Success variant for positive confirmation</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ variant: 'warning', label: 'Warning checkbox' })}
            </div>
            <p className="text-sm text-gray-600">Warning variant for cautionary options</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ variant: 'danger', label: 'Danger checkbox' })}
            </div>
            <p className="text-sm text-gray-600">Danger variant for destructive actions</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCoreRadioVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ variant: 'default', label: 'Default radio' })}
            </div>
            <p className="text-sm text-gray-600">Default radio style with standard appearance</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ variant: 'primary', label: 'Primary radio' })}
            </div>
            <p className="text-sm text-gray-600">Primary variant for core actions</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ variant: 'secondary', label: 'Secondary radio' })}
            </div>
            <p className="text-sm text-gray-600">Secondary variant for alternative styling</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ variant: 'success', label: 'Success radio' })}
            </div>
            <p className="text-sm text-gray-600">Success variant for positive confirmation</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ variant: 'warning', label: 'Warning radio' })}
            </div>
            <p className="text-sm text-gray-600">Warning variant for cautionary options</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ variant: 'danger', label: 'Danger radio' })}
            </div>
            <p className="text-sm text-gray-600">Danger variant for destructive actions</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCheckboxCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-2 text-sm font-medium">With Description</h4>
          <div className="space-y-4">
            {renderCheckboxExample({ 
              label: 'Checkbox with description', 
              description: 'Additional details about this checkbox option' 
            })}
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium">With Helper Text</h4>
          <div className="space-y-4">
            {renderCheckboxExample({ 
              label: 'Checkbox with helper text', 
              helperText: 'This text provides more context for the user' 
            })}
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium">Checkbox Group</h4>
          <div className="space-y-2">
            <div className="space-y-2">
              {renderCheckboxExample({ label: 'Option 1' })}
              {renderCheckboxExample({ label: 'Option 2' })}
              {renderCheckboxExample({ label: 'Option 3' })}
              <div className="mt-1 text-sm text-gray-500">Select all that apply</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRadioCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-2 text-sm font-medium">Radio Group - Vertical</h4>
          <div className="space-y-2">
            <RadioGroup name="radio-group-1" orientation="vertical">
              {renderRadioExample({ label: 'Option 1' })}
              {renderRadioExample({ label: 'Option 2' })}
              {renderRadioExample({ label: 'Option 3' })}
            </RadioGroup>
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium">Radio Group - Horizontal</h4>
          <div className="space-y-2">
            <RadioGroup name="radio-group-2" orientation="horizontal">
              {renderRadioExample({ label: 'Option 1' })}
              {renderRadioExample({ label: 'Option 2' })}
              {renderRadioExample({ label: 'Option 3' })}
            </RadioGroup>
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium">With Helper Text</h4>
          <div className="space-y-2">
            <RadioGroup name="radio-group-3" orientation="vertical">
              {renderRadioExample({ 
                label: 'Radio with helper text', 
                helperText: 'This text provides additional information' 
              })}
              {renderRadioExample({ label: 'Another option' })}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCheckboxStates = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ label: 'Unchecked' })}
            </div>
            <p className="text-sm text-gray-600">Default unchecked state</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ label: 'Checked', checked: true })}
            </div>
            <p className="text-sm text-gray-600">Checked state</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ label: 'Indeterminate', indeterminate: true })}
            </div>
            <p className="text-sm text-gray-600">Indeterminate state (partial selection)</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ label: 'Disabled', disabled: true })}
            </div>
            <p className="text-sm text-gray-600">Disabled and unchecked</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ label: 'Disabled & Checked', disabled: true, checked: true })}
            </div>
            <p className="text-sm text-gray-600">Disabled and checked</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderCheckboxExample({ label: 'With Error', error: 'This field is required' })}
            </div>
            <p className="text-sm text-gray-600">Error state with message</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRadioStates = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ label: 'Unchecked' })}
            </div>
            <p className="text-sm text-gray-600">Default unchecked state</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ label: 'Checked', checked: true })}
            </div>
            <p className="text-sm text-gray-600">Checked state</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ label: 'Disabled', disabled: true })}
            </div>
            <p className="text-sm text-gray-600">Disabled and unchecked</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ label: 'Disabled & Checked', disabled: true, checked: true })}
            </div>
            <p className="text-sm text-gray-600">Disabled and checked</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ label: 'With Error', error: 'This field is required' })}
            </div>
            <p className="text-sm text-gray-600">Error state</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderRadioExample({ label: 'Required', required: true })}
            </div>
            <p className="text-sm text-gray-600">Required field</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBestPractices = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium mb-4">Do</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use clear and concise labels for checkbox and radio options</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Group related options together logically</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use helper text for additional context when needed</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Provide clear error states with descriptive messages</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Don't</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Use overly long labels that make the option hard to scan</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Use checkboxes for mutually exclusive options (use radio buttons instead)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Mix different types of form controls that serve the same purpose</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Use disabled controls without clear indication of why they're disabled</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h4 className="text-sm font-medium mb-4">Keyboard Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="px-2 py-1 mr-3 bg-gray-100 rounded text-xs font-mono">Tab</span>
                <span>Move focus to the next form control</span>
              </li>
              <li className="flex items-start">
                <span className="px-2 py-1 mr-3 bg-gray-100 rounded text-xs font-mono">Space</span>
                <span>Toggle the currently focused checkbox or radio button</span>
              </li>
              <li className="flex items-start">
                <span className="px-2 py-1 mr-3 bg-gray-100 rounded text-xs font-mono">↑ / ↓</span>
                <span>Navigate between radio buttons in a group (vertical orientation)</span>
              </li>
              <li className="flex items-start">
                <span className="px-2 py-1 mr-3 bg-gray-100 rounded text-xs font-mono">← / →</span>
                <span>Navigate between radio buttons in a group (horizontal orientation)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Screen Reader Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>All form controls include proper ARIA attributes</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>Required fields are properly announced to screen reader users</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>Error states are communicated via aria-invalid and associated error messages</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>Radio groups use aria-labelledby to associate group labels with options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-4 text-sm font-medium">Settings Panel</h4>
          <div className="p-4 border border-gray-200 rounded-md">
            <h5 className="text-base font-medium mb-4">Application Settings</h5>
            <div className="space-y-3">
              {renderCheckboxExample({ label: 'Enable notifications', checked: true })}
              {renderCheckboxExample({ label: 'Allow data collection for analytics', checked: true })}
              {renderCheckboxExample({ label: 'Enable dark mode', checked: false })}
              {renderCheckboxExample({ label: 'Automatically update application', checked: true })}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="mb-4 text-sm font-medium">Survey Form</h4>
          <div className="p-4 border border-gray-200 rounded-md">
            <h5 className="text-base font-medium mb-4">User Preferences Survey</h5>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-2">How do you prefer to receive updates?</p>
                <RadioGroup name="update-preference" orientation="vertical">
                  {renderRadioExample({ label: 'Email', checked: true })}
                  {renderRadioExample({ label: 'Push notification' })}
                  {renderRadioExample({ label: 'In-app messages' })}
                  {renderRadioExample({ label: 'SMS' })}
                </RadioGroup>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Which features do you use most often? (Select all that apply)</p>
                <div className="space-y-2">
                  {renderCheckboxExample({ label: 'Dashboard' })}
                  {renderCheckboxExample({ label: 'Reports', checked: true })}
                  {renderCheckboxExample({ label: 'Calendar' })}
                  {renderCheckboxExample({ label: 'Collaboration tools', checked: true })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCheckboxPlayground = () => (
    <ComponentPlayground
      code={generateCheckboxCode()}
      defaultProps={defaultCheckboxPlaygroundProps}
      preview={
        <div className="w-full p-6 flex items-center justify-center bg-white rounded-lg">
          <div className="w-full max-w-md">
            {renderCheckboxExample(checkboxPlaygroundProps)}
          </div>
        </div>
      }
      controls={[
        {
          group: 'Variant',
          items: [
            {
              type: 'select',
              label: 'Variant',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Success', value: 'success' },
                { label: 'Warning', value: 'warning' },
                { label: 'Danger', value: 'danger' }
              ],
              value: checkboxPlaygroundProps.variant,
              onChange: (value: string) => setCheckboxPlaygroundProps({
                ...checkboxPlaygroundProps, 
                variant: value as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
              })
            },
            {
              type: 'select',
              label: 'Size',
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' }
              ],
              value: checkboxPlaygroundProps.size,
              onChange: (value: string) => setCheckboxPlaygroundProps({
                ...checkboxPlaygroundProps, 
                size: value as 'sm' | 'md' | 'lg'
              })
            }
          ]
        },
        {
          group: 'State',
          items: [
            {
              type: 'chip',
              label: 'Checked',
              value: checkboxPlaygroundProps.checked,
              onChange: (value: boolean) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, checked: value})
            },
            {
              type: 'chip',
              label: 'Indeterminate',
              value: checkboxPlaygroundProps.indeterminate,
              onChange: (value: boolean) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, indeterminate: value})
            },
            {
              type: 'chip',
              label: 'Disabled',
              value: checkboxPlaygroundProps.disabled,
              onChange: (value: boolean) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, disabled: value})
            },
            {
              type: 'chip',
              label: 'Required',
              value: checkboxPlaygroundProps.required,
              onChange: (value: boolean) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, required: value})
            }
          ]
        },
        {
          group: 'Content',
          items: [
            {
              type: 'input',
              label: 'Label Text',
              value: checkboxPlaygroundProps.label,
              onChange: (value: string) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, label: value})
            },
            {
              type: 'input',
              label: 'Description',
              value: checkboxPlaygroundProps.description,
              onChange: (value: string) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, description: value})
            },
            {
              type: 'input',
              label: 'Helper Text',
              value: checkboxPlaygroundProps.helperText,
              onChange: (value: string) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, helperText: value})
            },
            {
              type: 'input',
              label: 'Error Message',
              value: checkboxPlaygroundProps.error,
              onChange: (value: string) => setCheckboxPlaygroundProps({...checkboxPlaygroundProps, error: value})
            }
          ]
        }
      ]}
    />
  );

  const renderRadioPlayground = () => (
    <ComponentPlayground
      code={generateRadioCode()}
      defaultProps={defaultRadioPlaygroundProps}
      preview={
        <div className="w-full p-6 flex items-center justify-center bg-white rounded-lg">
          <div className="w-full max-w-md">
            <RadioGroup name="playground-radio-group" orientation={radioPlaygroundProps.orientation}>
              {renderRadioExample(radioPlaygroundProps)}
              <Radio label="Another option" value="option2" />
              <Radio label="Third option" value="option3" />
            </RadioGroup>
          </div>
        </div>
      }
      controls={[
        {
          group: 'Variant',
          items: [
            {
              type: 'select',
              label: 'Variant',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Success', value: 'success' },
                { label: 'Warning', value: 'warning' },
                { label: 'Danger', value: 'danger' }
              ],
              value: radioPlaygroundProps.variant,
              onChange: (value: string) => setRadioPlaygroundProps({
                ...radioPlaygroundProps, 
                variant: value as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
              })
            },
            {
              type: 'select',
              label: 'Size',
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' }
              ],
              value: radioPlaygroundProps.size,
              onChange: (value: string) => setRadioPlaygroundProps({
                ...radioPlaygroundProps, 
                size: value as 'sm' | 'md' | 'lg'
              })
            },
            {
              type: 'select',
              label: 'Orientation',
              options: [
                { label: 'Vertical', value: 'vertical' },
                { label: 'Horizontal', value: 'horizontal' }
              ],
              value: radioPlaygroundProps.orientation,
              onChange: (value: string) => setRadioPlaygroundProps({
                ...radioPlaygroundProps, 
                orientation: value as 'horizontal' | 'vertical'
              })
            }
          ]
        },
        {
          group: 'State',
          items: [
            {
              type: 'chip',
              label: 'Checked',
              value: radioPlaygroundProps.checked,
              onChange: (value: boolean) => setRadioPlaygroundProps({...radioPlaygroundProps, checked: value})
            },
            {
              type: 'chip',
              label: 'Disabled',
              value: radioPlaygroundProps.disabled,
              onChange: (value: boolean) => setRadioPlaygroundProps({...radioPlaygroundProps, disabled: value})
            },
            {
              type: 'chip',
              label: 'Required',
              value: radioPlaygroundProps.required,
              onChange: (value: boolean) => setRadioPlaygroundProps({...radioPlaygroundProps, required: value})
            },
            {
              type: 'chip',
              label: 'Error',
              value: radioPlaygroundProps.error !== '',
              onChange: (value: boolean) => setRadioPlaygroundProps({
                ...radioPlaygroundProps, 
                error: value ? 'This field is required' : ''
              })
            }
          ]
        },
        {
          group: 'Content',
          items: [
            {
              type: 'input',
              label: 'Label Text',
              value: radioPlaygroundProps.label,
              onChange: (value: string) => setRadioPlaygroundProps({...radioPlaygroundProps, label: value})
            },
            {
              type: 'input',
              label: 'Helper Text',
              value: radioPlaygroundProps.helperText,
              onChange: (value: string) => setRadioPlaygroundProps({...radioPlaygroundProps, helperText: value})
            }
          ]
        }
      ]}
    />
  );

  const renderCheckboxApiReference = () => (
    <div className="space-y-8">
      <div>
        <SectionHeader title="Props" />
        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Text label for the checkbox</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">checked</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether the checkbox is checked</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">indeterminate</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether the checkbox is in an indeterminate state</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">disabled</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether the checkbox is disabled</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">required</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether the checkbox is required</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">description</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Additional description text below the label</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">error</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Error message to display</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">variant</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Visual style variant (default, primary, secondary, etc.)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">size</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Size of the checkbox (sm, md, lg)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">name</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Name attribute for the input</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">onChange</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">function</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Callback when the checkbox state changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRadioApiReference = () => (
    <div className="space-y-8">
      <div>
        <SectionHeader title="Radio Props" />
        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Text label for the radio button</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">value</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500">Value of the radio button</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">checked</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether the radio button is checked</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">disabled</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether the radio button is disabled</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">required</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether the radio button is required</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">error</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether to display in error state</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">variant</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Visual style variant (default, primary, secondary, etc.)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">size</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Size of the radio button (sm, md, lg)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">name</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Name attribute for the input</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">onChange</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">function</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Callback when the radio button state changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <SectionHeader title="RadioGroup Props" />
        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">orientation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Layout orientation (horizontal or vertical)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">value</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Currently selected value</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">name</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500">Name attribute for all radio inputs in the group</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">onChange</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">function</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Callback when the selected value changes</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">disabled</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Disables all radio buttons in the group</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Form Controls"
      description="Checkboxes, radio buttons, and switches for collecting user input."
      status={{ label: "Stable", color: "blue" }}
      importCode={`import { Checkbox } from '@/components/ui/Checkbox';
import { Radio, RadioGroup } from '@/components/ui/Radio';`}
      rightNavItems={rightNavItems}
      renderCoreVariants={() => (
        <Tabs defaultValue="checkbox" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-auto grid-cols-2 mb-4 max-w-[300px]">
            <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
            <TabsTrigger value="radio">Radio Button</TabsTrigger>
          </TabsList>
          <TabsContent value="checkbox">
            {renderCoreCheckboxVariants()}
          </TabsContent>
          <TabsContent value="radio">
            {renderCoreRadioVariants()}
          </TabsContent>
        </Tabs>
      )}
      renderCompositions={() => (
        <Tabs defaultValue="checkbox" className="w-full">
          <TabsList className="grid w-auto grid-cols-2 mb-4 max-w-[300px]">
            <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
            <TabsTrigger value="radio">Radio Button</TabsTrigger>
          </TabsList>
          <TabsContent value="checkbox">
            {renderCheckboxCompositions()}
          </TabsContent>
          <TabsContent value="radio">
            {renderRadioCompositions()}
          </TabsContent>
        </Tabs>
      )}
      renderInteractiveStates={() => (
        <Tabs defaultValue="checkbox" className="w-full">
          <TabsList className="grid w-auto grid-cols-2 mb-4 max-w-[300px]">
            <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
            <TabsTrigger value="radio">Radio Button</TabsTrigger>
          </TabsList>
          <TabsContent value="checkbox">
            {renderCheckboxStates()}
          </TabsContent>
          <TabsContent value="radio">
            {renderRadioStates()}
          </TabsContent>
        </Tabs>
      )}
      renderPatterns={() => renderBestPractices()}
      renderAccessibility={() => renderAccessibility()}
      renderUseCases={() => renderUseCases()}
      renderPlayground={() => (
        <Tabs defaultValue="checkbox" className="w-full">
          <TabsList className="grid w-auto grid-cols-2 mb-4 max-w-[300px]">
            <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
            <TabsTrigger value="radio">Radio Button</TabsTrigger>
          </TabsList>
          <TabsContent value="checkbox">
            {renderCheckboxPlayground()}
          </TabsContent>
          <TabsContent value="radio">
            {renderRadioPlayground()}
          </TabsContent>
        </Tabs>
      )}
      renderApiReference={() => (
        <Tabs defaultValue="checkbox" className="w-full">
          <TabsList className="grid w-auto grid-cols-2 mb-4 max-w-[300px]">
            <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
            <TabsTrigger value="radio">Radio Button</TabsTrigger>
          </TabsList>
          <TabsContent value="checkbox">
            {renderCheckboxApiReference()}
          </TabsContent>
          <TabsContent value="radio">
            {renderRadioApiReference()}
          </TabsContent>
        </Tabs>
      )}
      generateCode={() => activeTab === 'checkbox' ? generateCheckboxCode() : generateRadioCode()}
    />
  );
} 