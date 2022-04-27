import React, { useState, useEffect, useRef } from 'react'

export default function FocusTest () {

  const divref = useRef(null)

  const [ hasFocus, setHasFocus ] = useState(false)
  const [ focusWasSet, setFocusWasSet ] = useState(false)

  useEffect(() => {
    if (hasFocus && !focusWasSet) {
      giveFocus()
      setFocusWasSet(true)
    }
    else if (!hasFocus) {
      setFocusWasSet(false)
      giveBlur()
    }
  },)


  const stylesheet = {
    width: '500px',
    height: '150px',
    margin: '3rem',
    border: '3px solid yellow',
    position: 'relative',
    fontSize: '35px',
    textAlign: 'center',
    lineHeight: '150px'
  }

  const handleClick = (e) => {
    setHasFocus(true)
  }

  const handleFocusEvent = (e) => {
    console.log('focus EVENT!')
  }

  const handleBlurEvent = (e) => {
    console.log('blurEvent!')
    setHasFocus(false)
  }

  const giveFocus = () => {
    divref.current.focus()
  }

  const giveBlur = () => {
    divref.current.blur()
  }


  return (
    <div
      ref={divref}
      className="focus-test-div"
      style={stylesheet}
      tabIndex="0"
      onClick={handleClick}
      onFocus={handleFocusEvent}
      onBlur={handleBlurEvent}
    >
      CLICK ME TO TEST STUFF
    </div>
  )
}
