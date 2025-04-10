import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Select } from '@/components/ui/Select';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';
import CodeBlock from '@/components/shared/CodeBlock';

type SelectVariant = 'default' | 'outlined' | 'filled';
type SelectSize = 'sm' | 'md' | 'lg';
type SelectState = 'default' | 'disabled' | 'error' | 'success';

interface PlaygroundProps {
  variant: SelectVariant;
  size: SelectSize;
  state: SelectState;
  isMulti: boolean;
  isSearchable: boolean;
  isClearable: boolean;
  placeholder: string;
  isDisabled: boolean;
  hasError: boolean;
  hasSuccess: boolean;
  className: string;
}

const defaultPlaygroundProps: PlaygroundProps = {
  variant: 'default',
  size: 'md',
  state: 'default',
  isMulti: false,
  isSearchable: false,
  isClearable: false,
  placeholder: 'Select an option...',
  isDisabled: false,
  hasError: false,
  hasSuccess: false,
  className: ''
};

const SELECT_CONFIG = {
  variants: ['default', 'outlined', 'filled'] as const,
  sizes: ['sm', 'md', 'lg'] as const,
  states: ['default', 'disabled', 'error', 'success'] as const
};

const sampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' }
];

const SelectPage = () => {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  const generateCode = () => {
    const props = [];
    
    // Variant
    if (playgroundProps.variant !== 'default') {
      props.push(`variant="${playgroundProps.variant}"`);
    }
    
    // Size
    if (playgroundProps.size !== 'md') {
      props.push(`size="${playgroundProps.size}"`);
    }

    // Features
    if (playgroundProps.isMulti) {
      props.push('isMulti={true}');
    }

    if (playgroundProps.isSearchable) {
      props.push('isSearchable={true}');
    }

    if (playgroundProps.isClearable) {
      props.push('isClearable={true}');
    }

    // States
    if (playgroundProps.isDisabled) {
      props.push('isDisabled={true}');
    }

    if (playgroundProps.hasError) {
      props.push('hasError={true}');
    }

    if (playgroundProps.hasSuccess) {
      props.push('hasSuccess={true}');
    }

    const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
    
    return `import { Select } from '@/components/ui/Select';

export default function Example() {
  return (
    <Select${propsString}
      options={[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
      ]}
      placeholder="Select an option"
    />
  );
}`;
  };

  const renderDocExample = (props: Partial<PlaygroundProps>) => {
    const mergedProps = { ...playgroundProps, ...props };
    const selectProps: any = {
      variant: mergedProps.variant,
      size: mergedProps.size,
      isDisabled: mergedProps.isDisabled,
      hasError: mergedProps.hasError,
      hasSuccess: mergedProps.hasSuccess,
      isMulti: mergedProps.isMulti,
      isSearchable: mergedProps.isSearchable,
      isClearable: mergedProps.isClearable,
      placeholder: mergedProps.placeholder,
      options: sampleOptions,
      className: mergedProps.className
    };

    return <Select {...selectProps} />;
  };

  const renderCoreVariants = () => (
    <div className="space-y-8">
      <SectionHeader 
        title="Core Variants" 
        description="Different styles and variations of the Select component to suit various use cases."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Types */}
        <div className="space-y-4">
          <SubsectionHeader title="Basic Types" />
          <div className="flex flex-wrap gap-4">
            {SELECT_CONFIG.variants.map(variant => (
              <div key={variant} className="flex-none">
                {renderDocExample({ variant: variant as SelectVariant })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Sizes */}
        <div className="space-y-4">
          <SubsectionHeader title="Sizes" />
          <div className="flex flex-wrap gap-4">
            {SELECT_CONFIG.sizes.map(size => (
              <div key={size} className="flex-none">
                {renderDocExample({ size: size as SelectSize })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="space-y-8">
      <SectionHeader 
        title="Select Groups & Compositions"
        description="Combine Select components to create powerful forms and patterns."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <SubsectionHeader title="With Labels" />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select an option</label>
              {renderDocExample({})}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <SubsectionHeader title="With Helper Text" />
          <div className="space-y-4">
            <div>
              {renderDocExample({})}
              <p className="mt-1 text-sm text-gray-500">Please select an option from the dropdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="space-y-4">
      <SectionHeader title="Use Cases" />
      <div className="grid grid-cols-1 gap-4">
        <div>
          <SubsectionHeader title="Form Selection" />
          <Select
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ]}
            placeholder="Select an option"
          />
        </div>
        <div>
          <SubsectionHeader title="Multi-select" />
          <Select
            isMulti
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ]}
            placeholder="Select multiple options"
          />
        </div>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="space-y-4">
      <SectionHeader title="Accessibility" />
      <p>
        The Select component is built with accessibility in mind:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Keyboard navigation support</li>
        <li>ARIA attributes for screen readers</li>
        <li>Focus management</li>
        <li>Clear error states</li>
      </ul>
    </div>
  );

  const renderBestPractices = () => (
    <div className="space-y-8">
      <SectionHeader 
        title="Best Practices" 
        description="Follow these guidelines to create consistent and user-friendly select components."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Do's */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-600">Do's</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use clear, descriptive labels for options.</li>
            <li>Provide a default option when appropriate.</li>
            <li>Use multi-select for selecting multiple items.</li>
            <li>Ensure accessibility with proper ARIA attributes.</li>
          </ul>
        </div>
        {/* Don'ts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-600">Don'ts</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Don't use vague or generic option labels.</li>
            <li>Don't overload the select with too many options.</li>
            <li>Don't forget to handle empty or error states.</li>
            <li>Don't ignore keyboard navigation support.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPlayground = () => (
    <div className="space-y-8">
      <SectionHeader
        title="Interactive Playground"
        description="Experiment with different configurations and see the Select component in action."
      />
      <ComponentPlayground
        defaultProps={playgroundProps}
        controls={[
          {
            group: 'Appearance',
            items: [
              {
                type: 'select',
                label: 'Variant',
                value: playgroundProps.variant,
                options: [
                  { value: 'default', label: 'Default' },
                  { value: 'outlined', label: 'Outlined' },
                  { value: 'filled', label: 'Filled' }
                ],
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, variant: value as SelectVariant }))
              },
              {
                type: 'select',
                label: 'Size',
                value: playgroundProps.size,
                options: [
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' }
                ],
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, size: value as SelectSize }))
              }
            ]
          },
          {
            group: 'Features',
            items: [
              {
                type: 'chip',
                label: 'Multi-select',
                value: playgroundProps.isMulti,
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, isMulti: value }))
              },
              {
                type: 'chip',
                label: 'Searchable',
                value: playgroundProps.isSearchable,
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, isSearchable: value }))
              },
              {
                type: 'chip',
                label: 'Clearable',
                value: playgroundProps.isClearable,
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, isClearable: value }))
              }
            ]
          },
          {
            group: 'State',
            items: [
              {
                type: 'chip',
                label: 'Disabled',
                value: playgroundProps.isDisabled,
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, isDisabled: value }))
              },
              {
                type: 'chip',
                label: 'Error',
                value: playgroundProps.hasError,
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, hasError: value }))
              },
              {
                type: 'chip',
                label: 'Success',
                value: playgroundProps.hasSuccess,
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, hasSuccess: value }))
              }
            ]
          }
        ]}
        preview={
          <div className="w-full max-w-md p-6 flex items-center justify-center bg-white rounded-lg">
            <Select
              options={sampleOptions}
              variant={playgroundProps.variant}
              size={playgroundProps.size}
              isMulti={playgroundProps.isMulti}
              isSearchable={playgroundProps.isSearchable}
              isClearable={playgroundProps.isClearable}
              isDisabled={playgroundProps.isDisabled}
              hasError={playgroundProps.hasError}
              hasSuccess={playgroundProps.hasSuccess}
              placeholder={playgroundProps.placeholder}
            />
          </div>
        }
        code={generateCode()}
      />
    </div>
  );

  const renderApiReference = () => (
    <div className="space-y-8">
      <SectionHeader 
        title="API Reference" 
        description="Complete list of props and configurations available for the Select component."
      />
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <CodeBlock
          code={`
interface SelectProps {
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  options: SelectOption[];
  placeholder?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

interface SelectOption {
  value: string;
  label: string;
}
          `}
          language="typescript"
        />
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Select"
      description="A customizable select component that supports single and multi-select options."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Select } from '@/components/ui/Select';"
      rightNavItems={{
        items: [
          { id: 'playground', label: 'Playground' },
          { id: 'core-variants', label: 'Core Variants' },
          { id: 'compositions', label: 'Compositions' },
          { id: 'use-cases', label: 'Use Cases' },
          { id: 'api-reference', label: 'API Reference' },
          { id: 'accessibility', label: 'Accessibility' },
          { id: 'best-practices', label: 'Best Practices' }
        ]
      }}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      renderAccessibility={renderAccessibility}
      renderPatterns={renderBestPractices}
    />
  );
};

export default SelectPage; 