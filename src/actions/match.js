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

export const currentMatch = currentMatch => {
  return {
    type: 'CURRENT_MATCH',
    currentMatch
  }
}

export const updateMatch = updateMatch => {
  return {
    type: 'UPDATE_MATCH',
    updateMatch
  }
}
