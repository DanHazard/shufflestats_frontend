import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Table, Header, Button, Form, Dropdown, Input } from 'semantic-ui-react'
import { currentPlayer } from '../actions/player'
import { currentGame, updateGame } from '../actions/game'
import { currentMatch, updateMatch } from '../actions/match'

class GameLogger extends Component {

  constructor() {
    super()
    this.state = {
      currYellowFrame: 1,
      currBlackFrame: 1,
      yellowScore: 0,
      blackScore: 0,
      yellowInputValue: '',
      blackInputValue: '',
      yframe1: 0,
      yframe2: 0,
      yframe3: 0,
      yframe4: 0,
      yframe5: 0,
      yframe6: 0,
      yframe7: 0,
      yframe8: 0,
      bframe1: 0,
      bframe2: 0,
      bframe3: 0,
      bframe4: 0,
      bframe5: 0,
      bframe6: 0,
      bframe7: 0,
      bframe8: 0,
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

    updateYellowInputValue = (event, data) => {
      this.setState({
        yellowInputValue: parseInt(data.value)
      })

    }

    handleYellowClick = (event) => {
      if (this.state.currYellowFrame === 1) {
        this.setState({
          yframe1: this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 2) {
        this.setState({
          yframe2: this.state.yframe1 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 3) {
        this.setState({
          yframe3: this.state.yframe2 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 4) {
        this.setState({
          yframe4: this.state.yframe3 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 5) {
        this.setState({
          yframe5: this.state.yframe4 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 6) {
        this.setState({
          yframe6: this.state.yframe5 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 7) {
        this.setState({
          yframe7: this.state.yframe6 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 8) {
        this.setState({
          yframe8: this.state.yframe7 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          yellowInputValue: ''
        })
      }
    }

    updateBlackInputValue = (event, data) => {
      this.setState({
        blackInputValue: parseInt(data.value)
      })
    }

    handleBlackClick = (event) => {
      if (this.state.currBlackFrame === 1) {
        this.setState({
          bframe1: this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 2) {
        this.setState({
          bframe2: this.state.bframe1 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 3) {
        this.setState({
          bframe3: this.state.bframe2 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 4) {
        this.setState({
          bframe4: this.state.bframe3 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 5) {
        this.setState({
          bframe5: this.state.bframe4 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 6) {
        this.setState({
          bframe6: this.state.bframe5 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 7) {
        this.setState({
          bframe7: this.state.bframe6 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 8) {
        this.setState({
          bframe8: this.state.bframe7 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          blackInputValue: ''
        })
      }
    }

    checkState = () => {
      console.log(this.state)
    }


    renderGameLogger = () => {
      if (this.props.match) {
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
                      {this.state.yframe1}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe1}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {this.state.yframe2}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe2}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {this.state.yframe3}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe3}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {this.state.yframe4}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe4}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {this.state.yframe5}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe5}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {this.state.yframe6}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe6}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {this.state.yframe7}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe7}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {this.state.yframe8}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {this.state.bframe8}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <div className='game-input-container'>
              <Button
                color='yellow'
                content='Update'
                onClick={this.handleYellowClick}
              />
              <Input
                placeholder='Yellow Score'
                value={this.state.yellowInputValue}
                onChange={this.updateYellowInputValue}
              />
              <Input
                placeholder='Black Score'
                value={this.state.blackInputValue}
                onChange={this.updateBlackInputValue}
              />
              <Button
                color='black'
                content='Update'
                onClick={this.handleBlackClick}
              />
            </div>
            <div>
              <Button content='test' onClick={this.checkState}/>
            </div>
          </div>
        )
      } else {
        console.log('did not work')
      }
    }



  render() {
  return (
    <div className='logger-container'>
      {this.renderGameLogger()}
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    game: state.game,
    match: state.match
  }
}

const mapDispatchToProps = {
  currentPlayer,
  currentGame,
  updateGame,
  currentMatch,
  updateMatch
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLogger)
