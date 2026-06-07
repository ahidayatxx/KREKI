import React from 'react';

interface DataCardProps {
  title: string;
  data: any[];
  emptyMessage?: string;
  renderItem: (item: any, index: number) => React.ReactNode;
  icon?: React.ReactNode;
}

export const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  data, 
  emptyMessage = 'None reported', 
  renderItem,
  icon 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        {icon && <div className="mr-3 text-gray-600">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          {data.length}
        </span>
      </div>
      
      {data.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="border-l-4 border-gray-200 pl-4">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};