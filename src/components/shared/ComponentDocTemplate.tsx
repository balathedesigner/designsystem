import React from 'react';
import { ChevronRight } from 'lucide-react';
import DocumentationLayout from '@/components/layouts/DocumentationLayout';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SubsectionHeader } from '@/components/ui/SubsectionHeader';
import CodeBlock from '@/components/shared/CodeBlock';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { cn } from '@/lib/utils';

export interface ComponentStatus {
  label: 'Stable' | 'Beta' | 'Alpha' | 'Deprecated';
  color: 'blue' | 'purple' | 'yellow' | 'red';
}

export interface NavItem {
  id: string;
  label: string;
  subItems?: Array<{ id: string; label: string }>;
}

export interface ComponentDocTemplateProps {
  title: string;
  description: string;
  status: ComponentStatus;
  importCode: string;
  rightNavItems: {
    items: NavItem[];
  };
  renderPlayground: () => React.ReactNode;
  renderCoreVariants: () => React.ReactNode;
  renderCompositions: () => React.ReactNode;
  renderUseCases: () => React.ReactNode;
  renderApiReference: () => React.ReactNode;
  renderDesignTokens?: () => React.ReactNode;
  renderAccessibility?: () => React.ReactNode;
  renderResponsiveBehavior?: () => React.ReactNode;
  renderInteractiveStates?: () => React.ReactNode;
  renderPatterns?: () => React.ReactNode;
  renderAdditionalContent?: React.ReactNode;
  generateCode?: () => string;
  children?: React.ReactNode;
}

const statusColors = {
  Stable: 'bg-blue-100 text-blue-800 ring-blue-700/10',
  Beta: 'bg-purple-100 text-purple-800 ring-purple-700/10',
  Alpha: 'bg-yellow-100 text-yellow-800 ring-yellow-700/10',
  Deprecated: 'bg-red-100 text-red-800 ring-red-700/10',
};

// Common wrapper component for section content
export const SectionContentWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

// Helper components for best practices
export interface BestPracticeItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: React.ReactNode;
}

export const BestPracticeItem: React.FC<BestPracticeItemProps> = ({ icon, title, description, example }) => (
  <li className="flex gap-3">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div>
      <p className="text-gray-700">{description}</p>
      <div className="mt-2">
        {example}
      </div>
    </div>
  </li>
);

// Icons for Do's and Don'ts
export const DoIcon = () => (
  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

export const DontIcon = () => (
  <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
    <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
);

// Standardized animation speeds for all components
export const ANIMATION_SPEEDS = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500'
} as const;

export type AnimationSpeed = keyof typeof ANIMATION_SPEEDS;

// Helper to apply animation speed class
export const getAnimationClass = (speed: AnimationSpeed | undefined): string => {
  if (!speed || speed === 'normal') return ANIMATION_SPEEDS.normal;
  return ANIMATION_SPEEDS[speed];
};

// Standard animation control for component playgrounds
export const getAnimationControl = (
  value: AnimationSpeed, 
  onChange: (value: AnimationSpeed) => void
) => ({
  type: 'select' as const,
  label: 'Animation Speed',
  options: [
    { value: 'fast', label: 'Fast' },
    { value: 'normal', label: 'Normal' },
    { value: 'slow', label: 'Slow' }
  ],
  value,
  onChange: (value: string) => onChange(value as AnimationSpeed)
});

