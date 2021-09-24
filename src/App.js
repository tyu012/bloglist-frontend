import React, { useState, useEffect } from 'react'

// import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem('currentBloglistUser')
    
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON)
      setUser(user)
      console.log('user found:', user.username)
    } else {
      console.log('user not found')
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('currentBloglistUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('login failed')
    }
  }

  const logout = event => {
    event.preventDefault()
    console.log('logout')

    setUser(null)
    window.localStorage.removeItem('currentBloglistUser')
  }

  return user ? 
    (
      <BlogList
        user={user}
        blogs={blogs}
        logout={logout}
      />
    ) :
    (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    )
}

export default App