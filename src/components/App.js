import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {loginPlayer } from '../actions/player'
import '../App.css';

class App extends Component {

  state = {
    redirect: null
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (!token) {
      this.setState({
        redirect: '/login'
      })} else {
        const reqObj  = {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        fetch('http://localhost:3001/api/v1/current_player', reqObj)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          this.props.loginPlayer(data.player.data.attributes)
        })
      }
    }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
  return (
    <div className="App">
      A user is logged in.
    </div>
  );
  }
}

const mapStateToProps = state => {
  return {player: state.player}
}

const mapDispatchToProps = {
  loginPlayer
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
