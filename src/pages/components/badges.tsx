import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

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
        { id: 'compositions', label: 'Badge Groups & Compositions' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'basic', label: 'Basic Badges' },
        { id: 'with-icons', label: 'With Icons' },
        { id: 'sizes', label: 'Sizes' },
        { id: 'custom', label: 'Custom Styles' }
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

interface PlaygroundProps {
  variant: 'default' | 'outline' | 'solid';
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size: 'sm' | 'md' | 'lg';
  withIcon: boolean;
  iconPosition: 'left' | 'right';
  removable: boolean;
}

const defaultPlaygroundProps: PlaygroundProps = {
  variant: 'default',
  color: 'primary',
  size: 'md',
  withIcon: false,
  iconPosition: 'left',
  removable: false
};

export default function BadgesPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  const generateCode = () => {
    const props = [];
    
    if (playgroundProps.variant !== 'default') {
      props.push(`variant="${playgroundProps.variant}"`);
    }

    if (playgroundProps.color !== 'default') {
      props.push(`color="${playgroundProps.color}"`);
    }

    if (playgroundProps.size !== 'md') {
      props.push(`size="${playgroundProps.size}"`);
    }

    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    
    return `import { Badge } from '@/components/ui/Badge';

export default function Example() {
  return (
    <Badge${propsString}>
      Badge Text
    </Badge>
  );
}`;
  };

  const renderDocExample = (props: Partial<PlaygroundProps>) => {
    const mergedProps = { ...playgroundProps, ...props };
    return (
      <Badge
        variant={mergedProps.variant}
        color={mergedProps.color}
        size={mergedProps.size}
        icon={mergedProps.withIcon ? (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        ) : undefined}
        iconPosition={mergedProps.iconPosition}
        onRemove={mergedProps.removable ? () => {} : undefined}
      >
        Badge Text
      </Badge>
    );
  };

  const renderCoreVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h4 className="mb-2 text-sm font-medium">Default</h4>
            <div className="flex gap-4">
              {renderDocExample({ variant: 'default', color: 'primary' })}
              {renderDocExample({ variant: 'default', color: 'secondary' })}
              {renderDocExample({ variant: 'default', color: 'success' })}
              {renderDocExample({ variant: 'default', color: 'warning' })}
              {renderDocExample({ variant: 'default', color: 'error' })}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Outline</h4>
            <div className="flex gap-4">
              {renderDocExample({ variant: 'outline', color: 'primary' })}
              {renderDocExample({ variant: 'outline', color: 'secondary' })}
              {renderDocExample({ variant: 'outline', color: 'success' })}
              {renderDocExample({ variant: 'outline', color: 'warning' })}
              {renderDocExample({ variant: 'outline', color: 'error' })}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Solid</h4>
            <div className="flex gap-4">
              {renderDocExample({ variant: 'solid', color: 'primary' })}
              {renderDocExample({ variant: 'solid', color: 'secondary' })}
              {renderDocExample({ variant: 'solid', color: 'success' })}
              {renderDocExample({ variant: 'solid', color: 'warning' })}
              {renderDocExample({ variant: 'solid', color: 'error' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-4">With Icons</h3>
          <div className="flex gap-4">
            {renderDocExample({ withIcon: true, iconPosition: 'left' })}
            {renderDocExample({ withIcon: true, iconPosition: 'right' })}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-4">Removable Badges</h3>
          <div className="flex gap-4">
            {renderDocExample({ removable: true })}
            {renderDocExample({ removable: true, withIcon: true })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-4">Common Use Cases</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Status Indicators</h4>
              <div className="flex gap-4">
                {renderDocExample({ color: 'success', variant: 'solid' })}
                {renderDocExample({ color: 'warning', variant: 'solid' })}
                {renderDocExample({ color: 'error', variant: 'solid' })}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Labels</h4>
              <div className="flex gap-4">
                {renderDocExample({ variant: 'outline' })}
                {renderDocExample({ variant: 'outline', withIcon: true })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlayground = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <h3 className="text-sm font-medium mb-4">Preview</h3>
          <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-4">
            {renderDocExample(playgroundProps)}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-medium mb-4">Customize</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Variant</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.variant}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, variant: e.target.value as PlaygroundProps['variant'] }))}
              >
                <option value="default">Default</option>
                <option value="outline">Outline</option>
                <option value="solid">Solid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.color}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, color: e.target.value as PlaygroundProps['color'] }))}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.size}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, size: e.target.value as PlaygroundProps['size'] }))}
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={playgroundProps.withIcon}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, withIcon: e.target.checked }))}
                />
                <span className="text-sm font-medium">With Icon</span>
              </label>
            </div>

            {playgroundProps.withIcon && (
              <div>
                <label className="block text-sm font-medium mb-2">Icon Position</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playgroundProps.iconPosition}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, iconPosition: e.target.value as PlaygroundProps['iconPosition'] }))}
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={playgroundProps.removable}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, removable: e.target.checked }))}
                />
                <span className="text-sm font-medium">Removable</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiReference = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium mb-4">Core Props</h3>
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
                <td className="py-2 font-mono text-xs">default | outline | solid</td>
                <td className="py-2 font-mono text-xs">default</td>
                <td className="py-2">Visual style variant of the badge</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">color</td>
                <td className="py-2 font-mono text-xs">primary | secondary | success | warning | error</td>
                <td className="py-2 font-mono text-xs">primary</td>
                <td className="py-2">Color theme of the badge</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">size</td>
                <td className="py-2 font-mono text-xs">sm | md | lg</td>
                <td className="py-2 font-mono text-xs">md</td>
                <td className="py-2">Size of the badge</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">icon</td>
                <td className="py-2 font-mono text-xs">ReactNode</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Optional icon to display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Badge"
      description="Small visual indicators for statuses, labels, and counts."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Badge } from '@/components/ui/Badge';"
      rightNavItems={rightNavItems}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      generateCode={generateCode}
    />
  );
} 