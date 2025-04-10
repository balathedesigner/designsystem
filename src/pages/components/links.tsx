import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';
import { ExternalLink } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { Download } from 'lucide-react';
import { Mail } from 'lucide-react';

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
        { id: 'compositions', label: 'Link Compositions' },
        { id: 'interactive-states', label: 'Interactive States' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'basic', label: 'Basic Links' },
        { id: 'with-icons', label: 'With Icons' },
        { id: 'underline', label: 'Underline Options' }
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

// Define the Link component
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'muted' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'left' | 'right';
  icon?: React.ReactNode;
  underline?: 'none' | 'hover' | 'always';
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    iconPosition = 'right',
    icon,
    underline = 'hover',
    external = false,
    children, 
    className, 
    href,
    ...props 
  }, ref) => {
    const underlineClasses = {
      'none': '',
      'hover': 'hover:underline',
      'always': 'underline'
    };

    const sizeClasses = {
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg'
    };

    const variantClasses = {
      'default': 'text-gray-700 hover:text-gray-900',
      'primary': 'text-blue-600 hover:text-blue-700',
      'secondary': 'text-purple-600 hover:text-purple-700',
      'muted': 'text-gray-500 hover:text-gray-700',
      'danger': 'text-red-600 hover:text-red-700'
    };

    const externalProps = external ? {
      target: '_blank',
      rel: 'noopener noreferrer'
    } : {};

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'transition-colors duration-200',
          sizeClasses[size],
          variantClasses[variant],
          underlineClasses[underline],
          'inline-flex items-center gap-1',
          className
        )}
        {...externalProps}
        {...props}
      >
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
        {external && !icon && <ExternalLink className="ml-1 h-4 w-4" />}
      </a>
    );
  }
);

Link.displayName = 'Link';

// Define playground props interface
interface PlaygroundProps {
  variant: 'default' | 'primary' | 'secondary' | 'muted' | 'danger';
  size: 'sm' | 'md' | 'lg';
  underline: 'none' | 'hover' | 'always';
  iconPosition: 'left' | 'right';
  showIcon: boolean;
  iconType: 'arrow' | 'external' | 'download' | 'mail';
  external: boolean;
  customText: string;
}

const defaultPlaygroundProps: PlaygroundProps = {
  variant: 'primary',
  size: 'md',
  underline: 'hover',
  iconPosition: 'right',
  showIcon: false,
  iconType: 'arrow',
  external: false,
  customText: 'Click here'
};

