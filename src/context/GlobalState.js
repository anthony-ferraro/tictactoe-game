import { createContext, useReducer } from "react";
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
        player2_wins: 0
    },
    latestMove: 0,
    turn: 'x'
}

export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const setLatestMove = (id) => {
        dispatch({
            type: "SET_LATEST_MOVE",
            payload: id
        })
    }
    const toggleTurn = () => {
        dispatch({
            type: "TOGGLE_TURN"
        })
    }
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
    const placeItem = (id, marker) => {
        dispatch({
            type: "PLACE_MARKER",
            payload: {
                box: id,
                marker: marker
            }
        })
    }

    const clearBoard = () => {
        dispatch({
            type: "CLEAR_BOARD"
        })
    }
    return <GlobalContext.Provider value={{
        gameType: state.gameType,
        playerMarker: state.playerMarker,
        gameContent: state.gameContent,
        turn: state.turn,
        statistics: state.statistics,
        latestMove: state.latestMove,
        setPlayerMarker: setPlayerMarker,
        placeItem: placeItem,
        setGameType: setGameType,
        toggleTurn: toggleTurn,
        setLatestMove: setLatestMove
        

    }}>
        {children}
    </GlobalContext.Provider>
}