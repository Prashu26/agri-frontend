import React from 'react';

const Loader = ({ fullScreen = true }) => {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-8'}`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-sm font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
