import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  name: string;
  href?: string;
  description?: string;
  isComingSoon?: boolean;
  icon?: LucideIcon;
  children?: SidebarItem[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const sidebarItems: SidebarSection[] = [
  {
    title: 'Foundations',
    items: [
      { name: 'Introduction', href: '/foundations/introduction', description: 'Overview of the design system' },
      { name: 'Colors', href: '/foundations/colors', description: 'Color palette and usage' },
      { name: 'Typography', href: '/foundations/typography', description: 'Fonts, text styles, and usage' },
      { name: 'Spacing', href: '/foundations/spacing', description: 'Margin, padding, and spacing scale' },
      { name: 'Accessibility', href: '/foundations/accessibility', description: 'Guidelines for inclusive design' },
    ],
  },
  {
    title: 'Tokens',
    items: [
      { name: 'Color Tokens', href: '/tokens/colors', description: 'Design tokens for colors' },
      { name: 'Spacing Tokens', href: '/tokens/spacing', description: 'Design tokens for spacing' },
      { name: 'Typography Tokens', href: '/tokens/typography', description: 'Design tokens for typography' },
      { name: 'Shadow Tokens', href: '/tokens/shadows', description: 'Design tokens for shadows and elevation' },
    ],
  },
  {
    title: 'Basic Components',
    items: [
      { name: 'Buttons', href: '/components/buttons', description: 'Button styles and variants' },
      { name: 'Icons', href: '/components/icons', description: 'Icon library and usage', isComingSoon: true },
      { name: 'Avatars', href: '/components/avatar', description: 'User and content avatars' },
      { name: 'Badges', href: '/components/badges', description: 'Notification and status indicators' },
    ],
  },
  {
    title: 'Navigation Components',
    items: [
      { name: 'Breadcrumbs', href: '/components/breadcrumbs', description: 'Hierarchical navigation paths' },
      { name: 'Tabs', href: '/components/tabs', description: 'Content organization and navigation', isComingSoon: true },
      { name: 'Pagination', href: '/components/pagination', description: 'Navigation between pages of content', isComingSoon: true },
      { 
        name: 'Navigation Bar', 
        href: '/components/navigation-bar', 
        description: 'Top-level application navigation including sidebar and menus',
        children: [
          { name: 'Navigation Bar', href: '/components/navigation-bar', description: 'Main navigation bar with responsive design' },
          { name: 'Sidebar', href: '/components/navigation-bar#sidebar', description: 'Vertical navigation menu' },
          { name: 'Menu', href: '/components/navigation-bar#menu', description: 'Dropdown menus for navigation or actions' }
        ]
      },
      { name: 'Links', href: '/components/links', description: 'Text links for navigation' },
      { name: 'Stepper', href: '/components/stepper', description: 'Progress indication for multi-step flows', isComingSoon: true },
    ],
  },
  {
    title: 'Data Display Components',
    items: [
      { name: 'Table', href: '/components/table', description: 'Tabular data presentation', isComingSoon: true },
      { name: 'List', href: '/components/list', description: 'Display collections of items', isComingSoon: true },
      { name: 'Cards', href: '/components/cards', description: 'Content containers with various layouts' },
      { name: 'Tree View', href: '/components/tree-view', description: 'Hierarchical data visualization', isComingSoon: true },
      { name: 'Data Grid', href: '/components/data-grid', description: 'Advanced tables for complex data', isComingSoon: true },
      { name: 'Timeline', href: '/components/timeline', description: 'Chronological display of events', isComingSoon: true },
    ],
  },
  {
    title: 'Form Components',
    items: [
      { name: 'Inputs', href: '/components/inputs', description: 'Text input fields and variants' },
      { name: 'Form Controls', href: '/components/form-controls', description: 'Checkboxes, radio buttons, and switches' },
      { name: 'Select', href: '/components/select', description: 'Dropdown selection controls', isComingSoon: true },
      { name: 'Combobox', href: '/components/combobox', description: 'Combined input and dropdown lists', isComingSoon: true },
      { name: 'Date Picker', href: '/components/date-picker', description: 'Calendar-based date selection', isComingSoon: true },
      { name: 'Time Picker', href: '/components/time-picker', description: 'Time selection controls', isComingSoon: true },
      { name: 'Slider', href: '/components/slider', description: 'Range selection controls', isComingSoon: true },
      { name: 'File Upload', href: '/components/file-upload', description: 'File selection and upload interfaces', isComingSoon: true },
      { name: 'Rating', href: '/components/rating', description: 'Star rating input controls', isComingSoon: true },
      { name: 'Autocomplete', href: '/components/autocomplete', description: 'Input fields with suggestions', isComingSoon: true },
    ],
  },
  {
    title: 'Feedback Components',
    items: [
      { name: 'Alerts', href: '/components/alerts', description: 'Informational messages and notifications' },
      { name: 'Toast', href: '/components/toast', description: 'Brief notifications that appear temporarily', isComingSoon: true },
      { name: 'Progress', href: '/components/progress', description: 'Progress indicators and loading states', isComingSoon: true },
      { name: 'Skeleton', href: '/components/skeleton', description: 'Loading placeholder animations', isComingSoon: true },
      { name: 'Snackbar', href: '/components/snackbar', description: 'Brief messages about app processes', isComingSoon: true },
    ],
  },
  {
    title: 'Overlay & Utility',
    items: [
      { name: 'Modals', href: '/components/modals', description: 'Dialog windows that require user attention' },
      { name: 'Drawer', href: '/components/drawer', description: 'Side panels that slide in from screen edges', isComingSoon: true },
      { name: 'Tooltip', href: '/components/tooltip', description: 'Contextual information on hover', isComingSoon: true },
      { name: 'Popover', href: '/components/popover', description: 'Contextual overlays for content', isComingSoon: true },
    ],
  },
  {
    title: 'Media Components',
    items: [
      { name: 'Image', href: '/components/image', description: 'Image display with various options', isComingSoon: true },
      { name: 'Video', href: '/components/video', description: 'Video playback components', isComingSoon: true },
      { name: 'Carousel', href: '/components/carousel', description: 'Slideshow for cycling through elements', isComingSoon: true },
      { name: 'Gallery', href: '/components/gallery', description: 'Grid-based image galleries', isComingSoon: true },
    ],
  },
]; 