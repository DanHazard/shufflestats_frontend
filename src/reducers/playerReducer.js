

export default function playerReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return action.user
    case "EDIT_USER":
      return action.user
    default:
      return state
  }
}
