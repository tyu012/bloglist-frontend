import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => token = `bearer ${newToken}`

const submit = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const like = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const newBlog = {
    ...blog,
    likes: blog.likes + 1,
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return response.data
}

export default { getAll, setToken, submit, like }