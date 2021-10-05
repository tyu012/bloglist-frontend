import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailed, setDetailed] = useState(false)

  const toggleDetail = event => {
    event.preventDefault()
    setDetailed(!detailed)
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
        <button onClick={event => event.preventDefault()}>like</button>
      </div>

      <div style={showWhenDetailed}>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog