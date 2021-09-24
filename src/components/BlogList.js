import React from 'react'
import Blog from './Blog'

const ActiveUserStatus = ({ user, logout }) => (
  <div>
    <p>{user.name} logged in</p>
    <button onClick={logout}>logout</button>
  </div>
)

const BlogList = props => {
  const { user, blogs, logout } = props

  return (
    <div>
      <h2>blogs</h2>
      <ActiveUserStatus
        user={user}
        logout={logout}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList