export default (state, action) => {
    switch(action.type) {
        default: return state;
        case "SET_GAME_TYPE":
            return {
                ...state,
                gameType: action.payload.gameType
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

    }
}