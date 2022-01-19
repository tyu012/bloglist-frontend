import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

import Togglable from './components/Togglable'

import { useSelector, useDispatch } from 'react-redux'

import {
  likeBlog, deleteBlog, submitBlog
} from './reducers/blogReducer'
import {
  checkIfUserLoggedIn, login, logout
} from './reducers/userReducer'

const App = () => {
  // blogs
  const blogs = useSelector(state => state.blogs)
  // authentication
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  // notification state
  const notification = useSelector(state => state.notification)
  // redux dispatch
  const dispatch = useDispatch()

  const newBlogFormTogglable = useRef()
  const newBlogForm = useRef()

  useEffect(() => {
    dispatch(checkIfUserLoggedIn())
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
    newBlogForm.current.setTitle('')
    newBlogForm.current.setAuthor('')
    newBlogForm.current.setUrl('')
  }

  const handleSubmitBlog = async blog => {
    dispatch(submitBlog(blog, user))
    newBlogForm.current.setTitle('')
    newBlogForm.current.setAuthor('')
    newBlogForm.current.setUrl('')
  }

  const handleLikeBlog = async blog => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = async blog => {
    dispatch(deleteBlog(blog))
  }


  return user ?
    (
      <div>
        <h2>Blogs</h2>
        <Notification {...notification} />
        <Togglable buttonLabel="create new blog" ref={newBlogFormTogglable}>
          <h3>Create new</h3>
          <NewBlogForm submitBlog={handleSubmitBlog} ref={newBlogForm} />
        </Togglable>
        <BlogList
          user={user}
          blogs={blogs}
          logout={handleLogout}
          likeBlog={handleLikeBlog}
          removeBlog={handleRemoveBlog}
        />
      </div>
    ) :
    (
      <div>
        <h2>Login</h2>
        <Notification {...notification} />
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