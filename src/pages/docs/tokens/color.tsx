import DocumentationPage from '@/components/shared/DocumentationPage';
import { sidebarItems } from '@/data/sidebarItems';

export default function ColorTokensPage() {
  const tokensSection = sidebarItems.find(section => section.title === 'Tokens');
  const colorInfo = tokensSection?.items.find(item => item.href === '/docs/tokens/color');

  return (
    <DocumentationPage
      title={colorInfo?.name || 'Color Tokens'}
      description={colorInfo?.description || 'Design tokens for colors'}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Primary Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-16 bg-blue-600 rounded-md mb-2"></div>
              <p className="font-medium">Primary</p>
              <p className="text-sm text-gray-500">--color-primary</p>
              <p className="text-sm font-mono text-gray-500">#2563EB</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-16 bg-blue-700 rounded-md mb-2"></div>
              <p className="font-medium">Primary Dark</p>
              <p className="text-sm text-gray-500">--color-primary-dark</p>
              <p className="text-sm font-mono text-gray-500">#1D4ED8</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-16 bg-blue-50 rounded-md mb-2"></div>
              <p className="font-medium">Primary Light</p>
              <p className="text-sm text-gray-500">--color-primary-light</p>
              <p className="text-sm font-mono text-gray-500">#EFF6FF</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Neutral Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-12 bg-gray-900 rounded-md mb-2"></div>
              <p className="font-medium">Gray 900</p>
              <p className="text-sm text-gray-500">--color-gray-900</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-12 bg-gray-700 rounded-md mb-2"></div>
              <p className="font-medium">Gray 700</p>
              <p className="text-sm text-gray-500">--color-gray-700</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-12 bg-gray-500 rounded-md mb-2"></div>
              <p className="font-medium">Gray 500</p>
              <p className="text-sm text-gray-500">--color-gray-500</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-12 bg-gray-300 rounded-md mb-2"></div>
              <p className="font-medium">Gray 300</p>
              <p className="text-sm text-gray-500">--color-gray-300</p>
            </div>
          </div>
        </div>
      </div>
    </DocumentationPage>
  );
} 