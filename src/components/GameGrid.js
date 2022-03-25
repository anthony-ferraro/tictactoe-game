import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import GridBox from './GridBox';
const GameGrid = () => {
  const context = useContext(GlobalContext);
  const gameContent = context.gameContent;
  return (
    <div className="game-grid">
      {gameContent.map((content, index) => (<GridBox key={index} id={index} content={content}></GridBox>))}
    </div>
  )
}

export default GameGrid