export default (state, action) => {
    switch(action.type) {
        //default
        default:
            return {
                ...state
            }
        //setup
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
        case "SET_MODAL_TYPE":
            return {
                ...state,
                modalType: action.payload
            }
        case "HANDLE_TURN":
            const newLatestMove = action.payload
            let newGameContent = state.gameContent.map((content, index) => {
                return index===newLatestMove ? state.turn : content
            })
            const possibleWins = [
                //rows
                [0,1,2],
                [3,4,5],
                [6,7,8],
                //columns
                [0,3,6],
                [1,4,7],
                [2,5,8],
                //diagonals
                [0,4,8],
                [2,4,6]
            ]
            //create turnList which is the list of ids in newGameContent that contain state.turn
            const turnList = newGameContent.map((content, index) => {
                return content===state.turn ? index : null
            }).filter(id => id!==null)

            const winList = possibleWins.filter((win) => {
                return win.every((id) => {
                    return turnList.includes(id)
                })
            })
            
            newGameContent = newGameContent.map((content, index) => {
                return winList.flat().includes(index) ? content.toUpperCase() : content
            })


            const newBoardState = winList.length===0 && newGameContent.every(content => content!=='') ? 'tie' :
            winList.length===0 && !newGameContent.every(content => content!=='') ? '' : 'win'

            return {
                ...state,
                turn: (newBoardState==='') ? (state.turn==='x' ? 'o' : 'x') : state.turn,
                gameContent: newGameContent,
                latestMove: newLatestMove,
                boardState: newBoardState,
                modalType: newBoardState==='win' || newBoardState==='tie' ? 'game-end-menu' : '',
                statistics: {
                    ...state.statistics,
                    player1_wins: newBoardState==='win' && state.turn===state.playerMarker ? state.statistics.player1_wins+1 : state.statistics.player1_wins,
                    ties: newBoardState==='tie' ? state.statistics.ties+1 : state.statistics.ties,
                    player2_wins: newBoardState==='win' && state.turn!==state.playerMarker ? state.statistics.player2_wins+1 : state.statistics.player2_wins
                }

            }

        //cleanup

        case "RESET_GAME":
            return {
                ...state,
                gameContent: ['','','','','','','','',''],
                latestMove: -1,
                boardState: '',
                modalType: '',
                statistics: {
                    player1_wins: 0,
                    player2_wins: 0,
                    ties: 0
                }
            }
        case "RESTART_GAME":
            return {
                ...state,
                modalType: '',
                turn: 'x',
                gameContent: state.gameContent.map(() => '')
            }
    }
}