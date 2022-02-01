import React from 'react'
import { Link } from 'react-router-dom'

const ActiveUserStatus = ({ user, logout }) => (
  <div style={{ display: 'inline' }}>
    {user.name} logged in<button onClick={logout}>logout</button>
  </div>
)

const Navbar = ({ user, logout }) => {
  const navbarStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: '10px',
    backgroundColor: 'lightgrey',
  }
  const navbarItemStyle = {
    display: 'inline',
    padding: '5px',
  }
  return (
    <ul style={navbarStyle}>
      <li style={navbarItemStyle}>
        <Link to="/blogs">blogs</Link>
      </li>
      <li style={navbarItemStyle}>
        <Link to="/users">users</Link>
      </li>
      <li style={navbarItemStyle}>
        <ActiveUserStatus user={user} logout={logout} />
      </li>
    </ul>
  )
}

export default Navbar