import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Table, Header, Button, Form, Dropdown } from 'semantic-ui-react'
import { currentPlayer } from '../actions/player'

class GameLogger extends Component {

  constructor() {
    super()
    this.state = {
      home: []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (!token) {
      this.props.history.push('/login')
      } else {
        const reqObj  = {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        fetch('http://localhost:3001/api/v1/current_player', reqObj)
        .then(resp => resp.json())
        .then(data => {
          this.props.currentPlayer(data.player.data.attributes)
        })
      }
    }

  render() {
  return (
    <div className='game-container'>
      <div className='flex-container' style={{padding:'20px'}}>
        <div className='flex-child'>
          <Form>
            <Form.Field width={10}>
            <label>Team Name</label>
              <Dropdown
                placeholder='Choose Opponent'
                selection />
                <br></br>
              <Dropdown
                placeholder='Choose Opponent'
                selection />
            </Form.Field>
          </Form>
        </div>
        <div className='flex-child'>
          <Form>
            <Form.Field width={10}>
            <label>Team Name</label>
              <Dropdown
                placeholder='Choose Opponent'
                selection />
                <br></br>
              <Dropdown
                placeholder='Choose Opponent'
                selection />
            </Form.Field>
          </Form>
        </div>
      </div>
      <div className='table-container'>
        <Table celled striped color='teal'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Yellow</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Black</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='center'>
                <Form.Input placeholder='score'>
                </Form.Input>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Form.Input placeholder='score'>
                </Form.Input>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameLogger)
