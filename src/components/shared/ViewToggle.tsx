interface ViewToggleProps {
  view: 'design' | 'developer';
  onChange: (view: 'design' | 'developer') => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onChange('design')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          view === 'design'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Design
      </button>
      <button
        onClick={() => onChange('developer')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          view === 'developer'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Developer
      </button>
    </div>
  );
} 