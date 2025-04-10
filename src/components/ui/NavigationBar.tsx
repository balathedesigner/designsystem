import React from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, Bell, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  children?: NavigationItem[];
  icon?: React.ReactNode;
  description?: string;
}

export interface NavigationBarProps {
  logo?: React.ReactNode;
  brandName?: string;
  brandHref?: string;
  items?: NavigationItem[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  userMenuItems?: NavigationItem[];
  showSidebar?: boolean;
  sidebarItems?: NavigationItem[];
  sidebarWidth?: string;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  className?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  logo,
  brandName = 'Brand',
  brandHref = '/',
  items = [],
  searchPlaceholder = 'Search...',
  showSearch = true,
  showNotifications = true,
  showUserMenu = true,
  userMenuItems = [],
  showSidebar = true,
  sidebarItems = [],
  sidebarWidth = '240px',
  sidebarCollapsed = false,
  onSidebarToggle,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState<string | null>(null);

  const renderMenuItem = (item: NavigationItem, isSubMenu = false, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = isSubMenuOpen === item.href;
    
    return (
      <div key={item.href} className="relative">
        <Link
          href={item.href}
          className={`flex items-center px-4 py-2 text-sm ${
            isSubMenu ? 'pl-8' : ''
          } ${
            item.isActive
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              setIsSubMenuOpen(isSubMenuOpen === item.href ? null : item.href);
            }
          }}
          aria-expanded={hasChildren ? isOpen : undefined}
          aria-current={item.isActive ? 'page' : undefined}
        >
          {item.icon && <span className="mr-3">{item.icon}</span>}
          <span className="flex-1">
            <span className="block">{item.label}</span>
            {item.description && !sidebarCollapsed && (
              <span className="block text-xs text-gray-500">{item.description}</span>
            )}
          </span>
          {hasChildren && (
            <ChevronDown
              className={`h-4 w-4 transform transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          )}
        </Link>
        {hasChildren && isOpen && (
          <div 
            className="bg-gray-50"
            role="group"
            aria-label={`${item.label} submenu`}
          >
            {item.children?.map((child) => renderMenuItem(child, true, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {showSidebar && (
        <div
          className={`bg-white border-r border-gray-200 transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : `w-[${sidebarWidth}]`
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {!sidebarCollapsed && (
                <Link href={brandHref} className="flex items-center">
                  {logo}
                  <span className="ml-2 text-xl font-semibold text-gray-900">
                    {brandName}
                  </span>
                </Link>
              )}
              {sidebarCollapsed && logo}
              <button
                onClick={onSidebarToggle}
                className="p-1 rounded-md hover:bg-gray-100"
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav 
              className="flex-1 overflow-y-auto custom-scrollbar"
              aria-label="Sidebar navigation"
            >
              {sidebarItems.map((item) => renderMenuItem(item))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <nav 
          className={`bg-white border-b border-gray-200 ${className}`}
          role="navigation"
          aria-label="Top navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left section - Brand and navigation */}
              <div className="flex">
                {!showSidebar && (
                  <div className="flex-shrink-0 flex items-center">
                    <Link href={brandHref} className="flex items-center">
                      {logo}
                      <span className="ml-2 text-xl font-semibold text-gray-900">
                        {brandName}
                      </span>
                    </Link>
                  </div>
                )}
                {/* Desktop navigation */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {items.map((item) => (
                    <div key={item.href} className="relative group">
                      <Link
                        href={item.href}
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          item.isActive
                            ? 'border-primary-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                        aria-current={item.isActive ? 'page' : undefined}
                      >
                        {item.label}
                        {item.children && (
                          <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                        )}
                      </Link>
                      {item.children && (
                        <div 
                          className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby={`menu-${item.href}`}
                        >
                          <div className="py-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right section - Search, notifications, user menu */}
              <div className="flex items-center">
                {showSearch && (
                  <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="max-w-lg w-full lg:max-w-xs">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Input
                          type="text"
                          placeholder={searchPlaceholder}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          aria-label="Search"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {showNotifications && (
                  <button
                    type="button"
                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    aria-label="View notifications"
                  >
                    <Bell className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}

                {/* User menu */}
                {showUserMenu && (
                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        aria-expanded={isUserMenuOpen}
                        aria-label="User menu"
                      >
                        <User className="h-8 w-8 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                    {isUserMenuOpen && (
                      <div 
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <div className="py-1">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              {item.icon && <span className="mr-2">{item.icon}</span>}
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile menu button */}
                <div className="flex items-center sm:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Open main menu"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {items.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                        item.isActive
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                      }`}
                      aria-current={item.isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-6">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Content will be rendered here */}
        </main>
      </div>
    </div>
  );
}; 