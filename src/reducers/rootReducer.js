import { combineReducers } from 'redux'
import playerReducer from './playerReducer'
import teamReducer from './teamReducer'

export default combineReducers({
  playerReducer,
  teamReducer
})
