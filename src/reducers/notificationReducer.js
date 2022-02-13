const initialState = {
  contents: {
    text: 'Welcome to Bloglist!',
    success: true,
  },
  isShowing: false,
  timeoutId: null,
}

// WIP: fix the bug for multiple notifications disappearing too soon
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIF':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        contents: action.data.contents,
        isShowing: true,
        timeoutId: action.data.timeoutId,
      }
    case 'HIDE_NOTIF':
      return {
        contents: undefined,
        isShowing: false,
        timeoutId: null,
      }
    default:
      return state
  }
}

export const showNotification = (contents, time = 2500) => {
  return dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, time)
    dispatch({
      type: 'SHOW_NOTIF',
      data: {
        contents,
        timeoutId,
      }
    })
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIF'
  }
}

export default notificationReducer