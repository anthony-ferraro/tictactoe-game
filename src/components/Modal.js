import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState';
import Button from './Button';
import Icon from './Icon';
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';

const Modal = ({ type }) => {
    const [domReady, setDomReady] = useState(false);
    const navigate = useNavigate()
    React.useEffect(() => {
        setDomReady(true);
    },[])
    const context = useContext(GlobalContext)
    const handleCancel = () => {
        context.setModalType("")
    }

    const handleRestart = () => {
        context.restartGame()
    }

    const handleQuit = () => {
        context.resetGame()
        navigate('/')
    }

    const handleReset = () => {
        context.resetGame()
    }
    return domReady  && type==='game-end-menu' ? 
    ReactDOM.createPortal(
    <>
        <div className='modal'>
            <div className="board-state-flavor">
                {
                    context.boardState==='win' && context.turn===context.playerMarker ? <p className="heading-XS color-silver">{"YOU WON!"}</p> :
                    context.boardState==='win' && context.turn!==context.playerMarker ? <p className="heading-XS color-silver">{"OH NO, YOU LOST..."}</p> :
                    context.boardState==='tie' ? null : null
                }
            </div>
            <div className="board-state-announcement">
                {   context.boardState==='win' ?
                    <>
                        <Icon icon={context.turn} width="63.75px" height="63.75px" fill={context.turn==='x' ? "#31C3BD" : "#F2B137"}></Icon>
                        <p className={`heading-L ${context.turn==='x' ? "color-light-blue" : "color-light-yellow"}`}>TAKES THE ROUND</p>
                    </> :
                    context.boardState==='tie' ?
                    <>
                        <p className="heading-L color-silver">ROUND TIED</p>
                    </> :
                    null
                }
            </div>
            <div className="modal-buttons-wrapper">
                <button onClick={handleQuit} 
                className="button-secondary-2">QUIT</button>
                <button onClick={handleRestart} className="button-1">NEXT ROUND</button>
            </div>
        </div>
        <div className="modal-overlay"></div> 
    </>
    ,
    document.querySelector(".portal-modal")
    ) : 
    domReady && type==='game-restart-menu' ?
    ReactDOM.createPortal(
    <>

        <div className='modal'>
        <div className="board-state-announcement">
            <p className="heading-L color-silver">RESTART GAME?</p>
        </div>
            <div className="modal-buttons-wrapper">
                <Button onClick={handleCancel} classes="button-secondary-2" width="139px" height="52px">NO, CANCEL</Button>
                <Button onClick={handleReset} classes="button-1" width="151px" height="52px">YES, RESTART</Button>
            </div>
        </div>
        <div className="modal-overlay"></div>
    </>
    ,
    document.querySelector(".portal-modal")
    ) : null
}

export default Modal