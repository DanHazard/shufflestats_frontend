export default function matchReducer(state = null, action) {
  switch (action.type) {
    case 'FETCH_MATCH_SUCCESS':
      return action.match
    case 'CREATE_MATCH_SUCCESS':
      return action.match
    default:
      return state
  }
}
