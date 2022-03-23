import React from 'react';
import GameHeader from './GameHeader';
import GameGrid from './GameGrid';
import GameFooter from './GameFooter';

const Game = () => {
  return (
    <div className="game-container">
      <GameHeader></GameHeader>
      <GameGrid></GameGrid>
      <GameFooter></GameFooter>
    </div>
  )
}

export default Game