import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home'; 
import UsaStatesQuiz from './pages/Quiz-Usa-States.js';
import  GameMenu from './pages/Game-Menu';

// import Route from './components/Route'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/quiz-usa-states" element={<UsaStatesQuiz/>} /> 
        <Route path="/game-mode" element={<GameMenu/>} />

        </Routes>
    </Router>
  );
}

export default App;
