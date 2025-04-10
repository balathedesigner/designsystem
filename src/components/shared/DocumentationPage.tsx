import DocumentationLayout from '@/components/layouts/DocumentationLayout';

interface DocumentationPageProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function DocumentationPage({ title, description, children }: DocumentationPageProps) {
  return (
    <DocumentationLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-gray-600 mb-8">
          {description}
        </p>

        {/* Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {children || (
            <p className="text-gray-600">Content coming soon...</p>
          )}
        </div>
      </div>
    </DocumentationLayout>
  );
} 