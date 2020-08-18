export const fetchMatchSuccess = match => {
  return {
    type: 'FETCH_MATCH_SUCCESS',
    match
  }
}

export const createMatchSuccess = newMatch => {
  return {
    type: 'CREATE_MATCH_SUCCESS',
    newMatch
  }
}
