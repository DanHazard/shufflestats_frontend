import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { currentPlayer } from '../actions/player'
import NavBar from './NavBar'
import PlayerDashboard from './PlayerDashboard'
import Login from './Login'
import PlayerSignUp from './PlayerSignUp'
import GameLogger from './GameLogger'
import Routes from './router'
import '../App.css';

class PlayerRankings extends Component {

  render() {
  return (
    <div className="App">
      <Routes />
      <Route exact path='/login' component={Login} />
    </div>
  );
  }
}

const mapStateToProps = state => {
  return {player: state.player}
}

const mapDispatchToProps = {
  currentPlayer
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

github timezone test
