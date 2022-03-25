import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
const GameFooter = () => {
  const context = useContext(GlobalContext)
  const statistics = context.statistics
  const playerMarker = context.playerMarker
  const gameType = context.gameType

  const displayText = {
    xtext: '',
    xstats: 0,
    otext: '',
    ostats: 0
  }

  if(playerMarker==='x') {
    displayText.xstats = statistics.player1_wins
    displayText.ostats = statistics.player2_wins
    if(gameType==='player') {
      displayText.xtext = 'X (P1)'
      displayText.otext = 'O (P2)'
    }
    else {
      displayText.xtext = 'X (YOU)'
      displayText.otext = 'O (CPU)'
    }
  }
  else {
    displayText.ostats = statistics.player1_wins
    displayText.xstats = statistics.player2_wins
    if(gameType==='player') {
      displayText.otext = 'O (P1)'
      displayText.xtext = 'X (P2)'
    }
    else {
      displayText.otext = 'O (YOU)'
      displayText.xtext = 'X (CPU)'
    }
  }
  
  return (
    <div className="game-footer">
      <div className="tracker tracker-x">
        <p className="body">{displayText.xtext}</p>
        <p className="heading-M">{displayText.xstats}</p>
      </div>
      <div className="tracker tracker-ties">
        <p className="body">TIES</p>
        <p className="heading-M">{statistics.ties}</p>
      </div>
      <div className="tracker tracker-o">
        <p className="body">{displayText.otext}</p>
        <p className="heading-M">{displayText.ostats}</p>
      </div>
    </div>
  )
}

export default GameFooter