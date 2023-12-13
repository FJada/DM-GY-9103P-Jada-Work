import React from 'react';
import './MiniBrowserPage.css'; // Import the new CSS file

const BrowserContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="mini-browser">
        <div className="browser-bar">
        <div className="buttons">
            <div className="button close"></div>
            <div className="button minimize"></div>
            <div className="button maximize"></div>
          </div>
          <div className="address-bar">
            <span>https://Geography</span>
          </div>
        </div>
        <div className="browser-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BrowserContainer;
