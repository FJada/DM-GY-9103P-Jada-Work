import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home'; 
import Quiz from './Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/quiz" element={<Quiz/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
