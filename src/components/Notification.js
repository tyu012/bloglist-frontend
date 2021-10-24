import React from 'react'

const Notification = ({ contents, isShowing }) => {
  const { text } = contents /* success not implemented */

  if (isShowing) {
    return (
      <div>{text}</div>
    )
  } else {
    return (<div></div>)
  }
}

export default Notification