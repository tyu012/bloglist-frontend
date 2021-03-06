import blogService from '../services/blogs'
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
    case 'DELETE_BLOG':
      return state
        .filter(b => b.id !== action.data.id)
    case 'ADD_COMMENT':
      return state
        .map(b => b.id === action.data.id
          ? { ...b, comments: b.comments.concat(action.data.comment) }
          : b
        )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = (await blogService.getAll())
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

/**
 * Adds new blog to store only
 */
export const createBlog = blog => {
  return dispatch => {
    dispatch({
      type: 'CREATE_BLOG',
      data: blog
    })
  }
}

/**
 * Adds new blog to backend and store
 */
export const submitBlog = (newBlog, user) => {
  return async dispatch => {
    try {
      const blog = await blogService.submit(newBlog)
      console.log('blog submitted', blog)
      dispatch(createBlog({ ...blog, user: user })) /* Workaround to save user data */

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
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.like(blog)
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

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch(
      showNotification({ success: true, text: `${blog.title} deleted` })
    )
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const addComment = (comment, blogId) => {
  return async dispatch => {
    await blogService.addComment(comment, blogId)
    dispatch(
      showNotification({ success: true, text: `comment ${comment} added` })
    )
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        comment,
        id: blogId,
      }
    })
  }
}

export default blogReducer