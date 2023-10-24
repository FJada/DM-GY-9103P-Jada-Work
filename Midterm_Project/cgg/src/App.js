import React from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import HomePage from './home-page';
import Quiz from './Quiz';

function App() {
  return (
    <div className="App">
      <Quiz/>
    </div>
  );
}
export default App;