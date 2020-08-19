export default function gameReducer(state = null, action) {
  switch (action.type) {
    case 'FETCH_GAME_SUCCESS':
      return action.game
    case 'CREATE_GAME_SUCCESS':
      return action.newGame
    case 'CURRENT_GAME':
      return action.currentGame
    case 'UPDATE_GAME':
      return action.updateGame
    default:
      return state
  }
}
