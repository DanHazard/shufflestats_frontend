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
