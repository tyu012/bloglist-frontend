import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ contents, isShowing }) => {
  const text = contents ? contents.text : null

  if (isShowing) {
    return (
      <Alert>{text}</Alert>
    )
  } else {
    return (<div></div>)
  }
}

export default Notification