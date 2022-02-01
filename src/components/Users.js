import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(store => store.users)

  useEffect(() => {
    dispatch(updateUsers())
  }, [])

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(u =>
            <User name={u.name} blogs={u.blogs} key={u.id} id={u.id}/>
          )}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ name, blogs, id }) => {
  return (
    <tr>
      <td><Link to={`/users/${id}`}>{name}</Link></td>
      <td>{blogs.length}</td>
    </tr>
  )
}

export default Users