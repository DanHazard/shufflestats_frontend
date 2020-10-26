import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { loginPlayer } from '../actions/player'
import { Header, Form, Button, Grid, Image } from 'semantic-ui-react'
import imgVar from '../images/ShuffleStats_BG.png'
import headerImg from '../images/shuffle_stats_logo.png'

const API = "http://localhost:3001/api/v1/users"

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      team_name: '',
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
      <div>
      <div className="login-container" >
        <img src={imgVar} className='bg' />
        <div className='logo'>
          <img src={headerImg} style={{width: 'auto', height: 'auto'}}/>
        </div>
        <Form onSubmit={this.handleSubmit} style={{width: "25%", margin: "auto", padding: "20px"}}>
          <Header textAlign="center" as='h3'>Please Sign In</Header>
          <Form.Field>
            <label>First Name</label>
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" />
          </Form.Field>
          <Form.Field>
            <label>Team</label>
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input value={this.state.email} name="email" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" />
          </Form.Field>
          <Grid>
            <Grid.Column textAlign="center">
              <Button type="submit" color="blue">Log In</Button>
              <br></br>
              <br></br>
              <NavLink className="App-link" to="/login" exact>Already Have An Account?  Login Here!</NavLink>
            </Grid.Column>
          </Grid>
        </Form>
        <br></br>
        <br></br>
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loginPlayer
}

export default connect(null, mapDispatchToProps)(SignUp)
