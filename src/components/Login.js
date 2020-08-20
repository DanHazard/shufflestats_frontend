import React, { Component } from 'react'
import { Header, Form, Button, Grid, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginPlayer } from '../actions/player'
import imgVar from '../images/ShuffleStats_BG.png'
import headerImg from '../images/shuffle_stats_logo.png'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: false,
      redirect: null
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const reqObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }

    fetch('http://localhost:3001/api/v1/auth', reqObj)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.token)
        this.props.loginPlayer(data)
        this.props.history.push('/dashboard')
      }
    })
  }

  render() {
    return (
      <div className="login-container" >
        <img src={imgVar} className='bg' />
        <div className='logo'>
          <img src={headerImg} style={{width: 'auto', height: 'auto'}}/>
        </div>
        <Form onSubmit={this.handleSubmit} style={{width: "25%", margin: "auto", padding: "20px"}}>
          <Header textAlign="center" as='h3'>Please Sign In</Header>
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
              <NavLink className="App-link" to="/sign_up" exact>Sign Up To Create An Account</NavLink>
            </Grid.Column>
          </Grid>
        </Form>
        <br></br>
        <br></br>
      </div>
    )
  }
}

const mapDispatchToProps = {
    loginPlayer
}

export default connect(null, mapDispatchToProps)(Login)



// const payload = {
//   email: this.state.email,
//   password: this.state.password
// }
// console.log(payload)
// this.setState({
//   email: '',
//   password: ''
// })
//   fetch("http://localhost:3001/api/v1/auth", reqObj)
//   .then((resp) => {
//     if(resp.status === 401) {
//       throw Error("The username or password is incorrect")
//     } else {
//       this.setState({
//         redirect: '/'
//       })
//       return resp.json()
//     }
//   })
// .then(data => {
//   localStorage.setItem("token", data.jwt)
//     this.props.loginPlayer(data.user.data.attributes)
//     console.log("A user has logged in")
//   })
// .catch(error => {
//   this.setState({
//       errorMessage: error.message
//     })
//   })
