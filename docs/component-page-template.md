# Component Documentation Page Template

This template serves as a guide for creating consistent documentation pages for components in the design system.

## Page Structure Checklist

### 1. Header Section
- [ ] Component name with heading (h1)
- [ ] Status badge (Beta/Stable/Deprecated)
- [ ] Brief description (1-2 sentences)
- [ ] Quick action buttons
  - [ ] "Try it out" link to playground
  - [ ] "View API" link to API reference

### 2. Import Section
- [ ] Code block showing import statement
- [ ] Dark theme syntax highlighting
- [ ] Copy button with feedback
- [ ] Package/path information

### 3. Core Variants
- [ ] Basic component variations
- [ ] Example for each variant
- [ ] Description of use cases
- [ ] Grid layout for visual comparison
- [ ] Code examples for each variant

### 4. Usage Guidelines
- [ ] Input Groups & Compositions (if applicable)
- [ ] Best Practices section
  - [ ] Do's and Don'ts
  - [ ] Visual examples
  - [ ] Common pitfalls
- [ ] Accessibility guidelines
  - [ ] ARIA attributes
  - [ ] Keyboard navigation
  - [ ] Screen reader considerations

### 5. Common Use Cases
- [ ] Real-world examples
- [ ] Code snippets
- [ ] Implementation notes
- [ ] Edge cases and solutions

### 6. Interactive Playground
- [ ] Live preview section
- [ ] Control panel
  - [ ] Core properties
  - [ ] Style properties
  - [ ] State toggles
  - [ ] Feature toggles
- [ ] Code preview
  - [ ] Syntax highlighting
  - [ ] Copy functionality with feedback
  - [ ] Multiple language tabs
  - [ ] Fixed height (400px) with scroll

### 7. API Reference
- [ ] Props table
  - [ ] Name
  - [ ] Type
  - [ ] Default
  - [ ] Description
- [ ] Events documentation
- [ ] Type definitions
- [ ] Interface documentation

## Code Implementation Checklist

### 1. File Structure
```typescript
// [ComponentName]Page.tsx
import { DocumentationLayout } from '@/components/layouts'
import { ComponentName } from '@/components/ui'
import { CodeBlock } from '@/components/shared'

export default function ComponentNamePage() {
  // State management
  const [playgroundProps, setPlaygroundProps] = useState(defaultProps)
  const [activeCodeTab, setActiveCodeTab] = useState<'react' | 'html' | 'js'>('react')
  const [isCopied, setIsCopied] = useState(false)

  // Navigation structure
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
      // Add other sections...
    ]
  }

  return (
    <DocumentationLayout rightNav={rightNavItems}>
      {/* Page content */}
    </DocumentationLayout>
  )
}
```

### 2. Required Components
- [ ] Documentation Layout
- [ ] Code Block with syntax highlighting
- [ ] Component Playground
- [ ] Section Headers
- [ ] Example Cards
- [ ] API Table

### 3. Styling Guidelines
- [ ] Use Tailwind classes consistently
- [ ] Follow spacing scale
  - `mt-8` for major sections
  - `mt-6` for subsections
  - `space-y-4` for content blocks
- [ ] Use semantic colors
  - Text: gray-900 for headings, gray-700 for body
  - Background: white for content, gray-50 for examples
  - Accents: primary color for interactive elements

### 4. Code Examples
- [ ] Dark theme syntax highlighting
- [ ] Fixed height (400px) for playground code
- [ ] Copy button with success state
- [ ] Multiple language support
- [ ] Proper padding and spacing

## Right Navigation Structure
```typescript
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
        { id: 'compositions', label: 'Component Compositions' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'accessibility', label: 'Accessibility' }
      ]
    },
    {
      id: 'use-cases',
      label: 'Use Cases',
      subItems: [/* Component-specific use cases */]
    },
    {
      id: 'playground',
      label: 'Interactive Playground',
      subItems: [
        { id: 'preview', label: 'Preview' },
        { id: 'customize', label: 'Customize' },
        { id: 'code', label: 'Code' }
      ]
    },
    {
      id: 'api',
      label: 'API Reference',
      subItems: [
        { id: 'core-props', label: 'Core Props' },
        { id: 'content-props', label: 'Content Props' },
        { id: 'state-props', label: 'State Props' },
        { id: 'validation-props', label: 'Validation Props' },
        { id: 'feature-props', label: 'Feature Props' },
        { id: 'additional-props', label: 'Additional Props' },
        { id: 'event-props', label: 'Event Props' }
      ]
    }
  ]
}
```

## Best Practices

1. **Progressive Disclosure**
   - Start with basic usage
   - Progress to more complex implementations
   - End with API details

2. **Visual Examples**
   - Include examples for all variants
   - Show both good and bad practices
   - Demonstrate responsive behavior

3. **Code Quality**
   - Use TypeScript
   - Include proper types
   - Add JSDoc comments
   - Follow project conventions

4. **Accessibility**
   - Document ARIA roles
   - Include keyboard navigation
   - Provide screen reader guidance

5. **Performance**
   - Lazy load examples where possible
   - Optimize images
   - Minimize bundle size

## Quality Checklist

Before considering a component page complete, ensure:

- [ ] All sections are implemented
- [ ] Code examples work and are copy-able
- [ ] Playground is fully functional
- [ ] Navigation links work
- [ ] Types are properly documented
- [ ] Accessibility guidelines are included
- [ ] Best practices are documented
- [ ] Mobile responsiveness is tested
- [ ] Syntax highlighting works
- [ ] Copy functionality works with feedback 