import React from 'react'
import { Link } from 'react-router-dom'

const ActiveUserStatus = ({ user, logout }) => (
  <div>
    <p>{user.name} logged in<button onClick={logout}>logout</button></p>
  </div>
)

const BlogList = props => {
  const { user, blogs, logout } = props

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <ActiveUserStatus
        user={user}
        logout={logout}
      />

      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )}
    </div>
  )
}

export default BlogList