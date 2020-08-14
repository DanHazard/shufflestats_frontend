
export const loginPlayer = player => {
  return {
    type: 'LOGIN_PLAYER',
    player
  }
}

export const currentPlayer = player => {
  return {
    type: 'CURRENT_PLAYER',
    player
  }
}

export const logoutPlayer = () => {
  return {
    type: 'LOGOUT_PLAYER',
  }
}
