import React, { useState } from 'react';
import { ComponentDocTemplate, AnimationSpeed, ANIMATION_SPEEDS, getAnimationClass, getAnimationControl } from '@/components/shared/ComponentDocTemplate';
import { Button } from '@/components/ui/Button';
import { Loader2, ChevronRight, Plus, ArrowRight, Info, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'info' | 'warning' | 'destructive' | 'success';
type ButtonState = 'default' | 'hover' | 'pressed' | 'focused' | 'disabled' | 'loading';
type ButtonSize = 'sm' | 'md' | 'lg';

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
        { id: 'compositions', label: 'Button Groups & Compositions' },
        { id: 'interactive-states', label: 'Interactive States' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'design-tokens', label: 'Design Tokens' },
        { id: 'accessibility', label: 'Accessibility' },
        { id: 'responsive', label: 'Responsive Behavior' }
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

interface PlaygroundProps {
  variant: ButtonVariant;
  state: ButtonState;
  size: ButtonSize;
  iconType: 'none' | 'left' | 'right' | 'both';
  fullWidth: boolean;
  forceFullWidth: boolean;
  customText: string;
  animationSpeed: AnimationSpeed;
  spacing: 'compact' | 'normal' | 'relaxed';
  className?: string;
}

const defaultPlaygroundProps: PlaygroundProps = {
    variant: 'primary',
  state: 'default',
    size: 'md',
  iconType: 'none',
  fullWidth: false,
  forceFullWidth: false,
  customText: 'Button',
  animationSpeed: 'normal',
  spacing: 'normal'
};

// Constants for button configuration
const BUTTON_CONFIG = {
  types: {
    core: ['primary', 'secondary', 'outlined', 'ghost'],
    status: ['info', 'warning', 'destructive', 'success']
  },
  sizes: ['sm', 'md', 'lg'],
  states: ['default', 'hover', 'pressed', 'focused', 'disabled', 'loading']
} as const;

export default function ButtonsPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  const generateCode = () => {
    const props = [];
    
    // Type or Status
    if (['primary', 'secondary', 'outlined', 'ghost'].includes(playgroundProps.variant)) {
      if (playgroundProps.variant !== 'primary') {
        props.push(`variant="${playgroundProps.variant}"`);
      }
    } else if (['destructive', 'success', 'warning', 'info'].includes(playgroundProps.variant)) {
      props.push(`variant="${playgroundProps.variant}"`);
    }
    
    // Size
    if (playgroundProps.size !== 'md') {
      props.push(`size="${playgroundProps.size}"`);
    }

    // States
    if (playgroundProps.state === 'loading') {
      props.push('isLoading={true}');
    }

    if (playgroundProps.state === 'disabled') {
      props.push('disabled={true}');
    }

    if (playgroundProps.fullWidth) {
      props.push('fullWidth={true}');
    }

    // Animation and spacing
    if (playgroundProps.animationSpeed !== 'normal') {
      props.push(`className="${ANIMATION_SPEEDS[playgroundProps.animationSpeed]}"`);
    }

    if (playgroundProps.spacing !== 'normal') {
      const className = playgroundProps.spacing === 'compact' ? 'px-2' : 'px-6';
      const existingClassName = props.find(p => p.startsWith('className='));
      
      if (existingClassName) {
        const index = props.indexOf(existingClassName);
        props[index] = existingClassName.replace('}"', ` ${className}}"`);
      } else {
        props.push(`className="${className}"`);
      }
    }

    const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
    
    let buttonContent = playgroundProps.customText || 'Button';
    let importIcons = '';
    let iconProps = '';

    if (playgroundProps.iconType === 'left' || playgroundProps.iconType === 'both') {
      importIcons = "import { ArrowRight } from 'lucide-react';\n";
      iconProps = "leftIcon={<ArrowRight className=\"h-4 w-4\" />} ";
    }
    
    if (playgroundProps.iconType === 'right' || playgroundProps.iconType === 'both') {
      importIcons = "import { ArrowRight } from 'lucide-react';\n";
      iconProps += "rightIcon={<ArrowRight className=\"h-4 w-4\" />} ";
    }

    // Add state comments in the code
    let stateComment = '';
    if (['hover', 'pressed', 'focused'].includes(playgroundProps.state)) {
      stateComment = `{/* Note: Interactive states like ${playgroundProps.state} are shown here for demonstration purposes only */}\n    `;
    }

    return `import { Button } from '@/components/ui/Button';
${importIcons}
export default function Example() {
    return (
    ${stateComment}<Button${propsString} ${iconProps}>
      ${buttonContent}
      </Button>
    );
}`;
  };

  const renderDocExample = (props: Partial<PlaygroundProps>) => {
    const mergedProps = { ...playgroundProps, ...props };
    const buttonProps: any = {
      variant: mergedProps.variant,
      size: mergedProps.size,
      disabled: mergedProps.state === 'disabled',
      isLoading: mergedProps.state === 'loading',
      fullWidth: mergedProps.fullWidth || props.forceFullWidth,
      className: cn(
        'transition-all whitespace-nowrap',
        mergedProps.spacing === 'compact' && 'px-2',
        mergedProps.spacing === 'relaxed' && 'px-6',
        getAnimationClass(mergedProps.animationSpeed),
        mergedProps.className
      )
    };

    // Add icons based on iconType
    if (mergedProps.iconType === 'left' || mergedProps.iconType === 'both') {
      buttonProps.leftIcon = <ArrowRight className="h-4 w-4" />;
    }
    
    if (mergedProps.iconType === 'right' || mergedProps.iconType === 'both') {
      buttonProps.rightIcon = <ArrowRight className="h-4 w-4" />;
    }

    const buttonText = mergedProps.customText || 'Button';

    // Wrap with state-specific styling
    let button = <Button {...buttonProps}>{buttonText}</Button>;

    // Add interactive state styling
    if (mergedProps.state === 'hover') {
      button = (
        <div className="relative">
          {button}
          <div className="absolute inset-0 bg-black/5 rounded-md pointer-events-none"></div>
        </div>
      );
    } else if (mergedProps.state === 'pressed') {
      button = (
        <div className="relative">
          {button}
          <div className="absolute inset-0 bg-black/10 rounded-md pointer-events-none"></div>
        </div>
      );
    } else if (mergedProps.state === 'focused') {
      button = (
        <div className="relative">
          {button}
          <div className="absolute inset-0 ring-2 ring-blue-500 rounded-md pointer-events-none"></div>
        </div>
      );
    }

    return button;
  };

  const renderCoreVariants = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Types */}
        <div className="space-y-4">
          <SubsectionHeader title="Basic Types" />
          <div className="flex flex-wrap gap-4">
            {BUTTON_CONFIG.types.core.map(variant => (
              <div key={variant} className="flex-none">
                {renderDocExample({ variant: variant as ButtonVariant })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Status Types */}
        <div className="space-y-4">
          <SubsectionHeader title="Status Types" />
          <div className="flex flex-wrap gap-4">
            {BUTTON_CONFIG.types.status.map(variant => (
              <div key={variant} className="flex-none">
                {renderDocExample({ variant: variant as ButtonVariant })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-4">Button Group</h3>
          <div className="flex flex-wrap gap-2">
            {renderDocExample({ variant: 'primary' })}
            {renderDocExample({ variant: 'outlined' })}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-4">With Icons</h3>
          <div className="flex flex-wrap gap-2">
            {renderDocExample({ iconType: 'left' })}
            {renderDocExample({ iconType: 'right' })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDesignTokens = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold mb-4">Design Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Colors</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm">Primary</span>
                <span className="text-sm font-mono">#3B82F6</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Secondary</span>
                <span className="text-sm font-mono">#6B7280</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Spacing</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Padding (sm)</span>
                <span className="text-sm font-mono">0.5rem</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Padding (md)</span>
                <span className="text-sm font-mono">0.75rem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold mb-4">Accessibility Guidelines</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Keyboard Navigation</h4>
              <p className="text-sm text-gray-600">Buttons are focusable and can be activated using Enter or Space keys.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">ARIA Attributes</h4>
              <p className="text-sm text-gray-600">Buttons include proper ARIA roles and states for loading and disabled states.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Color Contrast</h4>
              <p className="text-sm text-gray-600">All button variants maintain WCAG 2.1 AA contrast requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResponsiveBehavior = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold mb-4">Responsive Behavior</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Mobile Touch Targets</h4>
            <p className="text-sm text-gray-600">Buttons maintain a minimum touch target size of 44x44px on mobile devices.</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Stack Behavior</h4>
            <p className="text-sm text-gray-600">Button groups stack vertically on mobile screens for better usability.</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Full Width</h4>
            <p className="text-sm text-gray-600">Full-width buttons are recommended for primary actions on mobile.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInteractiveStates = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic States */}
        <div className="space-y-4">
          <SubsectionHeader title="Basic States" />
          <div className="flex flex-wrap gap-4">
            {BUTTON_CONFIG.states.filter(state => !['loading', 'disabled'].includes(state)).map(state => (
              <div key={state} className="flex-none">
                {renderDocExample({ variant: 'primary', state: state as ButtonState })}
              </div>
            ))}
          </div>
        </div>

        {/* Special States */}
        <div className="space-y-4">
          <SubsectionHeader title="Special States" />
          <div className="flex flex-wrap gap-4">
            {renderDocExample({ variant: 'primary', state: 'loading' })}
            {renderDocExample({ variant: 'primary', state: 'disabled' })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatterns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-green-600 mb-4">Do's</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Use clear, action-oriented labels (e.g., "Save Changes", "Create Account")</p>
                <div className="mt-2">
                  {renderDocExample({ variant: 'primary', customText: 'Save Changes' })}
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Use different button variants to establish visual hierarchy</p>
                <div className="mt-2 flex gap-2">
                  {renderDocExample({ variant: 'primary', customText: 'Primary Action' })}
                  {renderDocExample({ variant: 'secondary', customText: 'Secondary' })}
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Use icons to enhance button meaning when appropriate</p>
                <div className="mt-2">
                  {renderDocExample({ variant: 'primary', customText: 'Download Report', iconType: 'left' })}
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Show loading states for asynchronous actions</p>
                <div className="mt-2">
                  {renderDocExample({ variant: 'primary', customText: 'Saving...', state: 'loading' })}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Don'ts</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Don't use vague or generic labels</p>
                <div className="mt-2">
                  {renderDocExample({ variant: 'primary', customText: 'Click Here' })}
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Don't use too many primary buttons in one section</p>
                <div className="mt-2 space-y-2">
                  {renderDocExample({ variant: 'primary', customText: 'Action 1' })}
                  {renderDocExample({ variant: 'primary', customText: 'Action 2' })}
                  {renderDocExample({ variant: 'primary', customText: 'Action 3' })}
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Don't use inconsistent sizes in a button group</p>
                <div className="mt-2 flex items-center gap-2">
                  {renderDocExample({ variant: 'primary', customText: 'Small', size: 'sm' })}
                  {renderDocExample({ variant: 'primary', customText: 'Medium', size: 'md' })}
                  {renderDocExample({ variant: 'primary', customText: 'Large', size: 'lg' })}
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Don't overuse destructive actions without confirmation</p>
                <div className="mt-2">
                  {renderDocExample({ variant: 'destructive', customText: 'Delete Account' })}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPlayground = () => (
    <ComponentPlayground
      defaultProps={defaultPlaygroundProps}
      controls={[
        {
          group: 'Button Type & Status',
          items: [
            {
              type: 'select' as const,
              label: 'Button Type',
              value: playgroundProps.variant,
              options: BUTTON_CONFIG.types.core.map(type => ({ value: type, label: type })),
              onChange: (value: ButtonVariant) => setPlaygroundProps(prev => ({ ...prev, variant: value }))
            },
            {
              type: 'select' as const,
              label: 'Status',
              value: playgroundProps.variant,
              options: [
                { value: 'none', label: 'None' },
                ...BUTTON_CONFIG.types.status.map(type => ({ value: type, label: type }))
              ],
              onChange: (value: ButtonVariant) => setPlaygroundProps(prev => ({ ...prev, variant: value }))
            }
          ]
        },
        {
          group: 'Appearance',
          items: [
            {
              type: 'select' as const,
              label: 'Size',
              value: playgroundProps.size,
              options: BUTTON_CONFIG.sizes.map(size => ({ value: size, label: size })),
              onChange: (value: ButtonSize) => setPlaygroundProps(prev => ({ ...prev, size: value }))
            },
            {
              type: 'select' as const,
              label: 'Icon',
              value: playgroundProps.iconType,
              options: [
                { value: 'none', label: 'None' },
                { value: 'left', label: 'Left Icon' },
                { value: 'right', label: 'Right Icon' },
                { value: 'both', label: 'Both Sides' }
              ],
              onChange: (value: PlaygroundProps['iconType']) => setPlaygroundProps(prev => ({ ...prev, iconType: value }))
            },
            {
              type: 'chip' as const,
              label: 'Full Width',
              value: playgroundProps.fullWidth,
              onChange: (value: boolean) => setPlaygroundProps(prev => ({ ...prev, fullWidth: value }))
            }
          ]
        },
        {
          group: 'Content & Animation',
          items: [
            {
              type: 'input' as const,
              label: 'Custom Text',
              value: playgroundProps.customText,
              onChange: (value: string) => setPlaygroundProps(prev => ({ ...prev, customText: value }))
            },
            {
              type: 'select' as const,
              label: 'Animation Speed',
              value: playgroundProps.animationSpeed,
              options: [
                { value: 'fast', label: 'Fast' },
                { value: 'normal', label: 'Normal' },
                { value: 'slow', label: 'Slow' }
              ],
              onChange: (value: PlaygroundProps['animationSpeed']) => setPlaygroundProps(prev => ({ ...prev, animationSpeed: value }))
            }
          ]
        },
        {
          group: 'Animation & Spacing',
          items: [
            getAnimationControl(
              playgroundProps.animationSpeed,
              (value) => setPlaygroundProps({ ...playgroundProps, animationSpeed: value })
            ),
            {
              type: 'select',
              label: 'Spacing',
              options: [
                { value: 'compact', label: 'Compact' },
                { value: 'normal', label: 'Normal' },
                { value: 'relaxed', label: 'Relaxed' }
              ],
              value: playgroundProps.spacing,
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, spacing: value as 'compact' | 'normal' | 'relaxed' })
            }
          ]
        }
      ]}
      preview={renderDocExample(playgroundProps)}
      code={generateCode()}
    />
  );

  const renderApiReference = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="divide-y divide-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium mb-4">Core Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Prop</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Default</th>
                  <th className="pb-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 font-mono text-xs">variant</td>
                  <td className="py-2 font-mono text-xs">primary | secondary | outlined | ghost | destructive | success | warning | info</td>
                  <td className="py-2 font-mono text-xs">primary</td>
                  <td className="py-2">Visual style of the button</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">size</td>
                  <td className="py-2 font-mono text-xs">sm | md | lg</td>
                  <td className="py-2 font-mono text-xs">md</td>
                  <td className="py-2">Size of the button</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">disabled</td>
                  <td className="py-2 font-mono text-xs">boolean</td>
                  <td className="py-2 font-mono text-xs">false</td>
                  <td className="py-2">Whether the button is disabled</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">isLoading</td>
                  <td className="py-2 font-mono text-xs">boolean</td>
                  <td className="py-2 font-mono text-xs">false</td>
                  <td className="py-2">Shows a loading spinner and disables the button</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">fullWidth</td>
                  <td className="py-2 font-mono text-xs">boolean</td>
                  <td className="py-2 font-mono text-xs">false</td>
                  <td className="py-2">Makes the button take full width of its container</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">leftIcon</td>
                  <td className="py-2 font-mono text-xs">ReactNode</td>
                  <td className="py-2 font-mono text-xs">undefined</td>
                  <td className="py-2">Icon element to display before button text</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">rightIcon</td>
                  <td className="py-2 font-mono text-xs">ReactNode</td>
                  <td className="py-2 font-mono text-xs">undefined</td>
                  <td className="py-2">Icon element to display after button text</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">className</td>
                  <td className="py-2 font-mono text-xs">string</td>
                  <td className="py-2 font-mono text-xs">undefined</td>
                  <td className="py-2">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-sm font-medium mb-4">Utility Classes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Class</th>
                  <th className="pb-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 font-mono text-xs">duration-150</td>
                  <td className="py-2">Fast animation speed (150ms)</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">duration-300</td>
                  <td className="py-2">Normal animation speed (300ms, default)</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">duration-500</td>
                  <td className="py-2">Slow animation speed (500ms)</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">px-2</td>
                  <td className="py-2">Compact horizontal padding</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">px-4</td>
                  <td className="py-2">Normal horizontal padding (default)</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">px-6</td>
                  <td className="py-2">Relaxed horizontal padding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 space-y-8">
        <div id="basic-examples">
          <h3 className="text-sm font-medium mb-4">Basic Examples</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Primary Buttons</h4>
              <div className="flex flex-wrap gap-4">
                {renderDocExample({ variant: 'primary', size: 'sm', customText: 'Small' })}
                {renderDocExample({ variant: 'primary', customText: 'Medium' })}
                {renderDocExample({ variant: 'primary', size: 'lg', customText: 'Large' })}
              </div>
              <p className="mt-2 text-sm text-gray-600">Use primary buttons for main actions and important CTAs.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Secondary and Outlined Buttons</h4>
              <div className="flex flex-wrap gap-4">
                {renderDocExample({ variant: 'secondary', customText: 'Secondary' })}
                {renderDocExample({ variant: 'outlined', customText: 'Outlined' })}
                {renderDocExample({ variant: 'ghost', customText: 'Ghost' })}
              </div>
              <p className="mt-2 text-sm text-gray-600">Use secondary buttons for alternative actions and outlined for less emphasis.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">State-Specific Buttons</h4>
              <div className="flex flex-wrap gap-4">
                {renderDocExample({ variant: 'destructive', customText: 'Destructive' })}
                {renderDocExample({ variant: 'success', customText: 'Success' })}
                {renderDocExample({ variant: 'warning', customText: 'Warning' })}
                {renderDocExample({ variant: 'info', customText: 'Info' })}
              </div>
              <p className="mt-2 text-sm text-gray-600">Use state-specific buttons to communicate the nature of the action.</p>
            </div>
          </div>
        </div>
        <div id="with-icons">
          <h3 className="text-sm font-medium mb-4">With Icons</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Icon Placement</h4>
              <div className="flex flex-wrap gap-4">
                {renderDocExample({ variant: 'primary', iconType: 'left', customText: 'Left Icon' })}
                {renderDocExample({ variant: 'primary', iconType: 'right', customText: 'Right Icon' })}
                {renderDocExample({ variant: 'primary', iconType: 'both', customText: 'Both Sides' })}
              </div>
              <p className="mt-2 text-sm text-gray-600">Use icons to enhance clarity and visual appeal of buttons.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Common Icon Use Cases</h4>
              <div className="flex flex-wrap gap-4">
                {renderDocExample({ variant: 'primary', iconType: 'left', customText: 'Download' })}
                {renderDocExample({ variant: 'primary', iconType: 'right', customText: 'Next Step' })}
                {renderDocExample({ variant: 'secondary', iconType: 'left', customText: 'Search' })}
              </div>
            </div>
          </div>
        </div>
        <div id="loading">
          <h3 className="text-sm font-medium mb-4">Loading States</h3>
          <div className="flex flex-wrap gap-4">
            {renderDocExample({ variant: 'primary', state: 'loading', customText: 'Submitting...' })}
            {renderDocExample({ variant: 'secondary', state: 'loading', customText: 'Processing...' })}
          </div>
          <p className="mt-2 text-sm text-gray-600">Use loading states to indicate that the button's action is in progress.</p>
        </div>
        <div id="disabled">
          <h3 className="text-sm font-medium mb-4">Disabled State</h3>
          <div className="flex flex-wrap gap-4">
            {renderDocExample({ variant: 'primary', state: 'disabled', customText: 'Disabled Primary' })}
            {renderDocExample({ variant: 'secondary', state: 'disabled', customText: 'Disabled Secondary' })}
            {renderDocExample({ variant: 'outlined', state: 'disabled', customText: 'Disabled Outlined' })}
          </div>
          <p className="mt-2 text-sm text-gray-600">Use disabled states to indicate that a button cannot be interacted with.</p>
        </div>
        <div id="full-width">
          <h3 className="text-sm font-medium mb-4">Full Width</h3>
          <div className="space-y-4">
            <div>
              {renderDocExample({ variant: 'primary', fullWidth: true, customText: 'Full Width Primary Button' })}
            </div>
            <div>
              {renderDocExample({ variant: 'outlined', fullWidth: true, customText: 'Full Width Outlined Button' })}
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Use full width buttons for mobile interfaces or to emphasize important actions.</p>
        </div>
        <div id="variant-combinations">
          <h3 className="text-sm font-medium mb-4">Variant Combinations</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Outlined State Variants</h4>
              <div className="flex flex-wrap gap-4">
                {renderDocExample({ variant: 'outlined', customText: 'Default Outlined' })}
                {renderDocExample({ variant: 'outlined', customText: 'Destructive', className: 'border-red-500 text-red-500 hover:bg-red-50' })}
                {renderDocExample({ variant: 'outlined', customText: 'Success', className: 'border-green-500 text-green-500 hover:bg-green-50' })}
                {renderDocExample({ variant: 'outlined', customText: 'Warning', className: 'border-yellow-500 text-yellow-500 hover:bg-yellow-50' })}
                {renderDocExample({ variant: 'outlined', customText: 'Info', className: 'border-blue-500 text-blue-500 hover:bg-blue-50' })}
              </div>
              <p className="mt-2 text-sm text-gray-600">Outlined buttons can be combined with state colors for different contexts.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Ghost State Variants</h4>
              <div className="flex flex-wrap gap-4">
                {renderDocExample({ variant: 'ghost', customText: 'Default Ghost' })}
                {renderDocExample({ variant: 'ghost', customText: 'Destructive', className: 'text-red-500 hover:bg-red-50' })}
                {renderDocExample({ variant: 'ghost', customText: 'Success', className: 'text-green-500 hover:bg-green-50' })}
                {renderDocExample({ variant: 'ghost', customText: 'Warning', className: 'text-yellow-500 hover:bg-yellow-50' })}
                {renderDocExample({ variant: 'ghost', customText: 'Info', className: 'text-blue-500 hover:bg-blue-50' })}
              </div>
              <p className="mt-2 text-sm text-gray-600">Ghost buttons can be styled with state colors for subtle state indication.</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Combined States</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Loading States with Variants</p>
                  <div className="flex flex-wrap gap-4">
                    {renderDocExample({ variant: 'outlined', state: 'loading', customText: 'Loading Outlined' })}
                    {renderDocExample({ variant: 'ghost', state: 'loading', customText: 'Loading Ghost' })}
                    {renderDocExample({ variant: 'destructive', state: 'loading', customText: 'Loading Destructive' })}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Disabled States with Variants</p>
                  <div className="flex flex-wrap gap-4">
                    {renderDocExample({ variant: 'outlined', state: 'disabled', customText: 'Disabled Outlined' })}
                    {renderDocExample({ variant: 'ghost', state: 'disabled', customText: 'Disabled Ghost' })}
                    {renderDocExample({ variant: 'destructive', state: 'disabled', customText: 'Disabled Destructive' })}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">With Icons and States</p>
                  <div className="flex flex-wrap gap-4">
                    {renderDocExample({ variant: 'outlined', state: 'loading', iconType: 'left', customText: 'Loading with Icon' })}
                    {renderDocExample({ variant: 'ghost', state: 'disabled', iconType: 'right', customText: 'Disabled with Icon' })}
                    {renderDocExample({ variant: 'destructive', iconType: 'both', customText: 'Icons Both Sides' })}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">Buttons can combine different variants, states, and features for complex use cases.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaygroundExample = (props: Partial<PlaygroundProps>) => (
    <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-6">
      <div className="w-auto">
        {renderDocExample(props)}
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Button"
      description="Clickable elements that trigger actions or navigation."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Button } from '@/components/ui/Button';"
      rightNavItems={rightNavItems}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      renderDesignTokens={renderDesignTokens}
      renderAccessibility={renderAccessibility}
      renderResponsiveBehavior={renderResponsiveBehavior}
      renderInteractiveStates={renderInteractiveStates}
      renderPatterns={renderPatterns}
      generateCode={generateCode}
    />
  );
}