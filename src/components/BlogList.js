import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogList = props => {
  const { blogs } = props

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList