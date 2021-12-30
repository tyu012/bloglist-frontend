import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  console.log(blog)
  const [detailed, setDetailed] = useState(false)

  const toggleDetail = event => {
    event.preventDefault()
    setDetailed(!detailed)
  }

  const handleLike = async event => {
    event.preventDefault()
    await likeBlog(blog)
  }

  const handleRemove = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog)
    }
  }

  const isPoster = () => user.username === blog.user.username

  const showWhenDetailed = { display: detailed ? '' : 'none' }
  const showToPosterWhenDetailed = { display: detailed && isPoster() ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="basicBlogInfo">
        {blog.title} {blog.author}
        <button onClick={toggleDetail}>{detailed ? 'hide' : 'view'}</button>
      </div>

      <div style={showWhenDetailed} className="detailedBlogInfo">
        <div>
          {blog.url}
        </div>

        <div className="blogLikes">
          likes <span>{blog.likes}</span>
          <button onClick={handleLike}>like</button>
        </div>

        <div>
          {blog.user.name}
        </div>

        <div style={showToPosterWhenDetailed}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog