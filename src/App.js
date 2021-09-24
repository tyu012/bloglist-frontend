import React, { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // authentication
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // blog submission
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem('currentBloglistUser')

    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('user found:', user.username)
    } else {
      console.log('user not found')
    }

    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('currentBloglistUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
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

  const handleBlogSubmission = async event => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      likes: 0,
    }

    try {
      const blog = await blogService.submit(newBlog)
      console.log('blog submitted', blog)
      setBlogs(blogs.concat(blog))
    } catch {
      console.log('blog submission failed')
    }
  }

  return user ?
    (
      <div>
        <h2>Blogs</h2>
        <h3>Create new</h3>
        <NewBlogForm
          handleBlogSubmission={handleBlogSubmission}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
        <BlogList
          user={user}
          blogs={blogs}
          logout={logout}
        />
      </div>
    ) :
    (
      <div>
        <h2>Login</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
}

export default App