// Main component
export default function LinksPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  // Function to get icon based on type
  const getIcon = (type: string) => {
    switch (type) {
      case 'arrow':
        return <ArrowRight className="h-4 w-4" />;
      case 'external':
        return <ArrowUpRight className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'mail':
        return <Mail className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  // Generate code for playground
  const generateCode = () => {
    const props = [];
    
    if (playgroundProps.variant !== 'default') {
      props.push(`variant="${playgroundProps.variant}"`);
    }
    
    if (playgroundProps.size !== 'md') {
      props.push(`size="${playgroundProps.size}"`);
    }
    
    if (playgroundProps.underline !== 'hover') {
      props.push(`underline="${playgroundProps.underline}"`);
    }
    
    if (playgroundProps.showIcon) {
      props.push(`iconPosition="${playgroundProps.iconPosition}"`);
      const iconComponent = playgroundProps.iconType === 'arrow'
        ? 'ArrowRight'
        : playgroundProps.iconType === 'external'
          ? 'ArrowUpRight'
          : playgroundProps.iconType === 'download'
            ? 'Download'
            : 'Mail';
      props.push(`icon={<${iconComponent} className="h-4 w-4" />}`);
    }
    
    if (playgroundProps.external) {
      props.push('external={true}');
    }
    
    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    const iconImport = playgroundProps.showIcon
      ? `import { ${playgroundProps.iconType === 'arrow'
          ? 'ArrowRight'
          : playgroundProps.iconType === 'external'
            ? 'ArrowUpRight'
            : playgroundProps.iconType === 'download'
              ? 'Download'
              : 'Mail'} } from 'lucide-react';`
      : '';
    
    return `import { Link } from '@/components/ui/Link';
${playgroundProps.showIcon ? iconImport : ''}

export default function Example() {
  return (
    <Link
      href="#"${propsString}
    >
      ${playgroundProps.customText}
    </Link>
  );
}`;
  };

  // Render examples
  const renderDocExample = (props: Partial<PlaygroundProps> = {}) => {
    const mergedProps = { ...defaultPlaygroundProps, ...props };
    const icon = mergedProps.showIcon ? getIcon(mergedProps.iconType) : undefined;
    
    return (
      <Link
        href="#"
        variant={mergedProps.variant}
        size={mergedProps.size}
        underline={mergedProps.underline}
        iconPosition={mergedProps.iconPosition}
        icon={icon}
        external={mergedProps.external}
      >
        {mergedProps.customText}
      </Link>
    );
  };

  // Section renderers
  const renderCoreVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'default' })}
            </div>
            <p className="text-sm text-gray-600">Default variant with standard styling</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'primary' })}
            </div>
            <p className="text-sm text-gray-600">Primary variant for important links</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'secondary' })}
            </div>
            <p className="text-sm text-gray-600">Secondary variant for alternative styling</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'muted' })}
            </div>
            <p className="text-sm text-gray-600">Muted variant for less prominent links</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'danger' })}
            </div>
            <p className="text-sm text-gray-600">Danger variant for warning actions</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-4 text-sm font-medium">Basic Link</h4>
          <div className="space-y-4">
            {renderDocExample({ showIcon: false })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">With Right Icon</h4>
          <div className="space-y-4">
            {renderDocExample({ showIcon: true, iconPosition: 'right' })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">With Left Icon</h4>
          <div className="space-y-4">
            {renderDocExample({ showIcon: true, iconPosition: 'left' })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">External Link</h4>
          <div className="space-y-4">
            {renderDocExample({ external: true })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSizes = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ size: 'sm' })}
            </div>
            <p className="text-sm text-gray-600">Small size</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ size: 'md' })}
            </div>
            <p className="text-sm text-gray-600">Medium size (default)</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ size: 'lg' })}
            </div>
            <p className="text-sm text-gray-600">Large size</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInteractiveStates = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-4 text-sm font-medium">Underline on Hover</h4>
          <div className="space-y-4">
            {renderDocExample({ underline: 'hover' })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">Always Underlined</h4>
          <div className="space-y-4">
            {renderDocExample({ underline: 'always' })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">No Underline</h4>
          <div className="space-y-4">
            {renderDocExample({ underline: 'none' })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBestPractices = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-green-600 mb-2">Do</h4>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Use descriptive link text that clearly indicates where the link leads</p>
              <div className="mt-4">
                {renderDocExample({ customText: 'Learn more about our services' })}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-600 mb-2">Don't</h4>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Use vague link text like "click here" without context</p>
              <div className="mt-4">
                {renderDocExample({ customText: 'Click here' })}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-green-600 mb-2">Do</h4>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Indicate when links will open in a new tab</p>
              <div className="mt-4">
                {renderDocExample({ external: true, customText: 'Visit external website' })}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-600 mb-2">Don't</h4>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Open links in new tabs without indicating to users</p>
              <div className="mt-4">
                {renderDocExample({ customText: 'Visit our website' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-4">
        <p className="text-sm text-gray-700">Links should be accessible to all users, including those who use assistive technologies. Follow these guidelines:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Use descriptive link text that makes sense out of context</li>
          <li>Ensure sufficient color contrast between link text and background</li>
          <li>Provide visual cues beyond just color (like underlines) to indicate links</li>
          <li>Use proper HTML semantics with the &lt;a&gt; element</li>
          <li>For links that open in new windows, include indicators and appropriate ARIA attributes</li>
        </ul>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-4 text-sm font-medium">Navigation Links</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              {renderDocExample({ variant: 'default', customText: 'Home' })}
              {renderDocExample({ variant: 'default', customText: 'Products' })}
              {renderDocExample({ variant: 'default', customText: 'Services' })}
              {renderDocExample({ variant: 'default', customText: 'Contact' })}
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">Call to Action Links</h4>
          <div className="space-y-4">
            {renderDocExample({ variant: 'primary', showIcon: true, iconType: 'arrow', customText: 'Get started' })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">Resource Links</h4>
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              {renderDocExample({ showIcon: true, iconType: 'download', customText: 'Download PDF' })}
              {renderDocExample({ showIcon: true, iconType: 'external', customText: 'View documentation' })}
              {renderDocExample({ showIcon: true, iconType: 'mail', customText: 'Contact support' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlayground = () => (
    <ComponentPlayground
      defaultProps={defaultPlaygroundProps}
      controls={[
        {
          group: 'Style',
          items: [
            {
              type: 'select',
              label: 'Variant',
              value: playgroundProps.variant,
              options: [
                { value: 'default', label: 'Default' },
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'muted', label: 'Muted' },
                { value: 'danger', label: 'Danger' }
              ],
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, variant: value })
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
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, size: value })
            },
            {
              type: 'select',
              label: 'Underline',
              value: playgroundProps.underline,
              options: [
                { value: 'none', label: 'None' },
                { value: 'hover', label: 'On Hover' },
                { value: 'always', label: 'Always' }
              ],
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, underline: value })
            }
          ]
        },
        {
          group: 'Icon',
          items: [
            {
              type: 'chip',
              label: 'Show Icon',
              value: playgroundProps.showIcon,
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, showIcon: value })
            },
            {
              type: 'select',
              label: 'Icon Type',
              value: playgroundProps.iconType,
              options: [
                { value: 'arrow', label: 'Arrow' },
                { value: 'external', label: 'External' },
                { value: 'download', label: 'Download' },
                { value: 'mail', label: 'Mail' }
              ],
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, iconType: value })
            },
            {
              type: 'select',
              label: 'Icon Position',
              value: playgroundProps.iconPosition,
              options: [
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' }
              ],
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, iconPosition: value })
            }
          ]
        },
        {
          group: 'Content',
          items: [
            {
              type: 'input',
              label: 'Link Text',
              value: playgroundProps.customText,
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, customText: value })
            },
            {
              type: 'chip',
              label: 'External Link',
              value: playgroundProps.external,
              onChange: (value) => setPlaygroundProps({ ...playgroundProps, external: value })
            }
          ]
        }
      ]}
      preview={
        <div className="bg-white p-6 rounded-md">
          {renderDocExample(playgroundProps)}
        </div>
      }
      code={generateCode()}
      previewClassName="bg-gray-100"
    />
  );

  const renderApiReference = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">variant</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'default' | 'primary' | 'secondary' | 'muted' | 'danger'</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'default'</td>
              <td className="px-4 py-4 text-sm text-gray-600">Determines the color and style of the link</td>
            </tr>
            <tr>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">size</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'sm' | 'md' | 'lg'</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'md'</td>
              <td className="px-4 py-4 text-sm text-gray-600">Controls the font size of the link</td>
            </tr>
            <tr>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">iconPosition</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'left' | 'right'</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'right'</td>
              <td className="px-4 py-4 text-sm text-gray-600">Determines the position of the icon relative to the text</td>
            </tr>
            <tr>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">icon</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">React.ReactNode</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">undefined</td>
              <td className="px-4 py-4 text-sm text-gray-600">Optional icon to display with the link</td>
            </tr>
            <tr>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">underline</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'none' | 'hover' | 'always'</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">'hover'</td>
              <td className="px-4 py-4 text-sm text-gray-600">Controls when the underline appears</td>
            </tr>
            <tr>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">external</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">boolean</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">false</td>
              <td className="px-4 py-4 text-sm text-gray-600">Whether the link opens in a new tab and shows an external icon</td>
            </tr>
            <tr>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">...rest</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">AnchorHTMLAttributes</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">-</td>
              <td className="px-4 py-4 text-sm text-gray-600">All standard HTML anchor attributes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Links"
      description="Links allow users to navigate between pages or resources within the application."
      status={{ label: 'Stable', color: 'blue' }}
      importCode={`import { Link } from '@/components/ui/Link';`}
      rightNavItems={rightNavItems}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      renderAccessibility={renderAccessibility}
      renderInteractiveStates={renderInteractiveStates}
      generateCode={generateCode}
    />
  );
} 