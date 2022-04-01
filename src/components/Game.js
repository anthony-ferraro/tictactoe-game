import React from 'react';
import GameHeader from './GameHeader';
import GameGrid from './GameGrid';
import GameFooter from './GameFooter';
import { useContext, useEffect } from 'react';
import Modal from './Modal';
import { GlobalContext } from '../context/GlobalState';

const Game = () => {
  const context = useContext(GlobalContext)

  useEffect(() => {
    document.title = "Tic Tac Toe"
  }, [])

  useEffect(() => {
    if((context.gameType==='cpu' && context.modalType=='' && context.turn!==context.playerMarker)) {
      setTimeout(() => {
        context.handleCpuTurn()
      }, 500)
    }
  }, [context.latestMove])

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