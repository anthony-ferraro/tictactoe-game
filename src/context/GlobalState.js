import { createContext, useReducer, } from "react";
import AppReducer from './AppReducer';

//initial state
const initialState = {
    playerMarker: 'o',
    gameType: 'player',
    gameContent: ['', '', '',  //0 1 2
                  '', '', '',  //3 4 5
                  '', '', ''], //6 7 8
    statistics: {
        player1_wins: 0,
        ties: 0,
        player2_wins: 0,
    },
    latestMove: -1,
    boardState: '',
    turn: 'x',
    modalType: '',
}

export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    //setup
    const setPlayerMarker = (marker) => {
        dispatch({
            type: "SET_PLAYER_MARKER",
            payload: marker
        })
    }
    const setGameType = (gameType) => {
        dispatch({
            type: "SET_GAME_TYPE",
            payload: gameType
        })
    }
    
    //game running
    const handleTurn = (id) => {
        dispatch({
            type: "HANDLE_TURN",
            payload: id
        })
    }

    const handleCpuTurn = () => {
        dispatch({
            type: "CPU_TURN",
        })
    }

    const setModalType = (type) => {
        dispatch({
            type: "SET_MODAL_TYPE",
            payload: type
        })
    }

    //cleanup

    const resetGame = () => {
        dispatch({
            type: "RESET_GAME",
        })
    }
    const restartGame = () => {
        dispatch({
            type: "RESTART_GAME"
        })
    }

    return <GlobalContext.Provider value={{
        gameType: state.gameType,
        playerMarker: state.playerMarker,
        gameContent: state.gameContent,
        boardState: state.boardState,
        turn: state.turn,
        statistics: state.statistics,
        modalType: state.modalType,
        setPlayerMarker: setPlayerMarker,
        setGameType: setGameType,
        restartGame: restartGame,
        handleTurn: handleTurn,
        setModalType: setModalType,
        resetGame: resetGame,
        handleCpuTurn: handleCpuTurn,
        
    }}>
        {children}
    </GlobalContext.Provider>
    }
