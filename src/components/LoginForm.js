import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = props => {
  const {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
  } = props

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <div className="loginField">
          <Form.Label>username</Form.Label>
          <Form.Control
            id="usernameInput"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="loginField">
          <Form.Label>password</Form.Label>
          <Form.Control
            id="passwordInput"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </Form.Group>
      <Button variant="primary" id="loginButton" type="submit">login</Button>
    </Form>
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