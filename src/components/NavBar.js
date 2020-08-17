import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import { PlayerDashboard } from './PlayerDashboard'

class NavBar extends Component {
  state = {
    activeItem: 'dashboard'
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
      <Menu pointing>
        <Menu.Item
          as={NavLink} to='/dashboard'
          name='dashboard'
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to='/login'
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        />
      </Menu>
      </div>
    )
  }
}

export default NavBar
