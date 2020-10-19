import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import AnswerQuiz from './pages/AnswerQuiz';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/">
          <AnswerQuiz />
        </Route>
      </Router>
    </div>
  );
}

export default App;
