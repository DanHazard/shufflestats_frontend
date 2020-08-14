import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginPlayer } from '../actions/player'

const API = "http://localhost:3001/api/v1/users"

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      errorMessage: '',
      redirect: null
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentWillUnmount() {
    this.setState({
      first_name: '',
      last_name: '',
      password: '',
      email: '',
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if ((this.state.first_name) && (this.state.last_name) && (this.state.password) && (this.state.email)) {
      const payload = { player: {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      email: this.state.email
    }}
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

    fetch(API, reqObj)
    .then((resp) => {
      this.setState({
        redirect: '/'
      })
      return resp.json()
    })
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.props.loginPlayer(data.player.data.attributes)
    })
    .catch(error => {
      this.setState({
        errorMessage: error.message
      })
    })
  } else this.setState({
    errorMessage: "No fields can be left blank."
  })}

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }
    return (
      <form id="sign-up" className="ui error form" onSubmit={this.handleSubmit}>
        <h1>Fill Out All Fields To Create Your Account:</h1>
        {this.state.errorMessage ?
        <div className="ui error message">
          <div className="content">
            <p>{this.state.errorMessage}</p>
          </div>
        </div>
        :
        null}
        <div className="field">
          <label>First Name:</label>
          <input onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name} placeholder="first_name" />
        </div>
        <div className="field">
          <label>Last Name:</label>
          <input onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name} placeholder="last_name" />
        </div>
        <div className="field">
          <label>Password:</label>
          <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password" />
        </div>
        <div className="field">
          <label>Email address:</label>
          <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="email" />
        </div>
        <button type="submit" className="ui button">Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = {
  loginPlayer
}

export default connect(null, mapDispatchToProps)(SignUp)
