export default (state, action) => {
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
    switch(action.type) {
        //default
        default:
            return {
                ...state
            }
        case "CPU_TURN":
            //set newGameContent equal to state.gameContent but with
            let emptyList = state.gameContent.map((item, index) => {
                return item==='' ? index : null
            }).filter(id => id!==null)
            
            let cpuTurnList = state.gameContent.map((content, index) => {
                return content===state.turn ? index : null
            }).filter(id => id!==null)

            let playerTurnList = state.gameContent.map((content, index) => {
                return content===(state.turn==='x' ? 'o' : 'x') ? index : null
            }).filter(id => id!==null)
            
            const blockLose = possibleWins.map((win) => {
                let possibleLossMoves = win.map((id) => {return playerTurnList.includes(id) ? id : null})
                let loseId = (possibleLossMoves.filter(id => id===null).length === 1 ? possibleLossMoves.findIndex(id => id===null) : null)
                return loseId !== null ? win[loseId] : null
            }).filter(id => id!==null).filter(id => state.gameContent[id]==='')

            const moveWin = possibleWins.map((win) => {
                let possibleLossMoves = win.map((id) => {return cpuTurnList.includes(id) ? id : null})
                let loseId = (possibleLossMoves.filter(id => id===null).length === 1 ? possibleLossMoves.findIndex(id => id===null) : null)
                return loseId !== null ? win[loseId] : null
            }).filter(id => id!==null).filter(id => state.gameContent[id]==='')
            
            const cpuMove = moveWin.length>0 ? moveWin[Math.floor(Math.random() * moveWin.length)] :
                            blockLose.length>0 ? blockLose[Math.floor(Math.random() * blockLose.length)] :
                            emptyList[Math.floor(Math.random() * emptyList.length)]
            
            //set newGameContent equal to state.gameContent but with state.gameContent[cpuMove] replaced with state.turn
            let cpuNewGameContent = state.gameContent
            cpuNewGameContent[cpuMove] = state.turn
            cpuTurnList.push(cpuMove)

            const cpuWinList = possibleWins.filter((win) => {
                return win.every((id) => {
                    return cpuTurnList.includes(id)
                })
            })
            
            cpuNewGameContent = cpuNewGameContent.map((content, index) => {
                return cpuWinList.flat().includes(index) ? content.toUpperCase() : content
            })


            const cpuNewBoardState = cpuWinList.length===0 && cpuNewGameContent.every(content => content!=='') ? 'tie' :
            cpuWinList.length===0 && !cpuNewGameContent.every(content => content!=='') ? '' : 'win'

            return {
                ...state,
                gameContent: cpuNewGameContent,
                turn: state.turn === "x" ? "o" : "x",
                latestMove: cpuMove,
                boardState: cpuNewBoardState,
                modalType: cpuNewBoardState==='win' || cpuNewBoardState==='tie' ? 'game-end-menu' : '',
                statistics: {
                    ...state.statistics,
                    player1_wins: cpuNewBoardState==='win' && state.turn===state.playerMarker ? state.statistics.player1_wins+1 : state.statistics.player1_wins,
                    ties: cpuNewBoardState==='tie' ? state.statistics.ties+1 : state.statistics.ties,
                    player2_wins: cpuNewBoardState==='win' && state.turn!==state.playerMarker ? state.statistics.player2_wins+1 : state.statistics.player2_wins
                }
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
            
            //create turnList which is the list of ids in newGameContent that contain state.turn
            let turnList = newGameContent.map((content, index) => {
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