import React from 'react'

const Notification = ({ contents, isShowing }) => {
  const text = contents ? contents.text : null

  if (isShowing) {
    return (
      <div>{text}</div>
    )
  } else {
    return (<div></div>)
  }
}

export default Notification