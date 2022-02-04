import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar as BSNavbar } from 'react-bootstrap'

const Navbar = ({ user, logout }) => {
  return (
    <BSNavbar bg="light" expand="lg">
      <Nav.Link as={NavLink} to="/blogs">
        blogs
      </Nav.Link>
      <Nav.Link as={NavLink} to="/users">
        users
      </Nav.Link>
      <Nav.Item>
        {user.name} logged in
      </Nav.Item>
      <Nav.Link onClick={logout}>
        logout
      </Nav.Link>
    </BSNavbar>
  )
}

export default Navbar