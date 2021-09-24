import React, { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

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
  const [notification, setNotification] = useState({})
  const [showingNotification, setShowingNotification] = useState(false)

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

  const showNotification = contents => {
    setNotification(contents)
    setShowingNotification(true)
    setTimeout(() => {
      setShowingNotification(false)
      setNotification({})
    }, 2500)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('currentBloglistUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      showNotification({ success: true, text: `logged in as ${user.username}` })
    } catch (exception) {
      console.log('login failed')
      showNotification({ success: false, text: 'wrong username or password' })
    }
  }

  const logout = event => {
    event.preventDefault()

    setUser(null)
    setTitle('')
    setAuthor('')
    setUrl('')
    
    window.localStorage.removeItem('currentBloglistUser')
    showNotification({ success: true, text: 'logged out' })
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
      
      if (blog) {
        showNotification({ success: true, text: `${blog.title} added` })
      } else {
        showNotification({ success: false, text: 'blog creation failed' })
      }
    } catch {
      console.log('blog submission failed')
      showNotification({ success: false, text: 'blog creation failed' })
    }
  }

  return user ?
    (
      <div>
        <h2>Blogs</h2>
        <Notification contents={notification} isShowing={showingNotification} />
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
        <Notification contents={notification} isShowing={showingNotification} />
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