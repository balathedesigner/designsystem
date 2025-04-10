import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the structure for a navigation item
export interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  children?: SidebarItem[];
}

// Define the props for the sidebar component
export interface SidebarProps {
  items: SidebarItem[];
  width?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

// Helper component to render each navigation item
const RenderNavItem: React.FC<{
  item: SidebarItem;
  level: number;
  isSidebarCollapsed: boolean;
  expandedItems: Set<string>;
  toggleItem: (href: string) => void;
}> = ({ item, level, isSidebarCollapsed, expandedItems, toggleItem }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.href);

  return (
    <li className="list-none">
      <button
        className={cn(
          'flex items-center px-4 py-2 text-sm transition-colors duration-150 w-full text-left rounded-md',
          isSidebarCollapsed ? 'justify-center' : '',
          level > 0 ? `pl-${4 + level * 4}` : 'pl-4'
        )}
        onClick={() => toggleItem(item.href)}
        aria-expanded={isExpanded}
      >
        {item.icon && <span className="mr-3">{item.icon}</span>}
        {!isSidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
        {hasChildren && (
          <ChevronDown
            className={cn('h-4 w-4 ml-2 shrink-0 transform transition-transform', isExpanded ? 'rotate-180' : '')}
            aria-hidden="true"
          />
        )}
      </button>
      {hasChildren && isExpanded && !isSidebarCollapsed && (
        <ul className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <RenderNavItem
              key={child.href}
              item={child}
              level={level + 1}
              isSidebarCollapsed={isSidebarCollapsed}
              expandedItems={expandedItems}
              toggleItem={toggleItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// Main Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({
  items,
  width = '240px',
  isCollapsed = false,
  onToggleCollapse,
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (href: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(href)) {
        next.delete(href);
      } else {
        next.add(href);
      }
      return next;
    });
  };

  return (
    <nav
      className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen',
        isCollapsed ? 'w-16' : `w-[${width}]`,
        className
      )}
      role="navigation"
      aria-label="Sidebar"
    >
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => (
            <RenderNavItem
              key={item.href}
              item={item}
              level={0}
              isSidebarCollapsed={isCollapsed}
              expandedItems={expandedItems}
              toggleItem={toggleItem}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

Sidebar.displayName = 'Sidebar'; 