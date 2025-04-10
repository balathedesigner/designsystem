import React from 'react';

export interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">{title}</h2>
      {description && (
        <p className="text-base text-gray-600">{description}</p>
      )}
    </div>
  );
} 