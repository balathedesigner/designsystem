import React from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';

interface EmptyComponentTemplateProps {
  title: string;
  description: string;
  componentName?: string;
}

export function EmptyComponentTemplate({ title, description, componentName }: EmptyComponentTemplateProps) {
  // Basic navigation structure
  const rightNavItems = {
    items: [
      {
        id: 'overview',
        label: 'Overview'
      },
      {
        id: 'coming-soon',
        label: 'Coming Soon'
      }
    ]
  };
  
  // Empty render functions required by ComponentDocTemplate
  const renderPlayground = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Coming Soon</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              The playground for {componentName || title} is coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCoreVariants = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Coming Soon</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              Core variants for {componentName || title} are under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCompositions = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Coming Soon</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              Compositions for {componentName || title} are under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderUseCases = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Coming Soon</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              Use cases for {componentName || title} are under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderApiReference = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Coming Soon</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              API reference for {componentName || title} is under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Generate empty code example
  const generateCode = () => {
    return `import { ${componentName || title} } from '@/components/ui/${componentName || title}';

export default function Example() {
  return (
    // ${componentName || title} component will be available soon
    <div>Coming Soon</div>
  );
}`;
  };

  return (
    <ComponentDocTemplate
      title={title}
      description={description}
      status={{ label: 'Alpha', color: 'yellow' }}
      importCode={`import { ${componentName || title} } from '@/components/ui/${componentName || title}';`}
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