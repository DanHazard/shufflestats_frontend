import { combineReducers } from 'redux'
import playerReducer from './playerReducer'
import teamReducer from './teamReducer'
import gameReducer from './gameReducer'
import matchReducer from './matchReducer'

export default combineReducers({
  player: playerReducer,
  team: teamReducer,
  game: gameReducer,
  match: matchReducer
})
