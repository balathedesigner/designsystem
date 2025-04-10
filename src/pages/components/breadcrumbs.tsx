import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/Breadcrumbs';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';
import { Home, User, Settings, FileText } from 'lucide-react';

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
        { id: 'compositions', label: 'Breadcrumb Compositions' },
        { id: 'interactive-states', label: 'Interactive States' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'basic', label: 'Basic Breadcrumbs' },
        { id: 'with-icons', label: 'With Icons' },
        { id: 'truncated', label: 'Truncated' }
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

// Define playground props interface
interface PlaygroundProps {
  variant: 'default' | 'muted' | 'inverted';
  size: 'sm' | 'md' | 'lg';
  withIcons: boolean;
  homeIcon: boolean;
  maxItems: number;
  itemCount: number;
}

const defaultPlaygroundProps: PlaygroundProps = {
  variant: 'default',
  size: 'md',
  withIcons: false,
  homeIcon: true,
  maxItems: 0,
  itemCount: 4
};

// Example breadcrumb items
const getBasicItems = (): BreadcrumbItem[] => [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Categories', href: '#' },
  { label: 'Electronics', current: true }
];

const getIconItems = (): BreadcrumbItem[] => [
  { label: 'Home', href: '#', icon: <Home className="h-4 w-4" /> },
  { label: 'Account', href: '#', icon: <User className="h-4 w-4" /> },
  { label: 'Settings', href: '#', icon: <Settings className="h-4 w-4" /> },
  { label: 'Documentation', current: true, icon: <FileText className="h-4 w-4" /> }
];

