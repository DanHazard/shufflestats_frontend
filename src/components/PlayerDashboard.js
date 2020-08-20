import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Table, Header, Button, Dropdown, Image } from 'semantic-ui-react'
import { currentPlayer } from '../actions/player'
import { createGameSuccess } from '../actions/game'
import { createMatchSuccess } from '../actions/match'
import bgImg from '../images/ShuffleStats_BG.png'
import buttonImg from '../images/Shufflegram_vector2.svg'



class PlayerDashboard extends Component {

  constructor() {
    super()
    this.state = {
      playerTeam: [],
      opponents: [],
      opponentValue: 0
    }
  }

  componentDidMount() {
    this.checkAuthToken()
  }


  checkAuthToken = async () => {
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
        await this.getPlayerTeamData()
        this.getTeamData()
      }
    }

  getPlayerTeamData = () => {
    fetch(`http://localhost:3001/teams/${this.props.player.team_id}`)
    .then(resp => resp.json())
    .then(teamData => {
      this.setState({
        playerTeam: teamData.data.attributes
      })
    })
  }

  getTeamData = () => {
    fetch('http://localhost:3001/teams/')
    .then(resp => resp.json())
    .then(teams => {
      let opponents = teams.data.filter(team => team.attributes.id !== this.props.player.team_id)
      this.setState({
        teams: teams.data,
        opponents: opponents
      })
    })
  }

  onOpponentSelect = (event, data) => {
    this.setState({
      opponentValue: data.value
    })
  }

  handleClick = (event) => {
    const reqObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        home_team_id: this.state.playerTeam.id,
        away_team_id: this.state.opponentValue
      })
    }
    fetch('http://localhost:3001/games', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data.data.attributes)
      this.props.createGameSuccess(data.data.attributes)
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          game_id: data.data.attributes.id,
          home_team_id: data.data.attributes.home_team_id,
          away_team_id: data.data.attributes.away_team_id
        })
      }
      fetch('http://localhost:3001/matches', reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.createMatchSuccess(data.data.attributes)
        this.props.history.push('/game')
      })
    })
  }

  renderPlayerData = () => {
    if (this.props.player) {
      console.log(this.state)
      return (
        <div>
          <div className='log-header'>
          <Header textAlign="center" as='h1'>Welcome {this.props.player.first_name}!</Header>
          </div>
          <Card.Group centered style={{margin: 'auto'}}>
            <Card color='teal'>
              <Card.Content>
                <Table celled striped color='teal'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{this.props.player.first_name}'s Season Stats</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>Frames Played</Table.Cell>
                      <Table.Cell collapsing>{this.props.player.frames_played}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Total Points Scored</Table.Cell>
                      <Table.Cell collapsing>{this.props.player.total_points_scored}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Total Points Allowed</Table.Cell>
                      <Table.Cell collapsing>{this.props.player.total_points_allowed}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Points Scored Per Frame</Table.Cell>
                      <Table.Cell collapsing>{this.props.player.points_per_frame}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Points Allowed Per Frame</Table.Cell>
                      <Table.Cell collapsing>{this.props.player.points_against_per_frame}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Hammer Rating</Table.Cell>
                      <Table.Cell collapsing>{this.props.player.hammer_rating}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Card.Content>
            </Card>
            <Card color='teal'>
              <Card.Content>
              <Table celled striped color='teal' verticalAlign='middle'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>{this.state.playerTeam.team_name} Season Stats</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>Wins</Table.Cell>
                    <Table.Cell collapsing>{this.state.playerTeam.total_wins}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Losses</Table.Cell>
                    <Table.Cell collapsing>{this.state.playerTeam.total_losses}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Total Points Scored</Table.Cell>
                    <Table.Cell collapsing>{this.state.playerTeam.total_points_scored}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Total Points Allowed</Table.Cell>
                    <Table.Cell collapsing>{this.state.playerTeam.total_points_allowed}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Content>
            </Card>
          </Card.Group>

          <div className='game-log-container'>
            <Dropdown
              placeholder='Choose Opponent'
              selection
              onChange={this.onOpponentSelect}
              options={this.state.opponents.map(opponents => {
                return {
                  key: opponents.attributes.team_name,
                  text: opponents.attributes.team_name,
                  value: opponents.attributes.id}
              })}
              value={this.state.opponentName}>
            </Dropdown>
            <Button
              style={{margin:'20px'}}
              color='teal'
              size='huge'
              animated='fade'
              onClick={this.handleClick}>
                <Button.Content visible>
                  <Image src={buttonImg} style={{height: '40px', width: '40px'}}/>
                </Button.Content>
                <Button.Content hidden>Log Game!</Button.Content>
            </Button>
          </div>

        </div>

      )
    } else {
      console.log('No player found.')
    }
  }

  render() {
  return(
      <div className='PlayerDashboard'>
        <img src={bgImg} className='bg' />
        {this.renderPlayerData()}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    player: state.player
  }
}

const mapDispatchToProps = {
  currentPlayer,
  createGameSuccess,
  createMatchSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDashboard)
