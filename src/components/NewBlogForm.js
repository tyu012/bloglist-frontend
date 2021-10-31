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
          id="blogFormTitle"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="blogFormAuthor"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="blogFormUrl"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="blogFormSubmit" type="submit">create</button>
    </form>
  )
})

NewBlogForm.displayName = 'NewBlogForm'

export default NewBlogForm