// Main component
export default function BreadcrumbsPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  // Generate items based on playground props
  const generateItems = (props: PlaygroundProps): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [];
    const useIcons = props.withIcons;
    
    for (let i = 0; i < props.itemCount; i++) {
      const isLast = i === props.itemCount - 1;
      const item: BreadcrumbItem = {
        label: getItemLabel(i),
        href: isLast ? undefined : '#',
        current: isLast
      };
      
      if (useIcons) {
        item.icon = getItemIcon(i);
      }
      
      items.push(item);
    }
    
    return items;
  };
  
  const getItemLabel = (index: number): string => {
    const labels = ['Home', 'Products', 'Categories', 'Electronics', 'Smartphones', 'Accessories'];
    return index < labels.length ? labels[index] : `Level ${index + 1}`;
  };
  
  const getItemIcon = (index: number): React.ReactNode => {
    const icons = [
      <Home className="h-4 w-4" key="home" />,
      <FileText className="h-4 w-4" key="file" />,
      <User className="h-4 w-4" key="user" />,
      <Settings className="h-4 w-4" key="settings" />
    ];
    return index < icons.length ? icons[index] : icons[index % icons.length];
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
    
    if (playgroundProps.homeIcon) {
      props.push('homeIcon={true}');
    }
    
    if (playgroundProps.maxItems > 0) {
      props.push(`maxItems={${playgroundProps.maxItems}}`);
    }
    
    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    const items = generateItems(playgroundProps);
    
    return `import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
${playgroundProps.withIcons ? 'import { Home, User, Settings, FileText } from \'lucide-react\';' : ''}

export default function Example() {
  const items = [
    ${items.map(item => {
      let itemStr = '{ ';
      itemStr += `label: "${item.label}"`;
      if (item.href) itemStr += `, href: "${item.href}"`;
      if (item.current) itemStr += `, current: true`;
      if (item.icon && playgroundProps.withIcons) {
        const iconName = (item.icon as React.ReactElement).key;
        itemStr += `, icon: <${iconName} className="h-4 w-4" />`;
      }
      itemStr += ' }';
      return itemStr;
    }).join(',\n    ')}
  ];

  return (
    <Breadcrumbs
      items={items}${propsString}
    />
  );
}`;
  };

  // Render examples
  const renderDocExample = (props: Partial<PlaygroundProps>) => {
    const mergedProps = { ...defaultPlaygroundProps, ...props };
    const items = props.withIcons ? getIconItems() : getBasicItems();
    
    // Handle item count modification if specified
    const finalItems = props.itemCount ? generateItems(mergedProps) : items;
    
    return (
      <Breadcrumbs
        variant={mergedProps.variant}
        size={mergedProps.size}
        items={finalItems}
        homeIcon={mergedProps.homeIcon}
        maxItems={mergedProps.maxItems}
        className="w-full"
      />
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
              {renderDocExample({ variant: 'muted' })}
            </div>
            <p className="text-sm text-gray-600">Muted variant with lighter colors</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4 bg-gray-800 p-4 rounded-lg">
              {renderDocExample({ variant: 'inverted' })}
            </div>
            <p className="text-sm text-gray-600">Inverted variant for dark backgrounds</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-4 text-sm font-medium">Basic Breadcrumbs</h4>
          <div className="space-y-4">
            {renderDocExample({ homeIcon: false })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">With Home Icon</h4>
          <div className="space-y-4">
            {renderDocExample({ homeIcon: true })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">With Item Icons</h4>
          <div className="space-y-4">
            {renderDocExample({ withIcons: true })}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">Truncated Breadcrumbs</h4>
          <div className="space-y-4">
            {renderDocExample({ itemCount: 6, maxItems: 4 })}
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
            <p className="text-sm text-gray-600">Small size breadcrumbs</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ size: 'md' })}
            </div>
            <p className="text-sm text-gray-600">Medium size breadcrumbs (default)</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ size: 'lg' })}
            </div>
            <p className="text-sm text-gray-600">Large size breadcrumbs</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBestPractices = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="mb-4">
          <h4 className="text-sm font-medium">Do's</h4>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Use breadcrumbs for sites with hierarchical navigation</li>
            <li>Keep breadcrumb labels concise and descriptive</li>
            <li>Maintain a logical hierarchy that matches the site structure</li>
            <li>Use the homeIcon prop to provide a visual cue for the start of the trail</li>
            <li>Use the maxItems prop with long navigation paths to prevent UI clutter</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Don'ts</h4>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Don't use breadcrumbs for flat site architectures</li>
            <li>Avoid using breadcrumbs as the sole navigation method</li>
            <li>Don't use overly long or complex labels</li>
            <li>Avoid using breadcrumbs for sites with fewer than 3 levels of hierarchy</li>
            <li>Don't include the current page as a clickable link</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">
          The Breadcrumbs component follows WCAG 2.1 guidelines for navigation:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Uses semantic HTML with <code>nav</code> and <code>ol</code> elements</li>
          <li>Includes appropriate <code>aria-label</code> for the navigation landmark</li>
          <li>Uses <code>aria-current="page"</code> to indicate the current page</li>
          <li>Visual separators are marked with <code>aria-hidden="true"</code></li>
          <li>When using the Home icon without text, includes an appropriate <code>sr-only</code> text</li>
          <li>Provides keyboard navigation for all interactive elements</li>
        </ul>
      </div>
    </div>
  );

  const renderInteractiveStates = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div>
          <h4 className="mb-4 text-sm font-medium">Hover State</h4>
          <p className="text-sm text-gray-600 mb-2">
            Breadcrumb links change color on hover to indicate interactivity.
          </p>
          <div className="space-y-4">
            {renderDocExample({})}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">Focus State</h4>
          <p className="text-sm text-gray-600 mb-2">
            Breadcrumb links show a focus ring when navigated to via keyboard.
          </p>
          <div className="space-y-4">
            {renderDocExample({})}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-4 text-sm font-medium">E-commerce Navigation</h4>
          <div className="space-y-4">
            {renderDocExample({ itemCount: 4 })}
            <p className="text-sm text-gray-600">Product category navigation in an e-commerce site</p>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium">Documentation Site</h4>
          <div className="space-y-4">
            {renderDocExample({ withIcons: true, itemCount: 4 })}
            <p className="text-sm text-gray-600">Navigation through documentation sections</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlayground = () => (
    <ComponentPlayground
      code={generateCode()}
      defaultProps={defaultPlaygroundProps}
      preview={
        <div className="w-full p-6 flex items-center justify-center bg-white rounded-lg">
          <div className="w-full max-w-3xl">
            {renderDocExample(playgroundProps)}
          </div>
        </div>
      }
      controls={[
        {
          group: 'Variant',
          items: [
            {
              type: 'select',
              label: 'Type',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Muted', value: 'muted' },
                { label: 'Inverted', value: 'inverted' }
              ],
              value: playgroundProps.variant,
              onChange: (value: string) => setPlaygroundProps({...playgroundProps, variant: value as 'default' | 'muted' | 'inverted'})
            }
          ]
        },
        {
          group: 'Appearance',
          items: [
            {
              type: 'select',
              label: 'Size',
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' }
              ],
              value: playgroundProps.size,
              onChange: (value: string) => setPlaygroundProps({...playgroundProps, size: value as 'sm' | 'md' | 'lg'})
            },
            {
              type: 'chip',
              label: 'Show Home Icon',
              value: playgroundProps.homeIcon,
              onChange: (value: boolean) => setPlaygroundProps({...playgroundProps, homeIcon: value})
            },
            {
              type: 'chip',
              label: 'Show Item Icons',
              value: playgroundProps.withIcons,
              onChange: (value: boolean) => setPlaygroundProps({...playgroundProps, withIcons: value})
            }
          ]
        },
        {
          group: 'Content',
          items: [
            {
              type: 'input',
              label: 'Item Count',
              value: String(playgroundProps.itemCount),
              onChange: (value: string) => setPlaygroundProps({...playgroundProps, itemCount: Number(value)})
            },
            {
              type: 'input',
              label: 'Max Visible Items',
              value: String(playgroundProps.maxItems),
              onChange: (value: string) => setPlaygroundProps({...playgroundProps, maxItems: Number(value)})
            }
          ]
        }
      ]}
    />
  );

  const renderApiReference = () => (
    <div className="space-y-8">
      <div>
        <SectionHeader title="Props" />
        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">items</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">BreadcrumbItem[]</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Required</td>
                <td className="px-6 py-4 text-sm text-gray-500">Array of items to display in the breadcrumb trail</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">variant</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'default' | 'muted' | 'inverted'</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'default'</td>
                <td className="px-6 py-4 text-sm text-gray-500">Visual style variant of the breadcrumbs</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">size</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'sm' | 'md' | 'lg'</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'md'</td>
                <td className="px-6 py-4 text-sm text-gray-500">Size of the breadcrumbs text and icons</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">separator</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ReactNode</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ChevronRight icon</td>
                <td className="px-6 py-4 text-sm text-gray-500">Custom separator between breadcrumb items</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">maxItems</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0 (show all)</td>
                <td className="px-6 py-4 text-sm text-gray-500">Maximum number of items to display before truncating</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">homeIcon</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether to display a home icon at the start of the trail</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">className</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
                <td className="px-6 py-4 text-sm text-gray-500">Additional CSS classes to apply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <SectionHeader title="BreadcrumbItem Interface" />
        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500">Display text for the breadcrumb item</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">href</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Link destination (omit for current page)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">icon</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ReactNode</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Icon to display alongside the item label</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">current</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                <td className="px-6 py-4 text-sm text-gray-500">Whether this item represents the current page</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Breadcrumbs"
      description="Breadcrumbs provide a navigation path showing the user's location within the site hierarchy."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/Breadcrumbs';"
      rightNavItems={rightNavItems}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      renderInteractiveStates={renderInteractiveStates}
      generateCode={generateCode}
    />
  );
} 