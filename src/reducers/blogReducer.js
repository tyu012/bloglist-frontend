import BlogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data
    default:
      return state
  }
}

export const initializeBlogs = async () => {
  const blogs = await BlogService.getAll()
  return dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer