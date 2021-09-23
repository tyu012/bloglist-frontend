import React from 'react'
import Blog from './Blog'

const ActiveUserStatus = props => (
  <p>{props.user.name} logged in</p>
)

const BlogList = props => {
  const { user, blogs } = props

  return (
    <div>
      <h2>blogs</h2>
      <ActiveUserStatus user={user} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList