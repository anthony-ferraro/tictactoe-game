import React from 'react'

const Button = ({children, onClick, classes, width, height}) => {
  return (
    <button onClick={onClick} className={classes} style={{width: width, height: height}}>{children}</button>    
  )
}

export default Button