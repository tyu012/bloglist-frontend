import blogService from '../services/blogs'
import loginService from '../services/login'
import { initializeBlogs } from './blogReducer'
import { showNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const setUser = newUser => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: newUser
    })
  }
}

export const checkIfUserLoggedIn = () => {
  return dispatch => {
    const currentUserJSON = window.localStorage.getItem('currentBloglistUser')

    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      console.log('user found:', user.username)
    } else {
      console.log('user not found')
    }

    dispatch(initializeBlogs())
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('currentBloglistUser', JSON.stringify(user))

      dispatch(setUser(user))
      blogService.setToken(user.token)
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
}

export const logout = () => {
  return dispatch => {
    dispatch(setUser(null))

    window.localStorage.removeItem('currentBloglistUser')
    dispatch(
      showNotification({ success: true, text: 'logged out' })
    )
  }
}

export default userReducer