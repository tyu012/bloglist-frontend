import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [detailed, setDetailed] = useState(false)

  const toggleDetail = event => {
    event.preventDefault()
    setDetailed(!detailed)
  }
  
  const handleLike = async event => {
    event.preventDefault()
    await likeBlog(blog)
  }

  const showWhenDetailed = { display: detailed ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetail}>{detailed ? 'hide' : 'view'}</button>
      </div>

      <div style={showWhenDetailed}>
        {blog.url}
      </div>

      <div style={showWhenDetailed}>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>

      <div style={showWhenDetailed}>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog