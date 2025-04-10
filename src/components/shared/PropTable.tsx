interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropTableProps {
  props: PropDefinition[];
}

export default function PropTable({ props }: PropTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-sm font-semibold text-gray-900">Prop</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-900">Default</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-900">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-gray-100">
              <td className="py-3 px-4">
                <code className="text-sm font-mono text-blue-600">{prop.name}</code>
                {prop.required && (
                  <span className="ml-2 text-xs text-red-500">Required</span>
                )}
              </td>
              <td className="py-3 px-4">
                <code className="text-sm font-mono text-purple-600">{prop.type}</code>
              </td>
              <td className="py-3 px-4">
                <code className="text-sm font-mono text-gray-600">
                  {prop.default || '-'}
                </code>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 