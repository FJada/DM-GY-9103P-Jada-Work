import React from 'react';
import '../MiniBrowserPage.css'; 
import '../styles.css'; 
import BrowserContainer from '../Browser-Container';
import { Link } from 'react-router-dom';

const GameMenu = () => {
  return (
    <BrowserContainer>
          <div className="home-container">
            <div>
              <h1 className="header">Choose Your Game Mode</h1>
              <div className="button-container">
                <Link to="/quiz-usa-states">
                  <button className="start-button">States</button>
                </Link>
                
              </div>
            </div>
          </div>
          </BrowserContainer>
  );
};

export default GameMenu;
