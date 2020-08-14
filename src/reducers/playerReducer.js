

export default function playerReducer(state = null, action) {
  switch (action.type) {
    case 'LOGIN_PLAYER':
      return action.player
    case 'CURRENT_PLAYER':
      return action.player
    case 'LOGOUT_PLAYER':
      return null
    default:
      return state
  }
}
