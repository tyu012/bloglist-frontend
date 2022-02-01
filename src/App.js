import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserDetailed from './components/UserDetailed'
import Blog from './components/Blog'
import Navbar from './components/Navbar'

import { useSelector, useDispatch } from 'react-redux'

import {
  likeBlog, deleteBlog, submitBlog
} from './reducers/blogReducer'
import {
  checkIfUserLoggedIn, login, logout
} from './reducers/userReducer'

import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'


const App = () => {
  // blogs
  const blogs = useSelector(state => state.blogs)
  // authentication
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  // notification state
  const notification = useSelector(state => state.notification)
  // all users
  const users = useSelector(state => state.users)
  // redux dispatch
  const dispatch = useDispatch()

  const newBlogFormTogglable = useRef()
  const newBlogForm = useRef()

  const matchingUserId = useRouteMatch('/users/:id')
  const userDetailedId = matchingUserId
    ? users.find(u => u.id === matchingUserId.params.id)
    : null
  const matchingBlogId = useRouteMatch('/blogs/:id')
  const matchingBlog = matchingBlogId
    ? blogs.find(b => b.id === matchingBlogId.params.id)
    : null

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
        <Navbar user={user} logout={handleLogout} />
        <h2>Blogs</h2>

        <Notification {...notification} />
        <Switch>
          <Route path="/users/:id">
            <UserDetailed user={userDetailedId} />
          </Route>

          <Route path="/users">
            <h3>Users</h3>
            <Users />
          </Route>

          <Route path="/blogs/:id">
            <Blog
              blog={matchingBlog}
              user={user}
              likeBlog={handleLikeBlog}
              removeblog={handleRemoveBlog}
            />
          </Route>

          <Route path="/">
            <Togglable buttonLabel="create new blog" ref={newBlogFormTogglable}>
              <h3>Create new</h3>
              <NewBlogForm submitBlog={handleSubmitBlog} ref={newBlogForm} />
            </Togglable>
            <BlogList
              blogs={blogs}
            />
          </Route>
        </Switch>
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