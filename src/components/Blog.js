import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button, Table, Form } from 'react-bootstrap'
import {
  likeBlog, deleteBlog
} from '../reducers/blogReducer'
import { useHistory } from 'react-router'

const Blog = ({ blog, user, }) => {
  if (!blog) {
    return (
      <p>
        Blog ID not found
      </p>
    )
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLike = async event => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleRemove = event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
    history.push('/')
  }

  const isPoster = () => user.username === blog.user.username

  const showToPoster = { display: isPoster() ? '' : 'none' }

  return (
    <div className="detailedBlogInfo">
      <h3>{blog.title}</h3>
      <Table hover>
        <tbody>
          <tr>
            <td colSpan={2}>
              <a href={'https://' + blog.url}>{blog.url}</a>
            </td>
          </tr>
          <tr className="blogLikes">
            <td>
              {blog.likes} likes
            </td>
            <td>
              <Button onClick={handleLike}>like</Button>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              added by {blog.user.name}
            </td>
          </tr>
        </tbody>
      </Table>
      <div style={showToPoster}>
        <Button variant="danger" onClick={handleRemove}>remove</Button>
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
      <Form onSubmit={handleCommentSubmission}>
        <Form.Group>
          <Form.Control
            type="text"
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
          />
          <Button variant="primary" type="submit">submit</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Blog