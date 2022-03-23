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
    }
}

export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const setGameType = (gameType) => {
        dispatch({
            type: "SET_GAME_TYPE",
            payload: gameType
        })
    }
    const placeItem = () => {
        dispatch({
            type: "PLACE_MARKER",
            payload: {
                box: 1,
                marker: 'x'
            }
        })
    }
    return <GlobalContext.Provider value={{
        playerMarker: state.playerMarker,
        gameContent: state.gameContent,
        placeItem: placeItem,
        setGameType: setGameType
    }}>
        {children}
    </GlobalContext.Provider>
}