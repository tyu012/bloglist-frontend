const initialState = {
  contents: {
    text: 'Welcome to Bloglist!',
    success: true,
  },
  isShowing: true
}

// WIP: fix the bug for multiple notifications disappearing too soon
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIF':
      return {
        contents: action.data,
        isShowing: true,
      }
    case 'HIDE_NOTIF':
      return {
        contents: undefined,
        isShowing: false,
      }
    default:
      return state
  }
}

export const showNotification = (contents, time = 2500) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(hideNotification())
    }, time)
    dispatch({
      type: 'SHOW_NOTIF',
      data: contents,
    })
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIF'
  }
}

export default notificationReducer