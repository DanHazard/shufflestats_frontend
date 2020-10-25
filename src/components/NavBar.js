import React, { Component } from 'react'
import { Input, Menu, Button, Image } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutPlayer } from '../actions/player'
import logo from '../images/shuffle_stats_logo3.png'
import filler from '../images/navfiller.png'


class NavBar extends Component {
  state = {
    activeItem: ''
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
  }

  handleLogout = () => {
    this.props.logoutPlayer()
    localStorage.removeItem('token')
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu color='teal' inverted pointing>
        <div className='dashboard-icon'>
          <img src={filler} style={{width: '675px', height: '50px'}}/>
        </div>
          <Menu.Item
            as={NavLink} to='/dashboard'
            name='dashboard'
            active={activeItem === 'dashboard'}
            onClick={this.handleItemClick}>
          </Menu.Item>
          <div className='nav-bar-logo'>
            <img src={logo} style={{width: '100px', height: '50px'}}/>
          </div>
          <Menu.Item
            name='game_log'
            active={activeItem === 'game_log'}
            onClick={this.handleItemClick}>
          </Menu.Item>

          <Menu.Item position='right'>
            <Button as={NavLink} to='/login' onClick={this.handleLogout}>Logout</Button>
          </Menu.Item>

        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player
  }
}

const mapDispatchToProps = {
  logoutPlayer
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
