import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
  name: 'John User',
  username: 'john',
}

const blog = {
  title: 'Test Blog',
  author: 'John Doe',
  url: 'https://example.com',
  likes: 5,
  user: user,
}

test('renders blog title and author only by default', () => {
  const component = render(
    <Blog
      blog={blog}
      likeBlog={() => {}}
      removeBlog={() => {}}
      user={user}
    />
  )

  expect(component.container).toHaveTextContent('Test Blog')
  expect(component.container).toHaveTextContent('John Doe')
})

test('clicking `view` shows url and likes', () => {
  const component = render(
    <Blog
      blog={blog}
      likeBlog={() => {}}
      removeBlog={() => {}}
      user={user}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()

  const detailedBlogInfo = component.container.querySelector('.detailedBlogInfo')
  expect(detailedBlogInfo).not.toHaveStyle('display: none;')
  expect(detailedBlogInfo).toHaveTextContent('https://example.com')
  expect(detailedBlogInfo).toHaveTextContent('likes 5')
})

test('clicking `like` twice registers likes', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog
      blog={blog}
      likeBlog={mockHandler}
      removeBlog={() => {}}
      user={user}
    />
  )

  const view = component.getByText('view')
  fireEvent.click(view)

  const like = component.getByText('like')
  fireEvent.click(like)
  fireEvent.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})