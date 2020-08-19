export const fetchGameSuccess = game => {
  return {
    type: 'FETCH_GAME_SUCCESS',
    game
  }
}

export const createGameSuccess = newGame => {
  return {
    type: 'CREATE_GAME_SUCCESS',
    newGame
  }
}

export const currentGame = currentGame => {
  return {
    type: 'CURRENT_GAME',
    currentGame
  }
}

export const updateGame = updateGame => {
  return {
    type: 'UPDATE_GAME',
    updateGame
  }
}
