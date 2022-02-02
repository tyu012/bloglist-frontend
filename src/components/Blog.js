import React from 'react'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  if (!blog) {
    return (
      <p>
        Blog ID not found
      </p>
    )
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

  const showToPoster = { display: isPoster() ? '' : 'none' }

  return (
    <div className="detailedBlogInfo">
      <h3>{blog.title}</h3>
      <div>
        <a href={'https://' + blog.url}>{blog.url}</a>
      </div>
      <div className="blogLikes">
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <div style={showToPoster}>
        <button onClick={handleRemove}>remove</button>
      </div>
      <div>
        <Comments comments={blog.comments} />
      </div>
    </div>
  )
}

const Comments = ({ comments }) => {
  return (
    <div>
      <h4>comments</h4>
      <ul>
        {comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog