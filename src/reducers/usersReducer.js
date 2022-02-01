import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS_LIST':
      return action.data
    default:
      return state
  }
}

const setUsersList = users => {
  return dispatch => {
    dispatch({
      type: 'SET_USERS_LIST',
      data: users
    })
  }
}

export const updateUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch(setUsersList(users))
  }
}

export default usersReducer