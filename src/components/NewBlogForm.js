import React, { useState, useImperativeHandle } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = React.forwardRef((props, ref) => {
  const {
    submitBlog,
  } = props

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmission = event => {
    event.preventDefault()
    submitBlog({
      title,
      author,
      url,
      likes: 0,
    })
  }

  useImperativeHandle(ref, () => {
    return { title, setTitle, author, setAuthor, url, setUrl }
  })

  return (
    <Form onSubmit={handleBlogSubmission}>
      <Form.Group>
        <div>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="blogFormTitle"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="blogFormAuthor"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="blogFormUrl"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="primary" id="blogFormSubmit" type="submit">create</Button>
      </Form.Group>
    </Form>
  )
})

NewBlogForm.displayName = 'NewBlogForm'

export default NewBlogForm