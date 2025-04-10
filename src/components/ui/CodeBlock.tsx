import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ children, language = 'tsx', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className={cn(
        'p-4 bg-gray-900 text-gray-100 rounded-md overflow-auto font-mono text-sm', 
        className
      )}>
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
} 