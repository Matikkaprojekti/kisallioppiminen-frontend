import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'

export class Header extends Component {
  render() {
    return (
      <div>
        <Navbar className="teal acent-2" brand="logo" right>
          <NavItem> Materiaalit </NavItem>
          <NavItem> Blogi </NavItem>
          <NavItem> Tietoa </NavItem>
          <NavItem> Beta </NavItem>
        </Navbar>
      </div>
    )
  }
}

export default Header
