import QuizModule from './Quiz.js';
import React from 'react';
import {STATES} from '../data/USA-states-data.js';
import BrowserContainer from '../Browser-Container';
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const UsaStatesQuiz = () => {
  return (
    <BrowserContainer>
     <div className="home-container">
    <QuizModule
      geoUrl={geoUrl}
      countries={STATES}
      />
      </div>
      </BrowserContainer>
  );
};
export default UsaStatesQuiz;

