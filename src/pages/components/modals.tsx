import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Modal, ModalSize } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

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
        { id: 'compositions', label: 'Modal Compositions' },
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
        { id: 'content', label: 'Content Types' }
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
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton: boolean;
  closeOnOutsideClick: boolean;
  closeOnEscape: boolean;
  title: string;
  content: string;
  showExampleFooter?: boolean;
}

const defaultPlaygroundProps: PlaygroundProps = {
  size: 'md',
  showCloseButton: true,
  closeOnOutsideClick: true,
  closeOnEscape: true,
  title: 'Modal Title',
  content: 'This is the modal content. You can put any content here.',
  showExampleFooter: false,
};

export default function ModalsPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  const generateCode = () => {
    const props = [];
    
    if (playgroundProps.size !== 'md') {
      props.push(`size="${playgroundProps.size}"`);
    }
    
    if (!playgroundProps.showCloseButton) {
      props.push('showCloseButton={false}');
    }
    
    if (!playgroundProps.closeOnOutsideClick) {
      props.push('closeOnOutsideClick={false}');
    }
    
    if (!playgroundProps.closeOnEscape) {
      props.push('closeOnEscape={false}');
    }
    
    if (playgroundProps.title) {
      props.push(`title="${playgroundProps.title}"`);
    }
    
    if (playgroundProps.showExampleFooter) {
      props.push(
        `footer={(
          <div className="flex justify-end gap-2 p-4">
            <Button variant="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </div>
        )}`
      );
    }
    
    const propsString = props.length > 0 ? ' ' + props.join('\n        ') : '';
    
    return `import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import React, { useState } from 'react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}${propsString}
      >
        ${playgroundProps.content}
      </Modal>
    </>
  );
}`;
  };

  const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full w-full',
  };

  const renderStaticModalPreview = ({ size, title = 'Modal Title', content = 'Modal content goes here.' }: { size: ModalSize, title?: string, content?: string }) => {
    return (
      <div
        className={cn(
          'relative bg-white rounded-lg shadow-xl w-full',
          'flex flex-col',
          sizeClasses[size],
          'overflow-hidden'
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
          <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </div>
        <div className="flex-1 px-6 py-6 min-h-[80px]">
          <p className="text-sm text-gray-600">{content}</p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200">
          <div className="h-9 px-4 rounded bg-gray-200 text-sm font-medium flex items-center text-gray-600">Cancel</div>
          <div className="h-9 px-4 rounded bg-blue-100 text-sm font-medium flex items-center text-blue-700">Confirm</div>
        </div>
      </div>
    );
  };

  const renderCoreVariants = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-medium text-gray-700">Small Modal</h4>
            {renderStaticModalPreview({ size: 'sm', title: 'Small Modal', content: 'Content for small modal.' })}
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-gray-700">Medium Modal</h4>
            {renderStaticModalPreview({ size: 'md', title: 'Medium Modal', content: 'Content for medium modal.' })}
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-gray-700">Large Modal</h4>
            {renderStaticModalPreview({ size: 'lg', title: 'Large Modal', content: 'Content for large modal.' })}
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-gray-700">Extra Large Modal</h4>
            {renderStaticModalPreview({ size: 'xl', title: 'Extra Large Modal', content: 'Content for extra large modal.' })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlertDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Alert Dialog</h3>
        <p className="text-sm text-gray-600 mb-3">A simple alert to inform the user.</p>
        <Button onClick={() => setIsOpen(true)}>Show Alert</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Alert"
          size="sm"
          footer={
            <div className="flex justify-end p-4">
              <Button onClick={() => setIsOpen(false)}>OK</Button>
            </div>
          }
        >
          This is an important message for the user.
        </Modal>
      </div>
    );
  };

  const renderConfirmationDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Confirmation Dialog</h3>
        <p className="text-sm text-gray-600 mb-3">Asks the user to confirm a potentially destructive action.</p>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>Delete Item</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          size="sm"
          footer={
            <div className="flex justify-end gap-2 p-4">
              <Button variant="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => setIsOpen(false)}>Delete</Button> 
            </div>
          }
        >
          Are you sure you want to delete this item? This action cannot be undone.
        </Modal>
      </div>
    );
  };

  const renderFormDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Form Dialog</h3>
        <p className="text-sm text-gray-600 mb-3">Allows users to submit information via a form within a modal.</p>
        <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit Profile"
          footer={
            <div className="flex justify-end gap-2 p-4">
              <Button variant="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Save</Button>
            </div>
          }
        >
          <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); /* Handle submission */ }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="form-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input id="form-name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="form-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="form-email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="you@example.com" />
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  const renderScrollableDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Scrollable Content</h3>
        <p className="text-sm text-gray-600 mb-3">Demonstrates how modal content scrolls when it exceeds the available height.</p>
        <Button onClick={() => setIsOpen(true)}>Show Scrollable</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms of Service"
          footer={
            <div className="flex justify-end gap-2 p-4">
              <Button variant="outlined" onClick={() => setIsOpen(false)}>Decline</Button>
              <Button onClick={() => setIsOpen(false)}>Accept</Button>
            </div>
          }
        >
          <div className="space-y-3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            {[...Array(15)].map((_, i) => (
              <p key={i}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            ))}
          </div>
        </Modal>
      </div>
    );
  };

  const renderFullScreenDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Full Screen Dialog</h3>
        <p className="text-sm text-gray-600 mb-3">Uses the full screen for immersive content or tasks.</p>
        <Button onClick={() => setIsOpen(true)}>Open Full Screen</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Application Settings"
          size="full"
          footer={
            <div className="flex justify-end gap-2 p-4">
              <Button variant="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Save Settings</Button>
            </div>
          }
        >
          <p>This modal takes up the full screen. Useful for complex settings or focused tasks.</p>
          {/* Add more complex content here */}
        </Modal>
      </div>
    );
  };

  const renderNonDismissibleDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Non-Dismissible Dialog</h3>
        <p className="text-sm text-gray-600 mb-3">Prevents closing by clicking outside or pressing Escape. Requires explicit user action.</p>
        <Button onClick={() => setIsOpen(true)}>Show Non-Dismissible</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)} // Still need onClose for the button
          title="Action Required"
          size="sm"
          closeOnOutsideClick={false} // Disable outside click
          closeOnEscape={false}       // Disable escape key
          showCloseButton={false}     // Hide default close button
          footer={
            <div className="flex justify-end p-4">
              <Button onClick={() => setIsOpen(false)}>Acknowledge</Button>
            </div>
          }
        >
          You must acknowledge this message before continuing.
        </Modal>
      </div>
    );
  };

  const renderPlayground = () => {
    const [isPlaygroundModalOpen, setIsPlaygroundModalOpen] = useState(false);

    const exampleFooter = (
      <div className="flex justify-end gap-2 p-4">
        <Button variant="outlined" onClick={() => setIsPlaygroundModalOpen(false)}>Cancel</Button>
        <Button onClick={() => setIsPlaygroundModalOpen(false)}>Confirm</Button>
      </div>
    );

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h3 className="text-sm font-medium mb-4">Preview</h3>
            <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-4">
              <Button onClick={() => setIsPlaygroundModalOpen(true)}>Open Interactive Modal</Button>
              <Modal
                isOpen={isPlaygroundModalOpen}
                onClose={() => setIsPlaygroundModalOpen(false)}
                size={playgroundProps.size}
                showCloseButton={playgroundProps.showCloseButton}
                closeOnOutsideClick={playgroundProps.closeOnOutsideClick}
                closeOnEscape={playgroundProps.closeOnEscape}
                title={playgroundProps.title}
                footer={playgroundProps.showExampleFooter ? exampleFooter : undefined}
              >
                <p>{playgroundProps.content}</p>
              </Modal>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-medium mb-4">Customize</h3>
            <div className="space-y-4">
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
                  <option value="xl">Extra Large</option>
                  <option value="full">Full Width</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playgroundProps.title}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playgroundProps.content}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, content: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={playgroundProps.showCloseButton}
                    onChange={(e) => setPlaygroundProps(prev => ({ ...prev, showCloseButton: e.target.checked }))}
                  />
                  <span className="text-sm font-medium">Show Close Button</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={playgroundProps.closeOnOutsideClick}
                    onChange={(e) => setPlaygroundProps(prev => ({ ...prev, closeOnOutsideClick: e.target.checked }))}
                  />
                  <span className="text-sm font-medium">Close on Outside Click</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={playgroundProps.closeOnEscape}
                    onChange={(e) => setPlaygroundProps(prev => ({ ...prev, closeOnEscape: e.target.checked }))}
                  />
                  <span className="text-sm font-medium">Close on Escape</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={playgroundProps.showExampleFooter}
                    onChange={(e) => setPlaygroundProps(prev => ({ ...prev, showExampleFooter: e.target.checked }))}
                  />
                  <span className="text-sm font-medium">Show Example Footer</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                <td className="py-2 font-mono text-xs">isOpen</td>
                <td className="py-2 font-mono text-xs">boolean</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Whether the modal is open</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">onClose</td>
                <td className="py-2 font-mono text-xs">{`() => void`}</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Callback when the modal should close</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">size</td>
                <td className="py-2 font-mono text-xs">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                <td className="py-2 font-mono text-xs">'md'</td>
                <td className="py-2">Size of the modal</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">title</td>
                <td className="py-2 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">The modal title</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">header</td>
                <td className="py-2 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Custom header content</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">footer</td>
                <td className="py-2 font-mono text-xs">React.ReactNode</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Custom footer content</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">className</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Additional CSS classes for the modal container</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">backdropClassName</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2 font-mono text-xs">-</td>
                <td className="py-2">Additional CSS classes for the backdrop</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderExamplesSection = () => (
     <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-8 divide-y divide-gray-100">
        {renderAlertDialog()}
        {renderConfirmationDialog()}
        {renderFormDialog()}
        {renderScrollableDialog()}
        {renderFullScreenDialog()}
        {renderNonDismissibleDialog()}
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Modals"
      description="Dialog windows that require user attention or interaction before continuing."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Modal } from '@/components/ui/Modal';"
      rightNavItems={rightNavItems}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderExamplesSection}
      renderUseCases={() => null}
      renderApiReference={renderApiReference}
      generateCode={generateCode}
    />
  );
} 