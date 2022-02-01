import React from 'react'
import { useSelector } from 'react-redux'

const UserDetailed = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  if (user) {
    return (
      <div>
        <h3>{user.name}</h3>
        <h4>added blogs</h4>
        <ul>
          {blogs
            .filter(b => b.user.id === user.id)
            .map(b => <li key={b.id}>{b.title}</li>)
          }
        </ul>
      </div>
    )
  } else {
    return (
      <p>User ID not found</p>
    )
  }
}

export default UserDetailed