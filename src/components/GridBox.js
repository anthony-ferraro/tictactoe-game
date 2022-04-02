import React, { useState } from 'react'
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Icon from './Icon';

const GridBox = ({id, content}) => {
    const context = useContext(GlobalContext)
    const handleTurn = context.handleTurn
    const turn = context.turn
    const [hovering, setHovering] = useState(false);
    const iconSize = '63.75px';
    // const pointerClass = (content==='' && ((context.gameType==='player') || (context.gameType==='cpu' && turn===context.playerMarker))) ? 'cursor-pointer' : ''
    const pointerClass = 'cursor-pointer'
    const backgroundClass = (content==='X') ? 'bg-light-blue' :
                            (content==='O') ? 'bg-light-yellow' :
                            ''
    const pressedClass = content==='' ? 'grid-box' : 'grid-box-pressed'
    const imageClass = (content==='' && hovering && ((context.gameType==='player') || (context.gameType==='cpu' && turn===context.playerMarker))) ? `bg-${turn}o` : ''
    const gridBoxClasses = `${pressedClass} ${pointerClass} ${backgroundClass} ${imageClass}`

    const returnInnerContent = (content) => {
        switch(content) {
            default:
            case '':
                return <></>
            case 'x':
                return <Icon onClick={handleClick} icon={content} width={iconSize} height={iconSize} fill='#31C3BD'></Icon>
            case 'o':
                return <Icon onClick={handleClick} icon={content} width={iconSize} height={iconSize} fill='#F2B137'></Icon>
            case 'X':
                return <Icon onClick={handleClick} icon={content} width={iconSize} height={iconSize} fill='#1f3641'></Icon>
            case 'O':
                return <Icon onClick={handleClick} icon={content} width={iconSize} height={iconSize} fill='#1f3641'></Icon>
        }
    }

    const handleClick = () => {
        if((content==='') && (context.gameType==='player' || (context.gameType==='cpu' && turn===context.playerMarker))) {
            handleTurn(id)
        }
    }                

    const handleMouseOver = () => {
        setHovering(true)
    }

    const handleMouseOut = () => {
        setHovering(false)
    }

    return (
    <div className={gridBoxClasses} onClick={handleClick} onMouseOver={() => handleMouseOver()} onMouseOut = {() => handleMouseOut()}>
        {returnInnerContent(content)}
    </div>
    )
}

export default GridBox