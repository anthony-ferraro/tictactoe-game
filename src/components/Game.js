import React from 'react';
import GameHeader from './GameHeader';
import GameGrid from './GameGrid';
import GameFooter from './GameFooter';
import { useContext } from 'react';
import Modal from './Modal';
import { GlobalContext } from '../context/GlobalState';

const Game = () => {
  const context = useContext(GlobalContext)
  return (
    <>
      <div className="game-container">
        <GameHeader></GameHeader>
        <GameGrid></GameGrid>
        <GameFooter></GameFooter>
      </div>
      <div className="portal-modal">
        <Modal type={context.modalType}></Modal>
      </div>
    </>

  )
}

export default Game