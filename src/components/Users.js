import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsers } from '../reducers/usersReducer'

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
            <User name={u.name} blogs={u.blogs} key={u.id}/>
          )}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ name, blogs }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogs.length}</td>
    </tr>
  )
}

export default Users