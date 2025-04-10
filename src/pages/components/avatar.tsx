import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { User } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
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
        { id: 'compositions', label: 'Avatar Groups & Compositions' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'sizes', label: 'Sizes' },
        { id: 'variants', label: 'Variants' },
        { id: 'fallback', label: 'Fallback States' }
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
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'circle' | 'rounded' | 'square';
  src: string;
  alt: string;
  bordered: boolean;
  showFallback: boolean;
}

const demoImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export default function AvatarPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>({
    size: 'md',
    variant: 'circle',
    src: demoImage,
    alt: 'User',
    bordered: false,
    showFallback: false
  });

  const generateCode = () => {
    const props = [];
    
    if (playgroundProps.size !== 'md') {
      props.push(`size="${playgroundProps.size}"`);
    }

    if (playgroundProps.src) {
      props.push(`src="${playgroundProps.src}"`);
    }

    if (playgroundProps.alt) {
      props.push(`alt="${playgroundProps.alt}"`);
    }

    if (playgroundProps.bordered) {
      props.push('bordered');
    }

    if (playgroundProps.showFallback) {
      props.push('fallback={<User className="w-1/2 h-1/2" />}');
    }

    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    
    return `import { Avatar } from '@/components/ui/Avatar';

export default function Example() {
  return (
    <Avatar${propsString} />
  );
}`;
  };

  const renderDocExample = (props: Partial<PlaygroundProps>) => {
    const mergedProps = { ...playgroundProps, ...props };
    return (
      <Avatar
        size={mergedProps.size}
        variant={mergedProps.variant}
        src={mergedProps.showFallback ? undefined : mergedProps.src}
        alt={mergedProps.alt}
        bordered={mergedProps.bordered}
        fallback={<User className="w-1/2 h-1/2" />}
      />
    );
  };

  const renderCoreVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-medium">Circle</h4>
            {renderDocExample({ variant: 'circle' })}
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Rounded</h4>
            {renderDocExample({ variant: 'rounded' })}
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Square</h4>
            {renderDocExample({ variant: 'square' })}
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Bordered</h4>
            {renderDocExample({ bordered: true })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-4">Avatar Group</h3>
          <div className="flex -space-x-2">
            {renderDocExample({})}
            {renderDocExample({ src: undefined })}
            {renderDocExample({ src: demoImage })}
            {renderDocExample({ src: undefined })}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-4">With Badge</h3>
          <div className="relative inline-block">
            {renderDocExample({})}
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
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
              <h4 className="text-sm font-medium mb-2">Profile Header</h4>
              <div className="flex items-center gap-4">
                {renderDocExample({ size: 'xl' })}
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Comment Thread</h4>
              <div className="flex items-start gap-4">
                {renderDocExample({ size: 'sm' })}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-500">Great work on this feature!</p>
                </div>
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
        {/* Preview section */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <h3 className="text-sm font-medium mb-4">Preview</h3>
          <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-4">
            {renderDocExample(playgroundProps)}
          </div>
        </div>

        {/* Customization section */}
        <div className="p-6">
          <h3 className="text-sm font-medium mb-4">Customize</h3>
          <div className="space-y-4">
            {/* Size */}
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.size}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, size: e.target.value as PlaygroundProps['size'] }))}
              >
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            {/* Variant */}
            <div>
              <label className="block text-sm font-medium mb-2">Variant</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.variant}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, variant: e.target.value as PlaygroundProps['variant'] }))}
              >
                <option value="circle">Circle</option>
                <option value="rounded">Rounded</option>
                <option value="square">Square</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.src}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, src: e.target.value }))}
              />
            </div>

            {/* Alt Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Alt Text</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.alt}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, alt: e.target.value }))}
              />
            </div>

            {/* Bordered */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={playgroundProps.bordered}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, bordered: e.target.checked }))}
                />
                <span className="text-sm font-medium">Bordered</span>
              </label>
            </div>

            {/* Show Fallback */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={playgroundProps.showFallback}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, showFallback: e.target.checked }))}
                />
                <span className="text-sm font-medium">Show Fallback</span>
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
                <td className="py-2 font-mono text-xs">size</td>
                <td className="py-2 font-mono text-xs">xs | sm | md | lg | xl</td>
                <td className="py-2 font-mono text-xs">md</td>
                <td className="py-2">Size of the avatar</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">variant</td>
                <td className="py-2 font-mono text-xs">circle | rounded | square</td>
                <td className="py-2 font-mono text-xs">circle</td>
                <td className="py-2">Shape variant of the avatar</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">src</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">URL of the avatar image</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">alt</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Alternative text for the image</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Avatar"
      description="Visual representation of users and entities."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Avatar } from '@/components/ui/Avatar';"
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