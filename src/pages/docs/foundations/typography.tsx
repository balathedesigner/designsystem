import DocumentationPage from '@/components/shared/DocumentationPage';
import { sidebarItems } from '@/data/sidebarItems';

export default function TypographyPage() {
  const foundationsSection = sidebarItems.find(section => section.title === 'Foundations');
  const typographyInfo = foundationsSection?.items.find(item => item.href === '/docs/foundations/typography');

  return (
    <DocumentationPage
      title={typographyInfo?.name || 'Typography'}
      description={typographyInfo?.description || 'Typography system and scale'}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Type Scale</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h1 className="text-5xl font-bold">Display Large</h1>
              <p className="text-sm text-gray-500 mt-2">5xl / Bold</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-4xl font-semibold">Display Medium</h2>
              <p className="text-sm text-gray-500 mt-2">4xl / Semibold</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-3xl font-medium">Display Small</h3>
              <p className="text-sm text-gray-500 mt-2">3xl / Medium</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Body Text</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg">Large Body Text</p>
              <p className="text-sm text-gray-500 mt-2">lg / Regular</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p>Default Body Text</p>
              <p className="text-sm text-gray-500 mt-2">base / Regular</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm">Small Body Text</p>
              <p className="text-sm text-gray-500 mt-2">sm / Regular</p>
            </div>
          </div>
        </div>
      </div>
    </DocumentationPage>
  );
} 