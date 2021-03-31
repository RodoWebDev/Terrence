import React from 'react';
import './App.css';
import { Routes } from 'utils/routes';
import { BrowserRouter as Router } from 'react-router-dom'
import CycleContextContainer, { CycleContext } from 'contexts/CycleContext';

function App() {
  return (
    <Router>
      <CycleContextContainer>
        <CycleContext.Consumer>
          {(cycleContext) => (
            <Routes />
          )}
        </CycleContext.Consumer>
      </CycleContextContainer>
    </Router>
  );
}

export default App;
