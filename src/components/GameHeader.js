import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Icon from './Icon'
const GameHeader = () => {
  const context = useContext(GlobalContext);
  const turn = context.turn
  return (
    <div className="game-header">
      <div className="svg-wrapper">
        <Icon icon='x' width='32px' height='32px' fill='#31C3BD'></Icon>
        <Icon icon='o' width='32px' height='32px' fill='#F2B137'></Icon>
      </div>
      <div className="grey-border turn-tracker">
        {turn==='x' ? <Icon icon='x' width='20px' height='20px' fill='#A8BFC9'></Icon>
        :<Icon icon='o' width='20px' height='20px' fill='#A8BFC9'></Icon>}
        <p className="heading-XS">TURN</p>
      </div>
      <button className="button-square reset-button">
        <Icon icon='reset' width='20px' height='20px' fill='#1F3641'></Icon>
      </button>
    </div>
  )
}

export default GameHeader