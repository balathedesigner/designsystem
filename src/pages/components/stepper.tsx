import React from 'react';
import { ComponentDocTemplate } from '@/components/shared/ComponentDocTemplate';
import { Stepper } from '@/components/ui/Stepper';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

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
        { id: 'compositions', label: 'Stepper Compositions' },
        { id: 'interactive-states', label: 'Interactive States' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'design-tokens', label: 'Design Tokens' },
        { id: 'accessibility', label: 'Accessibility' },
        { id: 'responsive', label: 'Responsive Behavior' }
      ]
    },
    {
      id: 'use-cases',
      label: 'Common Use Cases'
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

export default function StepperPage() {
  const renderCoreVariants = () => {
    return (
      <div className="flex flex-col space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Default Horizontal</h3>
          <Stepper steps={steps} currentStep={1} completedSteps={[0]} />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Alternative Label</h3>
          <Stepper
            steps={steps}
            currentStep={2}
            variant="alternativeLabel"
            completedSteps={[0, 1]}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">With Status</h3>
          <Stepper
            steps={steps}
            currentStep={2}
            completedSteps={[0]}
            errorSteps={[1]}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Vertical</h3>
          <Stepper
            steps={steps}
            currentStep={1}
            orientation="vertical"
            completedSteps={[0]}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Non-Linear</h3>
          <Stepper
            steps={steps}
            currentStep={1}
            type="nonLinear"
            completedSteps={[0, 2]}
          />
        </div>
      </div>
    );
  };

  const renderPlayground = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
    const [errorSteps, setErrorSteps] = React.useState<number[]>([]);
    const [orientation, setOrientation] = React.useState<'horizontal' | 'vertical'>('horizontal');
    const [variant, setVariant] = React.useState<'default' | 'alternativeLabel'>('default');
    const [type, setType] = React.useState<'linear' | 'nonLinear'>('linear');
    const [steps, setSteps] = React.useState(['Step 1', 'Step 2', 'Step 3', 'Step 4']);
    const [showDescriptions, setShowDescriptions] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);
    const [previewMode, setPreviewMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const generateCode = () => {
      const props = [];
      
      if (orientation !== 'horizontal') {
        props.push(`orientation="${orientation}"`);
      }
      
      if (variant !== 'default') {
        props.push(`variant="${variant}"`);
      }
      
      if (type !== 'linear') {
        props.push(`type="${type}"`);
      }
      
      if (completedSteps.length > 0) {
        props.push(`completedSteps={[${completedSteps.join(', ')}]}`);
      }
      
      if (errorSteps.length > 0) {
        props.push(`errorSteps={[${errorSteps.join(', ')}]}`);
      }
      
      const propsString = props.length > 0 ? ' ' + props.join('\n        ') : '';
      
      return `import { Stepper } from '@/components/ui/Stepper';

export default function Example() {
  const steps = ${JSON.stringify(steps, null, 2)};
  
  return (
    <Stepper
      steps={steps}
      currentStep={${currentStep}}${propsString}
    />
  );
}`;
    };

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCompletedSteps([...completedSteps, currentStep]);
        setCurrentStep(currentStep + 1);
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setCompletedSteps(completedSteps.filter(step => step !== currentStep - 1));
      }
    };

    const handleError = () => {
      setErrorSteps([...errorSteps, currentStep]);
    };

    const handleReset = () => {
      setCurrentStep(0);
      setCompletedSteps([]);
      setErrorSteps([]);
    };

    const handleAddStep = () => {
      setSteps([...steps, `Step ${steps.length + 1}`]);
    };

    const handleRemoveStep = () => {
      if (steps.length > 2) {
        setSteps(steps.slice(0, -1));
        if (currentStep >= steps.length - 1) {
          setCurrentStep(steps.length - 2);
        }
      }
    };

    const handleStepLabelChange = (index: number, newLabel: string) => {
      const newSteps = [...steps];
      newSteps[index] = newLabel;
      setSteps(newSteps);
    };

    return (
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Orientation</label>
              <select
                className="w-full p-2 border rounded"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as 'horizontal' | 'vertical')}
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Variant</label>
              <select
                className="w-full p-2 border rounded"
                value={variant}
                onChange={(e) => setVariant(e.target.value as 'default' | 'alternativeLabel')}
              >
                <option value="default">Default</option>
                <option value="alternativeLabel">Alternative Label</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                className="w-full p-2 border rounded"
                value={type}
                onChange={(e) => setType(e.target.value as 'linear' | 'nonLinear')}
              >
                <option value="linear">Linear</option>
                <option value="nonLinear">Non-Linear</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preview Mode</label>
              <select
                className="w-full p-2 border rounded"
                value={previewMode}
                onChange={(e) => setPreviewMode(e.target.value as 'desktop' | 'tablet' | 'mobile')}
              >
                <option value="desktop">Desktop</option>
                <option value="tablet">Tablet</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDescriptions}
                  onChange={(e) => setShowDescriptions(e.target.checked)}
                />
                <span className="text-sm">Show Descriptions</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="text-sm">Dark Mode</span>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button onClick={handleBack} disabled={currentStep === 0}>Back</Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>Next</Button>
            <Button onClick={handleError} variant="destructive">Trigger Error</Button>
            <Button onClick={handleReset} variant="outlined">Reset</Button>
            <Button onClick={handleAddStep} variant="outlined">Add Step</Button>
            <Button onClick={handleRemoveStep} variant="outlined" disabled={steps.length <= 2}>Remove Step</Button>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepLabelChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                {showDescriptions && (
                  <input
                    type="text"
                    placeholder="Step description"
                    className="flex-1 p-2 border rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={cn(
          "p-4 rounded-lg border",
          darkMode ? "bg-gray-900 text-white" : "bg-white",
          previewMode === 'mobile' ? "max-w-sm mx-auto" : previewMode === 'tablet' ? "max-w-2xl mx-auto" : ""
        )}>
          <Stepper
            steps={steps}
            currentStep={currentStep}
            orientation={orientation}
            variant={variant}
            type={type}
            completedSteps={completedSteps}
            errorSteps={errorSteps}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Code</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{generateCode()}</code>
              </pre>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => navigator.clipboard.writeText(generateCode())}
                variant="outlined"
              >
                Copy Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompositions = () => {
    const horizontalSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
    const verticalSteps = ['Account', 'Profile', 'Review', 'Complete'];
    const alternativeLabelSteps = ['Select Plan', 'Payment', 'Confirmation'];

    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Horizontal Stepper</h3>
          <Stepper steps={horizontalSteps} currentStep={1} completedSteps={[0]} />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Vertical Stepper</h3>
          <Stepper
            steps={verticalSteps}
            currentStep={2}
            orientation="vertical"
            completedSteps={[0, 1]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Alternative Label</h3>
          <Stepper
            steps={alternativeLabelSteps}
            currentStep={1}
            variant="alternativeLabel"
            completedSteps={[0]}
          />
        </div>
      </div>
    );
  };

  const renderUseCases = () => {
    const linearSteps = ['Cart', 'Shipping', 'Payment', 'Review'];
    const nonLinearSteps = ['Basic Info', 'Contact', 'Social', 'Review'];
    const errorSteps = ['Upload', 'Process', 'Verify', 'Complete'];

    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Linear Stepper</h3>
          <Stepper
            steps={linearSteps}
            currentStep={2}
            type="linear"
            completedSteps={[0, 1]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Non-Linear Stepper</h3>
          <Stepper
            steps={nonLinearSteps}
            currentStep={1}
            type="nonLinear"
            completedSteps={[0, 2]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Error State</h3>
          <Stepper
            steps={errorSteps}
            currentStep={2}
            completedSteps={[0]}
            errorSteps={[1]}
          />
        </div>
      </div>
    );
  };

  const renderApiReference = () => {
    return (
      <div className="prose max-w-none">
        <h3>Props</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>steps</td>
              <td>string[]</td>
              <td>required</td>
              <td>Array of step labels to display</td>
            </tr>
            <tr>
              <td>currentStep</td>
              <td>number</td>
              <td>required</td>
              <td>Index of the current active step</td>
            </tr>
            <tr>
              <td>orientation</td>
              <td>'horizontal' | 'vertical'</td>
              <td>'horizontal'</td>
              <td>Direction of the stepper</td>
            </tr>
            <tr>
              <td>variant</td>
              <td>'default' | 'alternativeLabel'</td>
              <td>'default'</td>
              <td>Visual style variant of the stepper</td>
            </tr>
            <tr>
              <td>type</td>
              <td>'linear' | 'nonLinear'</td>
              <td>'linear'</td>
              <td>Whether steps must be completed in sequence</td>
            </tr>
            <tr>
              <td>completedSteps</td>
              <td>number[]</td>
              <td>[]</td>
              <td>Array of completed step indices</td>
            </tr>
            <tr>
              <td>errorSteps</td>
              <td>number[]</td>
              <td>[]</td>
              <td>Array of error step indices</td>
            </tr>
            <tr>
              <td>className</td>
              <td>string</td>
              <td>undefined</td>
              <td>Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderDesignTokens = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold mb-4">Design Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Colors</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-500"></div>
                <span className="text-sm">Primary: blue-500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-green-500"></div>
                <span className="text-sm">Success: green-500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-red-500"></div>
                <span className="text-sm">Error: red-500</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Spacing</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200"></div>
                <span className="text-sm">Step Size: 1rem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gray-200"></div>
                <span className="text-sm">Connector Length: 1.5rem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDocTemplate
      title="Stepper"
      description="A progress indicator that guides users through a multi-step process."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Stepper } from '@/components/ui/Stepper';"
      rightNavItems={{
        items: [
          { id: 'playground', label: 'Playground' },
          { id: 'core-variants', label: 'Core Variants' },
          { id: 'compositions', label: 'Compositions' },
          { id: 'use-cases', label: 'Use Cases' },
          { id: 'api-reference', label: 'API Reference' }
        ]
      }}
      renderPlayground={renderPlayground}
      renderCoreVariants={renderCoreVariants}
      renderCompositions={renderCompositions}
      renderUseCases={renderUseCases}
      renderApiReference={renderApiReference}
      renderDesignTokens={renderDesignTokens}
    />
  );
} 