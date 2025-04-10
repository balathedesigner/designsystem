import React from 'react';
import Link from 'next/link';
import { sidebarItems } from '@/data/sidebarItems';

export default function ComponentsPage() {
  // Filter for component sections only
  const componentSections = sidebarItems.filter(section => 
    section.items.some(item => item.href.startsWith('/components/'))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Component Library</h1>
      <p className="text-lg text-gray-600 mb-12">
        Explore our collection of reusable UI components designed for consistency and usability.
      </p>

      <div className="space-y-16">
        {componentSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.filter(item => item.href.startsWith('/components/')).map((item) => (
                <Link href={item.href} scroll={true} key={item.href} className="group">
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">{item.name}</h3>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 