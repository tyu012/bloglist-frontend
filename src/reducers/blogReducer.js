import BlogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = (await BlogService.getAll())
      .sort((b1, b2) => b2.likes - b1.likes)
    dispatch({
      type: 'SET_BLOGS',
      data: blogs,
    })
  }
}

export const setBlogs = blogs => {
  return dispatch => {
    const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes)
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

export default blogReducer