import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      <span className="ml-3 text-gray-600 dark:text-gray-300">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;