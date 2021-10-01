import './App.css';
import React from 'react';

import Header from './components/Header';
import CalculatorGrid from './components/CalculatorGrid';


function App() {
  return (
    <div className="App">
      <Header title="La Calculadora"/>     
      <CalculatorGrid /> 
    </div>
  );
}

export default App;
