export default function gameReducer(state = null, action) {
  switch (action.type) {
    case 'FETCH_GAME_SUCCESS':
      return action.game
    case 'CREATE_GAME_SUCCESS':
      return action.game
    default:
      return state
  }
}
