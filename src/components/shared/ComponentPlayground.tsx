import React from 'react';
import { cn } from '@/lib/utils';

interface PlaygroundControl {
  type: 'select' | 'input' | 'chip';
  label: string;
  value: any;
  options?: { value: string; label: string }[];
  onChange: (value: any) => void;
}

interface PlaygroundControlGroup {
  group: string;
  items: PlaygroundControl[];
}

interface ComponentPlaygroundProps {
  defaultProps: Record<string, any>;
  controls: PlaygroundControlGroup[];
  preview: React.ReactNode;
  code?: string;
  previewClassName?: string;
}

export function ComponentPlayground({
  defaultProps,
  controls,
  preview,
  code,
  previewClassName = 'bg-black/50', // Default to dark background
}: ComponentPlaygroundProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Preview section */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <h3 className="text-sm font-medium mb-4">Preview</h3>
          <div className={cn("flex items-center justify-center h-[120px] rounded-lg", previewClassName)}>
            {preview}
          </div>
        </div>

        {/* Controls */}
        <div className="p-6">
          <h3 className="text-sm font-medium mb-4">Customize</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {controls.map((section) => (
              <div key={section.group} className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900">{section.group}</h4>
                <div className="space-y-4">
                  {section.items.map((control) => (
                    <div key={control.label} className="space-y-2">
                      {control.type === 'select' && (
                        <>
                          <label className="block text-sm text-gray-700">{control.label}</label>
                          <select
                            value={control.value}
                            onChange={(e) => control.onChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            {control.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </>
                      )}
                      {control.type === 'input' && (
                        <>
                          <label className="block text-sm text-gray-700">{control.label}</label>
                          <input
                            type="text"
                            value={control.value}
                            onChange={(e) => control.onChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </>
                      )}
                      {control.type === 'chip' && (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={control.value}
                            onChange={(e) => control.onChange(e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">{control.label}</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Preview */}
      {code && (
        <div className="border-t border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Code</h3>
            <button 
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => navigator.clipboard.writeText(code)}
            >
              Copy code
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">{code}</pre>
          </div>
        </div>
      )}
    </div>
  );
} 