import React, { useState, useImperativeHandle } from 'react'

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
    <form onSubmit={handleBlogSubmission}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
})

export default NewBlogForm