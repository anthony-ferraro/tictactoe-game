import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
const GameFooter = () => {
  const context = useContext(GlobalContext)
  const statistics = context.statistics
  const playerMarker = context.playerMarker
  const gameType = context.gameType

  return (
    <div className="game-footer">
      <div className="tracker tracker-x">
        <p className="body">{
          playerMarker==='x' & gameType==='player' ? 'X (P1)' :
          playerMarker==='x' & gameType==='cpu' ? 'X (YOU)' :
          playerMarker==='o' & gameType==='player' ? 'X (P2)' :
          playerMarker==='o' & gameType==='cpu' ? 'X (CPU)' : ''
        }</p>
        <p className="heading-M">{
          playerMarker==='x' ? statistics.player1_wins : statistics.player2_wins
        }</p>
      </div>
      <div className="tracker tracker-ties">
        <p className="body">TIES</p>
        <p className="heading-M">{statistics.ties}</p>
      </div>
      <div className="tracker tracker-o" onClick={context.incrementWins}>
        <p className="body">{
          playerMarker==='x' & gameType==='player' ? 'O (P2)' :
          playerMarker==='x' & gameType==='cpu' ? 'O (CPU)' :
          playerMarker==='o' & gameType==='player' ? 'O (P1)' :
          playerMarker==='o' & gameType==='cpu' ? 'O (YOU)' : ''
        }</p>
        <p className="heading-M">{
          playerMarker==='x' ? statistics.player2_wins : statistics.player1_wins
        }</p>
      </div>
    </div>
  )
}

export default GameFooter