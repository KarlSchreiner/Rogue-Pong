import React from 'react';
import logo from './logo.svg';
import './App.css';
import PongPaddle from './components/PongPaddle/PongPaddle';
import Ball from './components/Ball/Ball';

function App() {
  return (
    <div className="App">
      <PongPaddle></PongPaddle>
      <Ball></Ball>
    </div>
  );
}

export default App;
