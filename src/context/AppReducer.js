export default (state, action) => {
    switch(action.type) {
        case "SET_LATEST_MOVE":
            return {
                ...state,
                latestMove: action.payload
            }

        case "SET_PLAYER_MARKER":
            return {
                ...state,
                playerMarker: action.payload
            }
        
        case "SET_GAME_TYPE":
            return {
                ...state,
                gameType: action.payload
            }

        case "PLACE_MARKER":
            if(state.gameContent[action.payload.box] !== '') {
                return state;
            }
            else {
                const newGameContent = state.gameContent;
                newGameContent[action.payload.box] = action.payload.marker;
                return {
                    ...state,
                    gameContent: newGameContent
                }
            }

        case "TOGGLE_TURN":
            const newTurn = (state.turn==='x' ? 'o' : 'x')
            return {
                ...state,
                turn: newTurn
            }

        case "CLEAR_BOARD":
            return {
                ...state,
                gameContent: state.gameContent.map(() => '')
            }
        default:
            return {
                ...state
            }
    }
}