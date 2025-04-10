import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const rightNavItems = {
  items: [
    {
      id: 'getting-started',
      label: 'Getting Started',
      subItems: [
        { id: 'import', label: 'Import' },
        { id: 'basic-usage', label: 'Basic Usage' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'more-pages', label: 'More Pages' },
        { id: 'edge-cases', label: 'Edge Cases' },
        { id: 'sibling-count', label: 'Sibling Count' },
        { id: 'few-pages', label: 'Few Pages' }
      ]
    },
    {
      id: 'best-practices',
      label: 'Best Practices'
    },
    {
      id: 'accessibility',
      label: 'Accessibility'
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
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount: number;
}

const defaultPlaygroundProps: PlaygroundProps = {
  currentPage: 1,
  totalCount: 50,
  pageSize: 10,
  siblingCount: 1,
};

export default function PaginationPage() {
  const [playgroundProps, setPlaygroundProps] = useState<PlaygroundProps>(defaultPlaygroundProps);

  const handlePlaygroundPageChange = (page: number) => {
    setPlaygroundProps(prev => ({ ...prev, currentPage: page }));
  };

  const generateCode = () => {
    return `import { Pagination } from '@/components/ui/Pagination';
import { useState } from 'react';

export default function Example() {
  const totalItems = ${playgroundProps.totalCount};
  const itemsPerPage = ${playgroundProps.pageSize};
  const [currentPage, setCurrentPage] = useState(${playgroundProps.currentPage});

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic here to fetch data for the new page...
  };

  return (
    <Pagination 
      currentPage={currentPage}
      totalCount={totalItems}
      pageSize={itemsPerPage}
      onPageChange={handlePageChange}
      siblingCount={${playgroundProps.siblingCount}}
    />
  );
}`;
  };

  const renderBasicExample = () => {
    const [page, setPage] = useState(1);
    const total = 50;
    const size = 10;
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4" id="basic-usage">
          <h4 className="text-sm font-medium mb-2">Basic Example (5 pages)</h4>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={size}
            onPageChange={setPage}
          />
        </div>
      </div>
    );
  };

  const renderMorePagesExample = () => {
    const [page, setPage] = useState(1);
    const total = 100;
    const size = 10;
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4" id="more-pages">
          <h4 className="text-sm font-medium mb-2">More Pages Example (10 pages)</h4>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={size}
            onPageChange={setPage}
          />
        </div>
      </div>
    );
  };

  const renderEdgeCasesExample = () => {
    const [page, setPage] = useState(1);
    const total = 1000;
    const size = 10;
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4" id="edge-cases">
          <h4 className="text-sm font-medium mb-2">Edge Cases Example (100 pages)</h4>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={size}
            onPageChange={setPage}
          />
        </div>
      </div>
    );
  };

  const renderSiblingCountExample = () => {
    const [page, setPage] = useState(1);
    const total = 100;
    const size = 10;
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4" id="sibling-count">
          <h4 className="text-sm font-medium mb-2">Sibling Count Example (2 siblings)</h4>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={size}
            onPageChange={setPage}
            siblingCount={2}
          />
        </div>
      </div>
    );
  };

  const renderFewPagesExample = () => {
    const [page, setPage] = useState(1);
    const total = 20;
    const size = 10;
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4" id="few-pages">
          <h4 className="text-sm font-medium mb-2">Few Pages Example (2 pages)</h4>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={size}
            onPageChange={setPage}
          />
        </div>
      </div>
    );
  };

  const renderPlayground = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4" id="playground">
          <h4 className="text-sm font-medium mb-2">Interactive Playground</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Items</label>
                <Input
                  type="number"
                  value={playgroundProps.totalCount}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, totalCount: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Items per Page</label>
                <Input
                  type="number"
                  value={playgroundProps.pageSize}
                  onChange={(e) => setPlaygroundProps(prev => ({ ...prev, pageSize: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sibling Count</label>
              <Input
                type="number"
                value={playgroundProps.siblingCount}
                onChange={(e) => setPlaygroundProps(prev => ({ ...prev, siblingCount: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <Pagination
              currentPage={playgroundProps.currentPage}
              totalCount={playgroundProps.totalCount}
              pageSize={playgroundProps.pageSize}
              onPageChange={handlePlaygroundPageChange}
              siblingCount={playgroundProps.siblingCount}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderApiReference = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4" id="api">
          <h4 className="text-sm font-medium mb-2">API Reference</h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Props</h5>
              <div className="mt-2 space-y-2">
                <div className="flex items-start">
                  <div className="w-1/3">
                    <code className="text-sm font-mono text-gray-900">currentPage</code>
                  </div>
                  <div className="w-2/3">
                    <p className="text-sm text-gray-700">The current active page number.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-1/3">
                    <code className="text-sm font-mono text-gray-900">totalCount</code>
                  </div>
                  <div className="w-2/3">
                    <p className="text-sm text-gray-700">Total number of items to paginate.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-1/3">
                    <code className="text-sm font-mono text-gray-900">pageSize</code>
                  </div>
                  <div className="w-2/3">
                    <p className="text-sm text-gray-700">Number of items per page.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-1/3">
                    <code className="text-sm font-mono text-gray-900">onPageChange</code>
                  </div>
                  <div className="w-2/3">
                    <p className="text-sm text-gray-700">Callback function when page changes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-1/3">
                    <code className="text-sm font-mono text-gray-900">siblingCount</code>
                  </div>
                  <div className="w-2/3">
                    <p className="text-sm text-gray-700">Number of siblings to show on each side of the current page.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPaginationAccessibility = () => {
    return (
      <div className="space-y-4 text-gray-700 text-sm">
        <ul className="list-disc list-outside space-y-2 pl-5">
          <li>The component uses a nav element with aria-label="Pagination" to identify it as a navigation landmark.</li>
          <li>The currently active page button has aria-current="page" set.</li>
          <li>Previous and next buttons have appropriate aria-labels.</li>
          <li>All interactive elements are keyboard accessible.</li>
        </ul>
      </div>
    );
  };

  return (
    <ComponentDocTemplate
      title="Pagination"
      description="A pagination component that helps users navigate through large sets of data."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Pagination } from '@/components/ui/Pagination';"
      rightNavItems={rightNavItems}
      renderCoreVariants={() => (
        <div className="space-y-8">
          {renderBasicExample()}
          {renderMorePagesExample()}
          {renderEdgeCasesExample()}
          {renderSiblingCountExample()}
          {renderFewPagesExample()}
        </div>
      )}
      renderAccessibility={renderPaginationAccessibility}
      renderPlayground={renderPlayground}
      renderApiReference={renderApiReference}
      renderCompositions={() => null}
      renderUseCases={() => null}
    />
  );
} 