import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { currentPlayer } from '../actions/player'
import PlayerDashboard from './PlayerDashboard'
import Login from './Login'
import PlayerSignUp from './PlayerSignUp'
import GameLogger from './GameLogger'
import NavBar from './NavBar'

class Routes extends Component {
  render(){
    return (
      <div>
      <NavBar />
        <Switch>
          <Route path='/dashboard' component={PlayerDashboard} />
          <Route exact path='/sign_up' component={PlayerSignUp} />
          <Route path='/game' component={GameLogger} />
        </Switch>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {player: state.player}
}

const mapDispatchToProps = {
  currentPlayer
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