/**
 * TEMPLATE FOR COMPONENT RENDER FUNCTIONS:
 * 
 * The ComponentDocTemplate provides consistent styling helpers. Import and use these 
 * components to ensure visual consistency across all component documentation pages:
 * 
 * ```tsx
 * import { 
 *   SectionContentWrapper, 
 *   BestPracticeItem, 
 *   DoIcon, 
 *   DontIcon,
 *   ANIMATION_SPEEDS,
 *   getAnimationClass,
 *   getAnimationControl
 * } from '@/components/shared/ComponentDocTemplate';
 * ```
 * 
 * When creating component page render functions (renderCoreVariants, renderApiReference, etc.),
 * use the following pattern to ensure consistent styling:
 * 
 * ```tsx
 * const renderSectionName = () => (
 *   <SectionContentWrapper>
 *     <h3 className="text-lg font-semibold mb-4">Section Title</h3>
 *     <div className="space-y-4">
 *       ... content ...
 *     </div>
 *   </SectionContentWrapper>
 * );
 * ```
 * 
 * For Best Practices (renderPatterns), use the following pattern:
 * 
 * ```tsx
 * const renderPatterns = () => (
 *   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 *     <SectionContentWrapper>
 *       <h3 className="text-lg font-semibold text-green-600 mb-4">Do's</h3>
 *       <ul className="space-y-4">
 *         <BestPracticeItem
 *           icon={<DoIcon />}
 *           title="Clear labels"
 *           description="Use clear, action-oriented labels (e.g., 'Save Changes', 'Create Account')"
 *           example={<YourComponentExample />}
 *         />
 *         // ... more items
 *       </ul>
 *     </SectionContentWrapper>
 *     
 *     <SectionContentWrapper>
 *       <h3 className="text-lg font-semibold text-red-600 mb-4">Don'ts</h3>
 *       <ul className="space-y-4">
 *         <BestPracticeItem
 *           icon={<DontIcon />}
 *           title="Vague labels"
 *           description="Don't use vague or generic labels"
 *           example={<YourComponentExample />}
 *         />
 *         // ... more items
 *       </ul>
 *     </SectionContentWrapper>
 *   </div>
 * );
 * ```
 * 
 * For API Reference, consider using a table within the SectionContentWrapper:
 * 
 * ```tsx
 * const renderApiReference = () => (
 *   <SectionContentWrapper>
 *     <h3 className="text-sm font-medium mb-4">Core Props</h3>
 *     <div className="overflow-x-auto">
 *       <table className="w-full text-sm">
 *         <thead>
 *           <tr className="text-left">
 *             <th className="pb-2">Prop</th>
 *             <th className="pb-2">Type</th>
 *             <th className="pb-2">Default</th>
 *             <th className="pb-2">Description</th>
 *           </tr>
 *         </thead>
 *         <tbody className="divide-y divide-gray-100">
 *           ... rows ...
 *         </tbody>
 *       </table>
 *     </div>
 *   </SectionContentWrapper>
 * );
 * ```
 * 
 * For standardized animation speeds, add the following to your component's props:
 * 
 * ```tsx
 * interface PlaygroundProps {
 *   // ... other props
 *   animationSpeed: AnimationSpeed; // 'fast' | 'normal' | 'slow'
 * }
 * ```
 * 
 * Apply animation speeds consistently in your component:
 * 
 * ```tsx
 * <YourComponent
 *   className={cn(
 *     // ... other classes
 *     "transition-all",
 *     getAnimationClass(animationSpeed)
 *   )}
 * />
 * ```
 * 
 * Add animation controls to your playground:
 * 
 * ```tsx
 * controls={[
 *   // ... other control groups
 *   {
 *     group: 'Animation',
 *     items: [
 *       getAnimationControl(
 *         playgroundProps.animationSpeed, 
 *         (value) => setPlaygroundProps({ ...playgroundProps, animationSpeed: value })
 *       )
 *     ]
 *   }
 * ]}
 */

