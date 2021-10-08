import React from 'react'
import Blog from './Blog'

const ActiveUserStatus = ({ user, logout }) => (
  <div>
    <p>{user.name} logged in<button onClick={logout}>logout</button></p>
  </div>
)

const BlogList = props => {
  const { user, blogs, logout, likeBlog } = props

  return (
    <div>
      <ActiveUserStatus
        user={user}
        logout={logout}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      )}
    </div>
  )
}

export default BlogList