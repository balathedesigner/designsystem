import React, { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import * as Icons from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Copy, Download, FileCode, X } from 'lucide-react';
import DocumentationLayout from '@/components/layouts/DocumentationLayout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import CodeBlock from '@/components/shared/CodeBlock';
import { cn } from '@/lib/utils';

// Helper to convert kebab-case to PascalCase
function kebabToPascal(kebab: string): string {
  return kebab.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

// --- Server-Side Data Fetching ---
export async function getStaticProps(): Promise<{ props: { iconNames: string[] } }> {
  const iconsDir = path.join(process.cwd(), 'node_modules', 'lucide-react', 'dist', 'esm', 'icons');
  let iconNames: string[] = [];

  try {
    const files = fs.readdirSync(iconsDir);
    iconNames = files
      .filter(file => file.endsWith('.js'))
      .map(file => kebabToPascal(file.replace('.js', '')));
  } catch (error) {
    console.error('Error reading lucide-react icons directory:', error);
    // Return empty array or handle error as appropriate
  }

  return {
    props: {
      iconNames: iconNames.sort(), // Pass sorted names to the page
    },
  };
}

// --- Icon Card Component ---
interface IconCardProps {
  name: string;
  IconComponent: React.ComponentType<Icons.LucideProps>;
}

const IconCard: React.FC<IconCardProps> = ({ name, IconComponent }) => {
  const handleCopyName = () => {
    navigator.clipboard.writeText(name)
      .then(() => console.log(`Copied name: ${name}`))
      .catch(err => console.error('Failed to copy name', err));
  };

  const handleCopyImport = () => {
    const importStatement = `import { ${name} } from 'lucide-react';`;
    navigator.clipboard.writeText(importStatement)
      .then(() => console.log(`Copied import statement`))
      .catch(err => console.error('Failed to copy import', err));
  };

  // Basic SVG download (might need refinement based on how lucide renders)
  // This assumes the component renders a standard SVG structure
  const handleDownloadSvg = () => {
    try {
      const svgElement = document.getElementById(`icon-${name}`)?.querySelector('svg');
      if (svgElement) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name.toLowerCase()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log(`Downloaded ${name}.svg`);
      } else {
        throw new Error('SVG element not found');
      }
    } catch (error) {    
      console.error("SVG Download error:", error);
    }
  };

  return (
    <div 
      id={`icon-${name}`}
      className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-3 text-center bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <IconComponent className="w-8 h-8 text-gray-700" />
      <span className="text-xs font-medium text-gray-600 break-all">{name}</span>
      <div className="flex gap-1 mt-auto pt-2 border-t border-gray-100 w-full justify-center">
        <Button variant="ghost" size="sm" title="Copy name" onClick={handleCopyName} className="p-1">
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="Copy import" onClick={handleCopyImport} className="p-1">
          <FileCode className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="Download SVG" onClick={handleDownloadSvg} className="p-1">
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// --- Category Data and Samples ---
const iconCategories = [
  {
    name: 'Arrows',
    samples: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronLeft', 'ChevronRight', 'ChevronsLeft', 'ChevronsRight', 'MoveUpRight', 'MoveDownLeft']
  },
  {
    name: 'Navigation',
    samples: ['Home', 'Menu', 'MoreHorizontal', 'MoreVertical', 'MapPin', 'Navigation', 'SidebarOpen', 'SidebarClose', 'PanelLeft', 'PanelRight']
  },
  {
    name: 'Editing',
    samples: ['Edit', 'Edit2', 'Edit3', 'Scissors', 'Copy', 'Clipboard', 'Trash2', 'Save', 'Undo', 'Redo']
  },
  {
    name: 'Files & Folders',
    samples: ['File', 'FileText', 'Folder', 'FolderOpen', 'Upload', 'Download', 'Paperclip', 'FilePlus', 'FileMinus', 'FileArchive']
  },
  {
    name: 'Communication',
    samples: ['Mail', 'MessageCircle', 'Phone', 'Send', 'Inbox', 'AtSign', 'Voicemail', 'Rss', 'Wifi', 'Radio']
  },
  {
    name: 'Media',
    samples: ['Image', 'Video', 'Music', 'PlayCircle', 'PauseCircle', 'StopCircle', 'Volume2', 'Mic', 'Camera', 'Monitor']
  },
  {
    name: 'Users & People',
    samples: ['User', 'Users', 'UserPlus', 'UserMinus', 'UserCheck', 'UserX', 'Contact', 'Smile', 'Heart', 'ThumbsUp']
  },
  {
    name: 'Interface',
    samples: ['Search', 'Settings', 'SlidersHorizontal', 'Filter', 'Info', 'HelpCircle', 'AlertCircle', 'CheckCircle', 'XCircle', 'LayoutGrid']
  },
  {
    name: 'Shapes',
    samples: ['Circle', 'Square', 'Triangle', 'RectangleHorizontal', 'RectangleVertical', 'Star', 'Heart', 'Hexagon', 'Octagon', 'Pentagon']
  },
   {
    name: 'Logos & Brands',
    samples: ['Github', 'Gitlab', 'Twitter', 'Facebook', 'Instagram', 'Linkedin', 'Dribbble', 'Figma', 'Codepen', 'Youtube']
  },
  // Add more categories + samples as desired
];

// --- Main Page Component ---
interface IconsPageProps {
  iconNames: string[];
}

export default function IconsPage({ iconNames }: IconsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Memoize the filtered list based on category AND search term
  const filteredIcons = useMemo(() => {
    // Determine the base list (all names or category samples)
    let baseList = iconNames;
    if (selectedCategory) {
      const category = iconCategories.find(cat => cat.name === selectedCategory);
      baseList = category ? category.samples : []; // Use samples if category found
    }

    // Filter the base list by search term
    if (!searchTerm) {
      return baseList; // No search term, return the base list
    }
    return baseList.filter(name =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [iconNames, selectedCategory, searchTerm]);

  // Update the placeholder text based on context
  const searchPlaceholder = selectedCategory
    ? `Search ${filteredIcons.length} icons in ${selectedCategory}...`
    : `Search ${iconNames.length} icons...`;

  // Basic navigation structure for this page
  const rightNavItems = {
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'icon-list', label: 'Icon List' },
    ]
  };
  
  return (
    <DocumentationLayout rightNav={rightNavItems}>
      <div className="max-w-7xl mx-auto space-y-12 py-8 px-4">
         <header className="border-b border-gray-200 pb-8">
           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">Icons</h1>
           <p className="text-xl text-gray-600">Browse the {iconNames.length} available icons from the Lucide icon set.</p>
        </header>

        <section id="overview" className="scroll-mt-16">
          <SectionHeader 
            title="Usage" 
            description="How to import and use icons in your project."
          />
          <div className="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <CodeBlock
              code={`import { IconName } from 'lucide-react';

function MyComponent() {
  return <IconName size={24} className="text-blue-500" />;
}`}
              language="tsx"
            />
          </div>
           <p className="text-sm text-gray-600">Replace `IconName` with the desired icon's PascalCase name. You can customize the `size` and `className` props.</p>
        </section>

        <section id="icon-list" className="scroll-mt-16">
          <SectionHeader 
            title="Icon Library" 
            description="Search the full library or browse by category."
          />
          <div className="sticky top-0 bg-gray-50/80 backdrop-blur-sm py-4 z-10 -mx-4 px-4 mb-6">
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-xl mx-auto block mb-4"
            />
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === null ? 'primary' : 'outlined'} 
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Icons
              </Button>
              {iconCategories.map(category => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'primary' : 'outlined'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-3 px-4">
              Category filters show samples. Select "All Icons" to search the full {iconNames.length}-icon library.
            </p>
          </div>

          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
              {filteredIcons.map(name => {
                const IconComponent = (Icons as any)[name] as React.ComponentType<Icons.LucideProps> | undefined;
                return IconComponent ? (
                  <IconCard key={name} name={name} IconComponent={IconComponent} />
                ) : null;
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              {searchTerm 
                ? `No icons found matching "${searchTerm}"${selectedCategory ? ` in ${selectedCategory}` : ''}.` 
                : `No icons found in the ${selectedCategory} category.`
              }
            </p>
          )}
        </section>
      </div>
    </DocumentationLayout>
  );
} 