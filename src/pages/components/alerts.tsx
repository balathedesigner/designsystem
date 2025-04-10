import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Alert, AlertProps } from '@/components/ui/Alert';
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
        { id: 'compositions', label: 'Alert Groups & Compositions' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'basic', label: 'Basic Alerts' },
        { id: 'with-actions', label: 'With Actions' },
        { id: 'dismissible', label: 'Dismissible' },
        { id: 'with-icons', label: 'With Icons' }
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
  variant: 'info' | 'success' | 'warning' | 'error';
  state: 'default' | 'dismissible' | 'with-action';
  showIcon: boolean;
  withTitle: boolean;
  contentLength: 'short' | 'medium' | 'long';
}

const defaultPlaygroundProps: PlaygroundProps = {
  variant: 'info',
  state: 'default',
  showIcon: true,
  withTitle: true,
  contentLength: 'medium'
};

function AlertsPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  const generateCode = () => {
    const props = [];
    
    if (playgroundProps.variant !== 'info') {
      props.push(`variant="${playgroundProps.variant}"`);
    }

    if (playgroundProps.state !== 'default') {
      props.push(`state="${playgroundProps.state}"`);
    }

    if (playgroundProps.withTitle) {
      props.push('title="Alert Title"');
    }

    if (playgroundProps.showIcon) {
      props.push('showIcon={true}');
    }

    const propsString = props.length > 0 ? ' ' + props.join('\n  ') : '';
    
    return `import { Alert } from '@/components/ui/Alert';

export default function Example() {
  return (
    <Alert${propsString}>
      ${playgroundProps.contentLength === 'short' 
        ? 'A brief alert message.'
        : playgroundProps.contentLength === 'medium'
        ? 'A more detailed alert message providing additional context and information.'
        : 'A comprehensive alert message with extensive details and context for the user to understand the full scope of the information being presented.'}
    </Alert>
  );
}`;
  };

  const renderDocExample = (props: Partial<PlaygroundProps>) => {
    const mergedProps = { ...defaultPlaygroundProps, ...props };
    return (
      <Alert
        variant={mergedProps.variant}
        dismissible={mergedProps.state === 'dismissible'}
        showIcon={mergedProps.showIcon}
        title={mergedProps.withTitle ? getTitleForVariant(mergedProps.variant) : undefined}
        onDismiss={mergedProps.state === 'dismissible' ? () => {} : undefined}
      >
        {getContentForLength(mergedProps.contentLength)}
        {mergedProps.state === 'with-action' && (
          <div className="mt-3">
            <button className="text-sm font-medium underline">
              Take action
            </button>
          </div>
        )}
      </Alert>
    );
  };

  const getTitleForVariant = (variant: AlertProps['variant']) => {
    switch (variant) {
      case 'info':
        return 'Information';
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  };

  const getContentForLength = (length: PlaygroundProps['contentLength']) => {
    switch (length) {
      case 'short':
        return 'A brief alert message.';
      case 'medium':
        return 'An alert message with additional context and information.';
      case 'long':
        return 'A detailed alert message providing comprehensive information about the current situation or status.';
      default:
        return '';
    }
  };

  const renderCoreVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'info' })}
            </div>
            <p className="text-sm text-gray-600">Informational alert for general messages</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'success' })}
            </div>
            <p className="text-sm text-gray-600">Success alert for positive outcomes</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'warning' })}
            </div>
            <p className="text-sm text-gray-600">Warning alert for potential issues</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              {renderDocExample({ variant: 'error' })}
            </div>
            <p className="text-sm text-gray-600">Error alert for critical problems</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompositions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8">
        <div>
          <h4 className="mb-2 text-sm font-medium">Alert Stack</h4>
          <div className="space-y-4">
            {renderDocExample({ variant: 'info', contentLength: 'short' })}
            {renderDocExample({ variant: 'warning', contentLength: 'short' })}
          </div>
          <p className="mt-2 text-sm text-gray-500">Multiple alerts stacked vertically</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Alert with Actions</h4>
          <div className="space-y-4">
            {renderDocExample({ variant: 'info', state: 'with-action' })}
            {renderDocExample({ variant: 'warning', state: 'with-action' })}
          </div>
          <p className="mt-2 text-sm text-gray-500">Alerts with interactive actions</p>
        </div>
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Alerts</h3>
        <div className="space-y-4">
          {renderDocExample({ variant: 'info', contentLength: 'short' })}
          {renderDocExample({ variant: 'success', contentLength: 'short' })}
          {renderDocExample({ variant: 'warning', contentLength: 'short' })}
          {renderDocExample({ variant: 'error', contentLength: 'short' })}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <h3 className="text-lg font-semibold mb-4">Dismissible Alerts</h3>
        <div className="space-y-4">
          {renderDocExample({ variant: 'info', state: 'dismissible' })}
          {renderDocExample({ variant: 'warning', state: 'dismissible' })}
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
            {/* Variant */}
            <div>
              <label className="block text-sm font-medium mb-2">Variant</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playgroundProps.variant}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, variant: e.target.value as PlaygroundProps['variant'] }))}
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
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
                <option value="dismissible">Dismissible</option>
                <option value="with-action">With Action</option>
              </select>
            </div>

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

            {/* Show Icon */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={playgroundProps.showIcon}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, showIcon: e.target.checked }))}
                />
                <span className="text-sm font-medium">Show Icon</span>
              </label>
            </div>

            {/* With Title */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={playgroundProps.withTitle}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, withTitle: e.target.checked }))}
                />
                <span className="text-sm font-medium">Show Title</span>
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
          <h3 className="text-lg font-semibold mb-4">Core Props</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="font-medium">Prop</div>
            <div className="font-medium">Type</div>
            <div className="font-medium">Default</div>
            <div className="font-medium">Description</div>
            
            <div>variant</div>
            <div className="text-gray-600">info | success | warning | error</div>
            <div className="text-gray-600">info</div>
            <div className="text-gray-600">Visual style variant of the alert</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Alert"
      description="Alerts display important messages and feedback to users."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Alert } from '@/components/ui/Alert';"
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

export default AlertsPage;