import React from 'react';
import ReactDOM from 'react-dom/client';
import GameBoard from './components/GameBoard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameBoard />
  </React.StrictMode>
);
