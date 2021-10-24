import React from 'react'

const Notification = ({ contents, isShowing }) => {
  const { success, text } = contents

  if (isShowing) {
    return (
      <div>{text}</div>
    )
  } else {
    return (<div></div>)
  }
}

export default Notification