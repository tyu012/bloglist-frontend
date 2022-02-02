import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

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
        <Comments comments={blog.comments} blogId={blog.id} />
      </div>
    </div>
  )
}

const Comments = ({ comments, blogId }) => {
  return (
    <div>
      <h4>comments</h4>
      <CommentForm blogId={blogId} />
      <ul>
        {comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>
    </div>
  )
}

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')

  const handleCommentSubmission = event => {
    event.preventDefault()
    dispatch(addComment(newComment, blogId))
    setNewComment('')
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmission}>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Blog