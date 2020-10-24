import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import AnswerQuiz from './pages/AnswerQuiz';
import UsernameDetailPage from './pages/UsernameDetailPage';
import CreateNewQuizPage from './pages/CreateNewQuizPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/quiz/add/:username">
          <AnswerQuiz />
        </Route>
        <Route path="/users/:username" component={UsernameDetailPage} />
        <Route path="/quiz/add" exact component={CreateNewQuizPage} />
      </Router>
    </div>
  );
}

export default App;
