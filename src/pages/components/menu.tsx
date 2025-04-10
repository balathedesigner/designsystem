import React, { useState } from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { EmptyComponentTemplate } from '@/components/shared/EmptyComponentTemplate';

// Define navigation items for documentation
const rightNavItems = {
  items: [
    {
      id: 'getting-started',
      label: 'Getting Started',
      subItems: [
        { id: 'import', label: 'Import' },
        { id: 'core-variants', label: 'Core Variants' }
      ]
    },
    {
      id: 'usage',
      label: 'Usage',
      subItems: [
        { id: 'compositions', label: 'Menu Compositions' },
        { id: 'interactive-states', label: 'Interactive States' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      subItems: [
        { id: 'basic', label: 'Basic Menu' },
        { id: 'with-icons', label: 'With Icons' },
        { id: 'nested', label: 'Nested Menus' }
      ]
    },
    {
      id: 'playground',
      label: 'Interactive Playground'
    },
    {
      id: 'api',
      label: 'API Reference'
    }
  ]
};

// Main component
export default function MenuPage() {
  // For now, we'll use the EmptyComponentTemplate until we implement the Menu component
  return (
    <EmptyComponentTemplate
      title="Menu"
      description="Dropdown menus for navigation or actions."
      componentName="Menu"
    />
  );
} 