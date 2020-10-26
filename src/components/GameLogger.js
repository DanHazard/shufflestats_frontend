import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Table, Header, Button, Form, Dropdown, Input } from 'semantic-ui-react'
import { currentPlayer } from '../actions/player'
import { currentGame, updateGame } from '../actions/game'
import { currentMatch, updateMatch } from '../actions/match'
import bgImg from '../images/ShuffleStats_BG.png'
import tnb from '../images/tangs_n_biscuit_white.png'

class GameLogger extends Component {

  constructor() {
    super()
    this.state = {
      showSubmit: false,
      homeTeam: [],
      awayTeam: [],
      homePlayers: [],
      awayPlayers: [],
      home_player_one_id: 0,
      home_player_two_id: 0,
      away_player_one_id: 0,
      away_player_two_id: 0,
      home_player_one_score: 0,
      home_player_two_score: 0,
      away_player_one_score: 0,
      away_player_two_score: 0,
      home_player_one_frames_played: 0,
      home_player_two_frames_played: 0,
      away_player_one_frames_played: 0,
      away_player_two_frames_played: 0,
      match_winner_id: 0,
      match_loser_id: 0,
      yellowScore: 0,
      blackScore: 0,
      currYellowFrame: 1,
      currBlackFrame: 1,
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

  async componentDidMount() {
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
        await fetch('http://localhost:3001/api/v1/current_player', reqObj)
        .then(resp => resp.json())
        .then(data => {
          this.props.currentPlayer(data.player.data.attributes)
        })
        await this.getPlayersData()
        this.getTeamData()
      }
    }

    getPlayersData = () => {
      fetch('http://localhost:3001/players/')
      .then(resp => resp.json())
      .then(players => {
        let homePlayers = players.data.filter(player => player.attributes.team_id === this.props.match.home_team_id)
        let awayPlayers = players.data.filter(player => player.attributes.team_id === this.props.match.away_team_id)
        this.setState({
          homePlayers: homePlayers,
          awayPlayers: awayPlayers
        })
      })
    }

    getTeamData = () => {
      fetch('http://localhost:3001/teams/')
      .then(resp => resp.json())
      .then(teams => {
        let homeTeam = teams.data.filter(team => team.attributes.id === this.props.match.home_team_id)
        let awayTeam = teams.data.filter(team => team.attributes.id === this.props.match.away_team_id)
        this.setState({
          homeTeam: homeTeam[0].attributes.team_name,
          awayTeam: awayTeam[0].attributes.team_name
        })
      })
    }

    onHomePlayerOneSelect = (event, data) => {
      this.setState({
        home_player_one_id: data.value
      })
    }

    onHomePlayerTwoSelect = (event, data) => {
      this.setState({
        home_player_two_id: data.value
      })
    }

    onAwayPlayerOneSelect = (event, data) => {
      this.setState({
        away_player_one_id: data.value
      })
    }

    onAwayPlayerTwoSelect = (event, data) => {
      this.setState({
        away_player_two_id: data.value
      })
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
          home_player_one_score: this.state.yellowInputValue,
          home_player_one_frames_played: 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 2) {
        this.setState({
          yframe2: this.state.yframe1 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          home_player_two_score: this.state.yellowInputValue,
          home_player_two_frames_played: 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 3) {
        this.setState({
          yframe3: this.state.yframe2 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          home_player_one_score: this.state.home_player_one_score + this.state.yellowInputValue,
          home_player_one_frames_played: this.state.home_player_one_frames_played + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 4) {
        this.setState({
          yframe4: this.state.yframe3 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          home_player_two_score: this.state.home_player_two_score + this.state.yellowInputValue,
          home_player_two_frames_played: this.state.home_player_two_frames_played + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 5) {
        this.setState({
          yframe5: this.state.yframe4 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          home_player_one_score: this.state.home_player_one_score + this.state.yellowInputValue,
          home_player_one_frames_played: this.state.home_player_one_frames_played + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 6) {
        this.setState({
          yframe6: this.state.yframe5 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          home_player_two_score: this.state.home_player_two_score + this.state.yellowInputValue,
          home_player_two_frames_played: this.state.home_player_two_frames_played + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 7) {
        this.setState({
          yframe7: this.state.yframe6 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          home_player_one_score: this.state.home_player_one_score + this.state.yellowInputValue,
          home_player_one_frames_played: this.state.home_player_one_frames_played + 1,
          yellowInputValue: ''
        })
      }
      if (this.state.currYellowFrame === 8) {
        this.setState({
          yframe8: this.state.yframe7 + this.state.yellowInputValue,
          yellowScore: this.state.yframe7 + this.state.yellowInputValue,
          currYellowFrame: this.state.currYellowFrame + 1,
          home_player_two_score: this.state.home_player_two_score + this.state.yellowInputValue,
          home_player_two_frames_played: this.state.home_player_two_frames_played + 1,
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
          away_player_one_score: this.state.blackInputValue,
          away_player_one_frames_played: 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 2) {
        this.setState({
          bframe2: this.state.bframe1 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          away_player_two_score: this.state.blackInputValue,
          away_player_two_frames_played: 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 3) {
        this.setState({
          bframe3: this.state.bframe2 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          away_player_one_score: this.state.away_player_one_score + this.state.blackInputValue,
          away_player_one_frames_played: this.state.away_player_one_frames_played + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 4) {
        this.setState({
          bframe4: this.state.bframe3 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          away_player_two_score: this.state.away_player_two_score + this.state.blackInputValue,
          away_player_two_frames_played: this.state.away_player_two_frames_played + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 5) {
        this.setState({
          bframe5: this.state.bframe4 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          away_player_one_score: this.state.away_player_one_score + this.state.blackInputValue,
          away_player_one_frames_played: this.state.away_player_one_frames_played + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 6) {
        this.setState({
          bframe6: this.state.bframe5 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          away_player_two_score: this.state.away_player_two_score + this.state.blackInputValue,
          away_player_two_frames_played: this.state.away_player_two_frames_played + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 7) {
        this.setState({
          bframe7: this.state.bframe6 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          away_player_one_score: this.state.away_player_one_score + this.state.blackInputValue,
          away_player_one_frames_played: this.state.away_player_one_frames_played + 1,
          blackInputValue: ''
        })
      }
      if (this.state.currBlackFrame === 8) {
        this.setState({
          bframe8: this.state.bframe7 + this.state.blackInputValue,
          currBlackFrame: this.state.currBlackFrame + 1,
          away_player_two_score: this.state.away_player_two_score + this.state.blackInputValue,
          away_player_two_frames_played: this.state.away_player_two_frames_played + 1,
          blackScore: this.state.bframe7 + this.state.blackInputValue,
          blackInputValue: ''
        })
      }
    }

    calculateWinner = () => {
      if ( this.state.yellowScore > this.state.blackScore ) {
        this.setState({
          match_winner_id: this.props.match.home_team_id,
          match_loser_id: this.props.match.away_team_id
        })
      } else {
        this.setState({
          match_winner_id: this.props.match.away_team_id,
          match_loser_id: this.props.match.home_team_id
        })
      }
    }

    matchSubmit = () => {
      console.log(this.state)
      const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          home_player_one_id: this.state.home_player_one_id,
          home_player_two_id: this.state.home_player_two_id,
          away_player_one_id: this.state.away_player_one_id,
          away_player_two_id: this.state.away_player_two_id,
          home_player_one_score: this.state.home_player_one_score,
          home_player_two_score: this.state.home_player_two_score,
          away_player_one_score: this.state.away_player_one_score,
          away_player_two_score: this.state.away_player_two_score,
          home_player_one_frames_played: this.state.home_player_one_frames_played,
          home_player_two_frames_played: this.state.home_player_two_frames_played,
          away_player_one_frames_played: this.state.away_player_one_frames_played,
          away_player_two_frames_played: this.state.away_player_two_frames_played,
          match_winner_id: this.state.match_winner_id,
          match_loser_id: this.state.match_loser_id,
          yellowScore: this.state.yellowScore,
          blackScore: this.state.blackScore,
        })
      }
      fetch(`http://localhost:3001/matches/${this.props.match.id}`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.history.push('/dashboard')
      })

    }

    gameDone = () => {
      this.calculateWinner()
      this.setState({
        showSubmit: true
      })
    }

    renderMatchHeader = () => {
      if (this.props.match) {
        return (
          <div className='vsHeader'>
            <div className='vsHome'><h2>{this.state.homeTeam}</h2></div>
            <div className='vsIcon'><img src={tnb} style={{width: '50px', height: '50px'}}/></div>
            <div className='vsAway'><h2>{this.state.awayTeam}</h2></div>
          </div>
        )
      }
    }

    renderGameLogger = () => {
      if (this.props.match) {
        return (

          <div className='game-container'>
            <div className='flex-container' style={{padding:'20px'}}>
              <div className='flex-child'>
                <Form>
                  <Form.Field width={10}>
                  <label>{this.state.homeTeam}</label>
                    <Dropdown
                      placeholder='Choose Opponent'
                      selection
                      onChange={this.onHomePlayerOneSelect}
                      options={this.state.homePlayers.map(player => {
                        return {
                          key: player.attributes.first_name + ' ' + player.attributes.last_name,
                          text: player.attributes.first_name + ' ' + player.attributes.last_name,
                          value: player.attributes.id}
                      })}
                      value={this.state.home_player_one_id}>
                    </Dropdown>
                      <br></br>
                    <Dropdown
                      placeholder='Choose Opponent'
                      selection
                      onChange={this.onHomePlayerTwoSelect}
                      options={this.state.homePlayers.map(player => {
                        return {
                          key: player.attributes.first_name + ' ' + player.attributes.last_name,
                          text: player.attributes.first_name + ' ' + player.attributes.last_name,
                          value: player.attributes.id}
                      })}
                      value={this.state.home_player_two_id}>
                    </Dropdown>
                  </Form.Field>
                </Form>
              </div>
              <div className='flex-child'>
                <Form>
                  <Form.Field width={10}>
                  <label>{this.state.awayTeam}</label>
                    <Dropdown
                      placeholder='Choose Opponent'
                      selection
                      onChange={this.onAwayPlayerOneSelect}
                      options={this.state.awayPlayers.map(player => {
                        return {
                          key: player.attributes.first_name + ' ' + player.attributes.last_name,
                          text: player.attributes.first_name + ' ' + player.attributes.last_name,
                          value: player.attributes.id}
                      })}
                      value={this.state.away_player_one_id}>
                    </Dropdown>
                      <br></br>
                    <Dropdown
                      placeholder='Choose Opponent'
                      selection
                      onChange={this.onAwayPlayerTwoSelect}
                      options={this.state.awayPlayers.map(player => {
                        return {
                          key: player.attributes.first_name + ' ' + player.attributes.last_name,
                          text: player.attributes.first_name + ' ' + player.attributes.last_name,
                          value: player.attributes.id}
                      })}
                      value={this.state.away_player_two_id}>
                    </Dropdown>
                  </Form.Field>
                </Form>
              </div>
            </div>
            <div className='table-container'>
              <Table celled striped color='teal'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign='center' width={3}>Yellow</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' width={3}>Black</Table.HeaderCell>
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
                style={{margin: '0px'}}
                color='yellow'
                content='Update'
                onClick={this.handleYellowClick}
              />
              <Input
                placeholder='Yellow Score'
                value={isNaN(this.state.yellowInputValue) ? '-' : this.state.yellowInputValue}
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
            <div className='log-submit-button'>
              { this.state.showSubmit ?
                <Button
                color='teal'
                content='Submit'
                onClick={this.matchSubmit} /> :
                <Button
                color='teal'
                content='Game Complete?'
                onClick={this.gameDone} />
              }
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
      <img src={bgImg} className='bg' />
      {this.renderMatchHeader()}
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
