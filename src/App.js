import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

import { useSelector, useDispatch } from 'react-redux'

import { showNotification } from './reducers/notificationReducer'
import {
  initializeBlogs, createBlog, likeBlog, deleteBlog
} from './reducers/blogReducer'

const App = () => {
  // blogs
  // const [_blogs, setBlogsFinal] = useState([]) /* do not directly use setBlogsFinal */
  // _blogs
  const blogs = useSelector(state => state.blogs)
  // authentication
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // notification state
  const notification = useSelector(state => state.notification)
  // redux dispatch
  const dispatch = useDispatch()

  // const setBlogs = blogArray => {
  //   setBlogsFinal(blogArray.sort((b1, b2) => b2.likes - b1.likes))
  // }

  const newBlogFormTogglable = useRef()
  const newBlogForm = useRef()

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

    dispatch(initializeBlogs())
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
      dispatch(
        showNotification({ success: true, text: `logged in as ${user.username}` })
      )
    } catch (exception) {
      console.log('login failed')
      dispatch(
        showNotification({ success: false, text: 'wrong username or password' })
      )
    }
  }

  const logout = event => {
    event.preventDefault()

    setUser(null)
    newBlogForm.current.setTitle('')
    newBlogForm.current.setAuthor('')
    newBlogForm.current.setUrl('')

    window.localStorage.removeItem('currentBloglistUser')
    dispatch(
      showNotification({ success: true, text: 'logged out' })
    )
  }

  const handleSubmitBlog = async newBlog => {
    try {
      const blog = await blogService.submit(newBlog)
      console.log('blog submitted', blog)
      dispatch(
        dispatch(createBlog({ ...blog, user: user })) /* Workaround to save user data */
      )

      if (blog) {
        dispatch(
          showNotification({ success: true, text: `${blog.title} added` })
        )
      } else {
        dispatch(
          showNotification({ success: false, text: 'blog creation failed' })
        )
      }
    } catch {
      console.log('blog submission failed')
      dispatch(
        showNotification({ success: false, text: 'blog creation failed' })
      )
    }
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
          logout={logout}
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