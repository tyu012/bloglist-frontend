import BlogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const byDescendingLikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return state.concat(action.data)
    case 'LIKE_BLOG':
      return state
        .map(b => b.id === action.data.id
          ? { ...b, likes: b.likes + 1 }
          : b
        )
        .sort(byDescendingLikes)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = (await BlogService.getAll())
      .sort(byDescendingLikes)
    dispatch({
      type: 'SET_BLOGS',
      data: blogs,
    })
  }
}

export const setBlogs = blogs => {
  return dispatch => {
    const sortedBlogs = blogs.sort(byDescendingLikes)
    dispatch({
      type: 'SET_BLOGS',
      data: sortedBlogs
    })
  }
}

export const createBlog = blog => {
  return dispatch => {
    dispatch({
      type: 'CREATE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await BlogService.like(blog)
    if (!likedBlog) {
      dispatch(
        showNotification({ success: false, text: `${blog.title} does not exist` })
      )
    } else {
      dispatch(
        showNotification({ success: true, text: `${blog.title} liked` })
      )
    }
    dispatch({
      type: 'LIKE_BLOG',
      data: blog
    })
  }
}

export default blogReducer