import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = props => {
  const {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
  } = props

  return (
    <form onSubmit={handleLogin}>
      <div className="loginField">
        username
        <input
          id="usernameInput"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="loginField">
        password
        <input
          id="passwordInput"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginButton" type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm