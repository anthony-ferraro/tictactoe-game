import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';

const NewGameMenu = () => {
  const context = useContext(GlobalContext);
  const setGameType = context.setGameType
  const playerMarker = context.playerMarker
  const setPlayerMarker = context.setPlayerMarker
  const navigate = useNavigate();

  const startGame = (gameType) => {
    setGameType(gameType);
    console.log(gameType);
    navigate('/game');
  }

  const handleMarkerClick = (marker) => {
    if(playerMarker!==marker) {
      setPlayerMarker(marker)
    }
  }
  useEffect(() => {
    context.restartGame();
  },[]);

  return (
    <div className="new-game-menu">
      <div className="game-icons">
        <svg width="32px" height="32px" className="game-icon icon-x" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path transform="scale(0.5)" d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd"/>
        </svg>
        <svg width="32px" height="32px" className="game-icon icon-o" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path transform="scale(0.5)" d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/>
        </svg>
      </div>
      <div className="grey-border mark-select">
        <p className="heading-XS">Pick Player 1's Mark</p>
        <div className="mark-buttons-wrapper">
            <button onClick={() => handleMarkerClick('x')} className={playerMarker==='o' ? "bg-dark-navy" : "bg-silver"}>
              <svg width="32px" height="32px"className="game-icon" xmlns="http://www.w3.org/2000/svg">
                <path className={playerMarker==='o' ? "fill-silver" : "fill-dark-navy"} transform="scale(0.5)" d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fillRule="evenodd"/>
              </svg>
            </button>
            <button onClick={() => handleMarkerClick('o')} className={playerMarker==='o' ? "bg-silver" : "bg-dark-navy"}>
              <svg width="32px" height="32px" className="game-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path className={playerMarker==='o' ? "fill-dark-navy" : "fill-silver"} transform="scale(0.5)" d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"/>
              </svg>
            </button>
        </div>

        <p className="body">Remember: X Goes First</p>

      </div>
      <div className="new-game-buttons">
        <button onClick={() => startGame('cpu')} className="button-1 heading-S new-game-cpu"><p>NEW GAME (VS CPU)</p></button>
        <button onClick={() => startGame('player')} className="button-2 heading-S new-game-player"><p>NEW GAME (VS PLAYER)</p></button>
      </div>
    </div>
  )
}

export default NewGameMenu;