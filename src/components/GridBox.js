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
    const pointerClass = (content==='') ? 'cursor-pointer' : ''
    const backgroundClass = (content==='X') ? 'bg-light-blue' :
                            (content==='O') ? 'bg-light-yellow' :
                            ''
    const gridBoxClasses = `grid-box ${pointerClass} ${backgroundClass}`
    const returnInnerContent = (content) => {
        switch(content) {
            default:
            case '':
                if(hovering) {
                    return <Icon icon={`${turn}-border`} width={iconSize} height={iconSize} fill={turn==='x' ? '#31C3BD' : '#F2B137'}></Icon>
                }
                else {
                    return <></>
                }
            case 'x':
                return <Icon icon={content} width={iconSize} height={iconSize} fill='#31C3BD'></Icon>
            case 'o':
                return <Icon icon={content} width={iconSize} height={iconSize} fill='#F2B137'></Icon>
            case 'X':
                return <Icon icon={content} width={iconSize} height={iconSize} fill='#1f3641'></Icon>
            case 'O':
                return <Icon icon={content} width={iconSize} height={iconSize} fill='#1f3641'></Icon>
        }
    }

    const handleClick = () => {
        if(content==='') {
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