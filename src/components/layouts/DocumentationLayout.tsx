import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { sidebarItems, SidebarSection, SidebarItem } from '@/data/sidebarItems';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

interface DocumentationLayoutProps {
  children: React.ReactNode;
  rightNav?: {
    items: Array<{
      id: string;
      label: string;
      subItems?: Array<{ id: string; label: string; }>;
    }>;
  };
}

export default function DocumentationLayout({ children, rightNav }: DocumentationLayoutProps) {
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
          section.items.some(item => item.href?.startsWith(basePath))
        )
        .map(section => section.title);
    }
    return ['Components']; // Default
  };
  
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    // Initialize with the sections that contain the current path
    return findSectionForPath(currentPath);
  });
  
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

  const handleBack = () => {
    // Always go back to home page
    router.push('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white overflow-y-auto fixed h-screen">
        <div className="p-6">
          <button
            onClick={handleBack}
            className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg 
              className="mr-1 h-4 w-4" 
              fill="none" 
              strokeWidth="2" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
        <nav className="px-3 pb-4">
          {sidebarItems.map((section: SidebarSection) => (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <span>{section.title}</span>
                <svg
                  className={clsx(
                    'h-4 w-4 transition-transform',
                    expandedSections.includes(section.title) ? 'transform rotate-180' : ''
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.includes(section.title) && (
                <div className="mt-1 space-y-1">
                  {section.items.map((item) => (
                    item.href && (
                      <Link
                        key={item.href}
                        href={item.href}
                        scroll={true}
                        className={cn(
                          'block pl-6 pr-3 py-2 text-sm rounded-md transition-colors',
                          currentPath === item.href
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        {item.name}
                        {item.isComingSoon && (
                          <span className="ml-2 text-xs text-gray-400">(Soon)</span>
                        )}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 pl-64">
        <div className="flex gap-6 w-full py-12 px-6">
          <div className="flex-1">
            {children}
          </div>
          {/* Right side navigation */}
          {rightNav && rightNav.items && (
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">On this page</h4>
                <nav className="space-y-2">
                  {rightNav.items.map((item) => (
                    <div key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(`#${item.id}`)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="block text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.label}
                      </a>
                      {item.subItems && (
                        <div className="pl-4 space-y-2 mt-2">
                          {item.subItems.map((subItem) => (
                            <a
                              key={subItem.id}
                              href={`#${subItem.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                document.querySelector(`#${subItem.id}`)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="block text-sm text-gray-500 hover:text-gray-900"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 