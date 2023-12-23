import React from 'react';
import './MiniBrowserPage.css';

const BrowserContainer = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="border rounded shadow-lg overflow-hidden bg-white mini-browser">
        <div className="bg-gray-200 p-2 flex items-center justify-between browser-bar">
          <div className="buttons flex">
            <div className="button close w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <div className="button minimize w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            <div className="button maximize w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="address-bar">
            <span className="text-xs">https://Geography</span>
          </div>
        </div>
        <div className="browser-content p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BrowserContainer;
