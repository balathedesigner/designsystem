import { useRouter } from 'next/router';
import Link from 'next/link';
import { sidebarItems } from '@/data/sidebarItems';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

interface ComponentsLayoutProps {
  children: React.ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  const router = useRouter();
  const currentPath = router.asPath;
  
  // Find which section contains the current path
  const findSectionForPath = (path: string) => {
    const pathSegments = path.split('/');
    if (pathSegments.length >= 2) {
      const basePath = `/${pathSegments[1]}`;
      
      // For each section, check if any of its items match the basePath
      return sidebarItems
        .filter(section => 
          section.items.some(item => item.href.startsWith(basePath))
        )
        .map(section => section.title);
    }
    return ['Components']; // Default
  };
  
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    // Initialize with the sections that contain the current path
    return findSectionForPath(currentPath);
  });
  
  const [searchQuery, setSearchQuery] = useState('');

  // Update expanded sections when the path changes
  useEffect(() => {
    const sectionsForCurrentPath = findSectionForPath(currentPath);
    
    // Only update if we need to add sections that aren't already expanded
    const sectionsToAdd = sectionsForCurrentPath.filter(
      section => !expandedSections.includes(section)
    );
    
    if (sectionsToAdd.length > 0) {
      setExpandedSections(prev => [...prev, ...sectionsToAdd]);
    }
  }, [currentPath]);

  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const filteredItems = sidebarItems.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-200 bg-white overflow-y-auto fixed h-screen">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <nav className="p-4">
          {filteredItems.map((section) => (
            <div key={section.title} className="mb-6">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-left mb-2 group"
              >
                <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                  {section.title}
                </span>
                {expandedSections.includes(section.title) ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>
              {expandedSections.includes(section.title) && (
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      scroll={true}
                      className={clsx(
                        'block px-3 py-2 text-sm rounded-md transition-colors',
                        currentPath === item.href
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <span className="block">{item.name}</span>
                      {item.description && (
                        <span className="block text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-72 min-h-screen">
        <div className="max-w-5xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
} 