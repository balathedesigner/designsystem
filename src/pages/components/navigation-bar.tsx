import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import Sidebar from '@/components/ui/Sidebar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';
import { Home, User, Settings, FileText } from 'lucide-react';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';

const sidebarItems = [
  {
    label: 'Home',
    href: '/',
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: <User className="h-5 w-5" />,
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: <FileText className="h-5 w-5" />,
    children: [
      { label: 'Project 1', href: '/projects/1' },
      { label: 'Project 2', href: '/projects/2' },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function NavigationBarPage() {
  const [playgroundProps, setPlaygroundProps] = useState({
    isCollapsed: false,
    width: '240px',
  });

  const renderCoreVariants = () => (
    <div className="space-y-8">
      <SectionHeader
        title="Core Variants"
        description="The Sidebar component supports both expanded and collapsed states."
      />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <SubsectionHeader title="Default" />
          <div className="h-[400px] border rounded-lg overflow-hidden">
            <Sidebar items={sidebarItems} />
          </div>
        </div>
        <div>
          <SubsectionHeader title="Collapsed" />
          <div className="h-[400px] border rounded-lg overflow-hidden">
            <Sidebar items={sidebarItems} isCollapsed />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="space-y-8">
      <SectionHeader
        title="Accessibility"
        description="The Sidebar component is built with accessibility in mind."
      />
      <ul className="list-disc list-inside space-y-4">
        <li>Uses semantic HTML with proper ARIA attributes</li>
        <li>Keyboard navigation support for menu items</li>
        <li>Clear visual hierarchy and focus states</li>
        <li>Screen reader friendly structure</li>
      </ul>
    </div>
  );

  const renderPlayground = () => (
    <div className="space-y-8">
      <SectionHeader
        title="Playground"
        description="Explore the Sidebar component with different configurations."
      />
      <ComponentPlayground
        defaultProps={playgroundProps}
        controls={[
          {
            group: 'Layout',
            items: [
              {
                type: 'chip',
                label: 'Collapsed',
                value: playgroundProps.isCollapsed,
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, isCollapsed: value }))
              },
              {
                type: 'select',
                label: 'Width',
                value: playgroundProps.width,
                options: [
                  { value: '200px', label: '200px' },
                  { value: '240px', label: '240px' },
                  { value: '280px', label: '280px' }
                ],
                onChange: (value) => setPlaygroundProps(prev => ({ ...prev, width: value }))
              }
            ]
          }
        ]}
        preview={
          <div className="h-[400px] border rounded-lg overflow-hidden">
            <Sidebar
              items={sidebarItems}
              isCollapsed={playgroundProps.isCollapsed}
              width={playgroundProps.width}
            />
          </div>
        }
      />
    </div>
  );

  const renderCompositions = () => (
    <div className="space-y-8">
      <SectionHeader
        title="Compositions"
        description="The Sidebar component can be composed with other navigation elements."
      />
      <div className="h-[400px] border rounded-lg overflow-hidden">
        <Sidebar items={sidebarItems} />
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div className="space-y-8">
      <SectionHeader
        title="Use Cases"
        description="Common use cases for the Sidebar component."
      />
      <div className="h-[400px] border rounded-lg overflow-hidden">
        <Sidebar items={sidebarItems} />
      </div>
    </div>
  );

  const renderApiReference = () => (
    <div className="space-y-8">
      <SectionHeader
        title="API Reference"
        description="Complete API reference for the Sidebar component."
      />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Props</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><code>items</code>: Array of navigation items</li>
          <li><code>isCollapsed</code>: Boolean to control sidebar collapse state</li>
          <li><code>width</code>: Optional string to set sidebar width</li>
          <li><code>onToggleCollapse</code>: Optional callback for collapse toggle</li>
          <li><code>className</code>: Optional string for additional CSS classes</li>
        </ul>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Sidebar"
      description="A vertical navigation component that provides an organized way to navigate between different sections of an application."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Sidebar } from '@/components/ui/Sidebar';"
      rightNavItems={{
        items: [
          { id: 'playground', label: 'Playground' },
          { id: 'core-variants', label: 'Core Variants' },
          { id: 'compositions', label: 'Compositions' },
          { id: 'use-cases', label: 'Use Cases' },
          { id: 'api-reference', label: 'API Reference' },
          { id: 'accessibility', label: 'Accessibility' },
        ]
      }}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      renderAccessibility={renderAccessibility}
    />
  );
} 