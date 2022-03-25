import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Icon from './Icon';

const GridBox = ({id, content}) => {
    const context = useContext(GlobalContext)
    const turn = context.turn
    const placeItem = context.placeItem
    const toggleTurn = context.toggleTurn
    const latestMove = context.latestMove
    const setLatestMove = context.setLatestMove
    const iconSize = '64px';
    const pointerClass = (content==='') ? 'cursor-pointer' : ''
    const gridBoxClasses = `grid-box ${pointerClass}`
    const returnInnerContent = (content) => {
        switch(content) {
            default:
            case '':
                return <></>
            case 'x':
                return <Icon icon={content} width={iconSize} height={iconSize} fill='#31C3BD'></Icon>
            case 'o':
                return <Icon icon={content} width={iconSize} height={iconSize} fill='#F2B137'></Icon>
        }
    }

    const handleClick = () => {
        if(content==='') {
            placeItem(id, turn)
            setLatestMove(id)
            console.log(latestMove)
            toggleTurn()
        }
    }
    return (
    <div className={gridBoxClasses} onClick={handleClick}>
        {returnInnerContent(content)}
    </div>
    )
}

export default GridBox