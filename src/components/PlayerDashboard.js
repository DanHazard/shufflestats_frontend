import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Table, Header, Button } from 'semantic-ui-react'
import { currentPlayer } from '../actions/player'



class PlayerDashboard extends Component {

  constructor() {
    super()
    this.state = {
      team: []
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
        this.getTeamData()
      }
    }

    getTeamData = () => {
      fetch(`http://localhost:3001/teams/${this.props.player.team_id}`)
      .then(resp => resp.json())
      .then(teamData => {
        this.setState({
          team: teamData.data.attributes
        })
      })
    }


  renderPlayerData = () => {
    if (this.props.player) {
      return (
        <div>
          <Header textAlign="center" as='h1' style={{padding:"100px"}}>Welcome {this.props.player.first_name}!</Header>
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
                    <Table.HeaderCell>{this.state.team.team_name} Season Stats</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>Wins</Table.Cell>
                    <Table.Cell collapsing>{this.state.team.total_wins}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Losses</Table.Cell>
                    <Table.Cell collapsing>{this.state.team.total_losses}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Total Points Scored</Table.Cell>
                    <Table.Cell collapsing>{this.state.team.total_points_scored}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Total Points Allowed</Table.Cell>
                    <Table.Cell collapsing>{this.state.team.total_points_allowed}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Content>
            </Card>
          </Card.Group>

          <Button
            color='teal'
            size='huge'
            animated='vertical'
            as={NavLink}
            to='/game'>
              <Button.Content visible>Shuffle Icon</Button.Content>
              <Button.Content hidden>Log Game!</Button.Content>
          </Button>

        </div>

      )
    } else {
      console.log('No player found.')
    }
  }

  render() {
    console.log(this.state)
  return(
      <div className='PlayerDashboard' style={{backgroundColor:'ghostwhite', padding:'100px'}}>
        {this.renderPlayerData()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDashboard)
