import React from 'react'

interface SubsectionHeaderProps {
  title: string;
  description?: string;
}

export const SubsectionHeader: React.FC<SubsectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  )
}

export default SubsectionHeader; 