export function ComponentDocTemplate({
  title,
  description,
  status,
  importCode,
  rightNavItems,
  renderPlayground,
  renderCoreVariants,
  renderCompositions,
  renderUseCases,
  renderApiReference,
  renderDesignTokens,
  renderAccessibility,
  renderResponsiveBehavior,
  renderInteractiveStates,
  renderPatterns,
  renderAdditionalContent,
  generateCode,
  children
}: ComponentDocTemplateProps) {
  return (
    <DocumentationLayout rightNav={rightNavItems}>
      <div className="max-w-5xl mx-auto space-y-16 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 pb-8">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{title}</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset ${statusColors[status.label]}`}>
              {status.label}
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-6">{description}</p>
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Try it out
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View API
            </Button>
          </div>
        </header>

        {/* Import section */}
        <section className="scroll-mt-16">
          <SectionHeader 
            title="Import" 
            description={`Learn how to import and use the ${title} component.`}
          />
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <CodeBlock
              code={importCode}
              language="tsx"
            />
          </div>
        </section>

        {/* Core Variants */}
        <section id="core-variants" className="scroll-mt-16">
          <SectionHeader 
            title="Core Variants" 
            description={`Different styles and variations of the ${title.toLowerCase()} component to suit various use cases.`}
          />
          {renderCoreVariants()}
        </section>

        {/* Compositions */}
        <section id="compositions" className="scroll-mt-16">
          <SectionHeader 
            title={`${title} Groups & Compositions`}
            description={`Combine ${title.toLowerCase()} components to create powerful layouts and patterns.`}
          />
          {renderCompositions()}
        </section>

        {/* Interactive States */}
        {renderInteractiveStates && (
          <section id="interactive-states" className="scroll-mt-16">
            <SectionHeader 
              title="Interactive States" 
              description={`How ${title.toLowerCase()} components respond to user interactions.`}
            />
            {renderInteractiveStates()}
          </section>
        )}

        {/* Best Practices */}
        <section id="best-practices" className="scroll-mt-16">
          <SectionHeader 
            title="Best Practices" 
            description={`Follow these guidelines to create consistent and user-friendly ${title.toLowerCase()} components.`}
          />
          {renderPatterns && renderPatterns()}
        </section>

        {/* Design Tokens */}
        {renderDesignTokens && (
          <section id="design-tokens" className="scroll-mt-16">
            <SectionHeader 
              title="Design Tokens" 
              description={`Design system tokens used by the ${title.toLowerCase()} component.`}
            />
            {renderDesignTokens()}
          </section>
        )}

        {/* Accessibility */}
        {renderAccessibility && (
          <section id="accessibility" className="scroll-mt-16">
            <SectionHeader 
              title="Accessibility" 
              description={`Ensure your ${title.toLowerCase()} components are accessible to all users.`}
            />
            {renderAccessibility()}
          </section>
        )}

        {/* Responsive Behavior */}
        {renderResponsiveBehavior && (
          <section id="responsive" className="scroll-mt-16">
            <SectionHeader 
              title="Responsive Behavior" 
              description={`How the ${title.toLowerCase()} component adapts to different screen sizes.`}
            />
            {renderResponsiveBehavior()}
          </section>
        )}

        {/* Common Use Cases */}
        <section id="use-cases" className="scroll-mt-16">
          <SectionHeader 
            title="Common Use Cases" 
            description={`Pre-configured ${title.toLowerCase()} components for frequently used scenarios.`}
          />
          {renderUseCases()}
        </section>

        {/* Conditionally render the entire Playground section */}
        {renderPlayground && (
          <section id="playground" className="scroll-mt-16">
            <SectionHeader 
              title="Interactive Playground" 
              description={`Experiment with different configurations and see the ${title.toLowerCase()} component in action.`}
            />
            {renderPlayground()}
            {generateCode && (
              <div className="mt-6">
                <SubsectionHeader title="Code" description="Copy and paste this code into your project." />
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <CodeBlock
                    code={generateCode()}
                    language="tsx"
                  />
                </div>
              </div>
            )}
          </section>
        )}

        {/* API Reference */}
        <section id="api" className="scroll-mt-16">
          <SectionHeader 
            title="API Reference" 
            description={`Complete list of props and configurations available for the ${title} component.`}
          />
          {renderApiReference()}
        </section>

        {/* Additional content */}
        {renderAdditionalContent && (
          <section id="additional-content" className="scroll-mt-16">
            <SectionHeader 
              title="Additional Content" 
              description={`Additional content related to the ${title.toLowerCase()} component.`}
            />
            {renderAdditionalContent}
          </section>
        )}
      </div>
    </DocumentationLayout>
  );
} 