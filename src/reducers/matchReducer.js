export default function matchReducer(state = null, action) {
  switch (action.type) {
    case 'FETCH_MATCH_SUCCESS':
      return action.match
    case 'CREATE_MATCH_SUCCESS':
      return action.newMatch
    case 'CURRENT_MATCH':
      return action.currentMatch
    case 'UPDATE_MATCH':
      return action.updateMatch
    default:
      return state
  }
}
