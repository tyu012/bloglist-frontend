import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('NewBlogForm calls received event handler with correct details', () => {
  const submitBlog = jest.fn()
  const component = render(
    <NewBlogForm submitBlog={submitBlog} />
  )

  const title = component.container.querySelector('#blogFormTitle')
  const author = component.container.querySelector('#blogFormAuthor')
  const url = component.container.querySelector('#blogFormUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Test Blog' }
  })
  fireEvent.change(author, {
    target: { value: 'John Doe' }
  })
  fireEvent.change(url, {
    target: { value: 'https://example.com' }
  })

  fireEvent.submit(form)

  expect(submitBlog.mock.calls).toHaveLength(1)
  expect(submitBlog.mock.calls[0][0]).toEqual({
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 0
  })
})