import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import Card from '@/components/ui/Card';
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
        { id: 'compositions', label: 'Card Groups & Compositions' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'basic', label: 'Basic Cards' },
        { id: 'with-media', label: 'Cards with Media' },
        { id: 'loading', label: 'Loading State' },
        { id: 'disabled', label: 'Disabled State' }
      ]
    },
    {
      id: 'playground',
      label: 'Interactive Playground',
      subItems: [
        { id: 'preview', label: 'Preview' },
        { id: 'customize', label: 'Customize' }
      ]
    },
    {
      id: 'api',
      label: 'API Reference',
      subItems: [
        { id: 'core-props', label: 'Core Props' },
        { id: 'state-props', label: 'State Props' },
        { id: 'style-props', label: 'Style Props' }
      ]
    }
  ]
};

interface PlaygroundProps {
  variant: 'elevated' | 'outlined' | 'filled' | 'thumbnail';
  padding: 'none' | 'sm' | 'md' | 'lg';
  state: 'default' | 'loading' | 'disabled';
  features: ('header' | 'footer' | 'media' | 'actionArea')[];
  loadingPattern: 'lines' | 'blocks' | 'image' | 'mixed';
  contentLength: 'short' | 'medium' | 'long';
}

const defaultPlaygroundProps: PlaygroundProps = {
  variant: 'elevated',
  padding: 'md',
  state: 'default',
  features: [],
  loadingPattern: 'lines',
  contentLength: 'medium'
};

function CardPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  const generateCode = () => {
    const props = [];
    
    if (playgroundProps.variant !== defaultPlaygroundProps.variant) {
      props.push(`variant="${playgroundProps.variant}"`);
    }
    
    if (playgroundProps.padding !== defaultPlaygroundProps.padding) {
      props.push(`padding="${playgroundProps.padding}"`);
    }

    if (playgroundProps.state === 'disabled') {
      props.push('unstyled={true}');
    }

    if (playgroundProps.features.includes('header')) {
      props.push(`header={
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Card Title</h3>
          {/* Add header content */}
        </div>
      }`);
    }

    if (playgroundProps.features.includes('footer')) {
      props.push(`footer={
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Save
          </button>
        </div>
      }`);
    }

    if (playgroundProps.features.includes('media')) {
      props.push(`media={{
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        alt: "Sample image",
        height: 200
      }}`);
    }

    if (playgroundProps.features.includes('actionArea')) {
      props.push(`actionArea={{
        onClick: () => console.log('Card clicked'),
        disabled: ${playgroundProps.state === 'disabled'}
      }}`);
    }

    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    
    return `import { Card } from '@/components/ui/Card';

export default function Example() {
  return (
    <Card${propsString}>
      <div className="space-y-4">
        ${!playgroundProps.features.includes('header') ? '<h3 className="text-lg font-semibold">Card Title</h3>' : ''}
        <p className="text-gray-600">
          ${playgroundProps.contentLength === 'short' 
            ? 'A brief description of the card content.'
            : playgroundProps.contentLength === 'medium'
            ? 'A more detailed description of the card content. This provides additional context and information.'
            : 'A comprehensive description of the card content. This provides extensive details and context for the user to understand the full scope of the information being presented.'}
        </p>
      </div>
    </Card>
  );
}`;
  };

  const renderDocExample = (props: Partial<PlaygroundProps>) => {
    const mergedProps = { ...defaultPlaygroundProps, ...props };
    
    // Handle loading state with different patterns
    if (mergedProps.state === 'loading') {
      return (
        <Card
          variant={mergedProps.variant}
          padding={mergedProps.padding}
          className="relative overflow-hidden"
        >
          {/* Apply loading animation overlay */}
          <div className="absolute inset-0 bg-gray-50/70"></div>
          
          {/* Loading patterns */}
          <div className="space-y-4 relative">
            {/* Header skeleton */}
            <div className={`h-7 ${mergedProps.loadingPattern === 'blocks' ? 'w-2/5' : 'w-3/4'} bg-gray-200 rounded-md animate-pulse`}></div>
            
            {/* Content skeleton based on pattern */}
            {mergedProps.loadingPattern === 'lines' && (
              <>
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-4/6 h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </>
            )}
            
            {mergedProps.loadingPattern === 'blocks' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            )}
            
            {mergedProps.loadingPattern === 'image' && (
              <div className="w-full h-40 bg-gray-200 rounded-md animate-pulse"></div>
            )}
            
            {mergedProps.loadingPattern === 'mixed' && (
              <>
                <div className="w-full h-24 bg-gray-200 rounded-md animate-pulse mb-3"></div>
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-4/6 h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </>
            )}
          </div>
        </Card>
      );
    }
    
    // Regular card rendering (unchanged)
    return (
      <Card
        variant={mergedProps.variant}
        padding={mergedProps.padding}
        unstyled={mergedProps.state === 'disabled'}
        header={mergedProps.features.includes('header') ? (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Card Title</h3>
            {mergedProps.features.includes('actionArea') && (
              <button className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ) : undefined}
        footer={mergedProps.features.includes('footer') ? (
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              Save
            </button>
          </div>
        ) : undefined}
        media={mergedProps.features.includes('media') ? {
          src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
          alt: 'Sample image',
          height: 200
        } : undefined}
        actionArea={mergedProps.features.includes('actionArea') ? {
          onClick: () => console.log('Card clicked'),
          disabled: mergedProps.state === 'disabled'
        } : undefined}
      >
        <div className="space-y-4">
          {!mergedProps.features.includes('header') && (
            <h3 className="text-lg font-semibold">Card Title</h3>
          )}
          <p className="text-gray-600">
            {mergedProps.contentLength === 'short' 
              ? 'A brief description of the card content.'
              : mergedProps.contentLength === 'medium'
              ? 'A more detailed description of the card content. This provides additional context and information.'
              : 'A comprehensive description of the card content. This provides extensive details and context for the user to understand the full scope of the information being presented.'}
          </p>
        </div>
      </Card>
    );
  };

  const renderCoreVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'elevated' })}
            </div>
            <p className="text-sm text-gray-600">Default variant with shadow elevation</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'outlined' })}
            </div>
            <p className="text-sm text-gray-600">Bordered variant without shadow</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'filled' })}
            </div>
            <p className="text-sm text-gray-600">Subtle background color variant</p>
                </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'thumbnail' })}
            </div>
            <p className="text-sm text-gray-600">Horizontal layout with media</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-2 text-sm font-medium">Card Group</h4>
          <div className="grid grid-cols-2 gap-4">
            {renderDocExample({ variant: 'elevated', contentLength: 'short' })}
            {renderDocExample({ variant: 'elevated', contentLength: 'short' })}
          </div>
          <p className="mt-2 text-sm text-gray-500">Cards arranged in a grid layout</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Card List</h4>
          <div className="space-y-4">
            {renderDocExample({ variant: 'outlined' })}
            {renderDocExample({ variant: 'outlined' })}
          </div>
          <p className="mt-2 text-sm text-gray-500">Cards in a vertical list</p>
        </div>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Cards</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderDocExample({ variant: 'elevated', contentLength: 'short' })}
          {renderDocExample({ variant: 'outlined', contentLength: 'short' })}
          {renderDocExample({ variant: 'filled', contentLength: 'short' })}
          {renderDocExample({ variant: 'thumbnail', contentLength: 'short' })}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderDocExample({ variant: 'elevated', state: 'loading', loadingPattern: 'lines' })}
          {renderDocExample({ variant: 'elevated', state: 'loading', loadingPattern: 'blocks' })}
        </div>
      </div>
    </div>
  );

  const renderPlayground = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-2 h-[600px]">
        <div className="flex flex-col border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Preview</h3>
                </div>
          <div className="flex-1 p-6 bg-gray-50">
            <div className="bg-white rounded-lg h-full flex items-center justify-center p-8 shadow-sm">
              {renderDocExample(playgroundProps)}
            </div>
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="p-6 border-b border-gray-200 sticky top-0 z-10 bg-white">
            <h3 className="text-lg font-semibold">Customize</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Variant */}
              <div>
                <label className="block text-sm font-medium mb-2">Variant</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playgroundProps.variant}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, variant: e.target.value as PlaygroundProps['variant'] }))}
                >
                  <option value="elevated">Elevated</option>
                  <option value="outlined">Outlined</option>
                  <option value="filled">Filled</option>
                  <option value="thumbnail">Thumbnail</option>
                </select>
              </div>

              {/* Padding */}
              <div>
                <label className="block text-sm font-medium mb-2">Padding</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playgroundProps.padding}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, padding: e.target.value as PlaygroundProps['padding'] }))}
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playgroundProps.state}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, state: e.target.value as PlaygroundProps['state'] }))}
                >
                  <option value="default">Default</option>
                  <option value="loading">Loading</option>
                  <option value="disabled">Disabled</option>
                </select>
                    </div>

              {/* Loading Pattern (only shown when state is loading) */}
              {playgroundProps.state === 'loading' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Loading Pattern</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={playgroundProps.loadingPattern}
                    onChange={(e) => setPlaygroundProps(prev => ({ ...prev, loadingPattern: e.target.value as PlaygroundProps['loadingPattern'] }))}
                  >
                    <option value="lines">Lines</option>
                    <option value="blocks">Blocks</option>
                    <option value="image">Image</option>
                    <option value="mixed">Mixed</option>
                  </select>
                    </div>
              )}

              {/* Content Length */}
              <div>
                <label className="block text-sm font-medium mb-2">Content Length</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playgroundProps.contentLength}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, contentLength: e.target.value as PlaygroundProps['contentLength'] }))}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium mb-2">Features</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={playgroundProps.features.includes('header')}
                      onChange={(e) => {
                        const features: PlaygroundProps['features'] = e.target.checked
                          ? [...playgroundProps.features, 'header']
                          : playgroundProps.features.filter(f => f !== 'header');
                        setPlaygroundProps(prev => ({ ...prev, features }));
                      }}
                    />
                    <span className="text-sm">Header</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={playgroundProps.features.includes('footer')}
                      onChange={(e) => {
                        const features: PlaygroundProps['features'] = e.target.checked
                          ? [...playgroundProps.features, 'footer']
                          : playgroundProps.features.filter(f => f !== 'footer');
                        setPlaygroundProps(prev => ({ ...prev, features }));
                      }}
                    />
                    <span className="text-sm">Footer</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={playgroundProps.features.includes('media')}
                      onChange={(e) => {
                        const features: PlaygroundProps['features'] = e.target.checked
                          ? [...playgroundProps.features, 'media']
                          : playgroundProps.features.filter(f => f !== 'media');
                        setPlaygroundProps(prev => ({ ...prev, features }));
                      }}
                    />
                    <span className="text-sm">Media</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={playgroundProps.features.includes('actionArea')}
                      onChange={(e) => {
                        const features: PlaygroundProps['features'] = e.target.checked
                          ? [...playgroundProps.features, 'actionArea']
                          : playgroundProps.features.filter(f => f !== 'actionArea');
                        setPlaygroundProps(prev => ({ ...prev, features }));
                      }}
                    />
                    <span className="text-sm">Action Area</span>
                  </label>
                </div>
              </div>
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
          <h3 className="text-lg font-semibold mb-4">Core Props</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="font-medium">Prop</div>
            <div className="font-medium">Type</div>
            <div className="font-medium">Default</div>
            <div className="font-medium">Description</div>
            
            <div>variant</div>
            <div className="text-gray-600">elevated | outlined | filled | thumbnail</div>
            <div className="text-gray-600">elevated</div>
            <div className="text-gray-600">Visual style variant of the card</div>
              </div>
            </div>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Card"
      description="Cards are flexible containers that group related content and actions."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Card } from '@/components/ui/Card';"
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

export default CardPage; 