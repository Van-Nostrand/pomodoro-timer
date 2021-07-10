import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from 'prop-types';
import './style.css';

// This component renders an input box that can be fully customized
// for now, pasting and highlighting are not implemented
// input type = text is necessary because type = number gives those stupid arrow buttons
// clicking on an input fires onFocus and then it fires onclick. Important that caret position is updated onFocus
// number input testing is implemented but string input testing is not
export default function SecretInput({ 
  displayMode, 
  elementWidth , 
  elementHeight, 
  handleBlur, 
  passValue, 
  maxInputLength, 
  inputType, 
  inputValue, 
}) {

  const fakeCaretRef = useRef(null);
  const fakeInputRef = useRef(null);
  
  const [ caretBright, setCaretBright ] = useState(true); //controls the carets blink
  const [ caretPosition, setCaretPosition ] = useState(0); //position of the "fake" caret
  const [ inputFocus, setInputFocus ] = useState(false); //when input has focus, this shows the caret
  const [ inputVal , setInputVal ] = useState(inputValue); // not needed?

  const WIDTH = elementWidth;
  const HEIGHT = elementHeight;
  const FONT_SIZE = HEIGHT * 0.87;
  const NUMBER_MODE = inputType === "number";
  const FAKE_DIV_CLASS = NUMBER_MODE ? "fake-input" : "fake-input fake-text-input";


  // if in number mode, keeps the display like a digital clock by adding "0"'s to the front
  const prependWithZeros = (numb) => {
    if (numb.length < maxInputLength) {
      return Array(maxInputLength - numb.length).fill("0").join("") + numb;
    }
    return numb;
  }


  const fakeCaretSpan = (
    <span 
      ref={fakeCaretRef}
      className="fake-caret" 
      key={"fake-caret"} 
      style={{
        opacity: inputFocus ? caretBright ? "1" : "0.3" : "0",
        height: `${HEIGHT * 0.8}rem`
      }}
    /> 
  );


  // handling scroll window and caret position
  // this is tricky af
  useEffect(() => {
    let caretPos = fakeCaretRef.current.getBoundingClientRect().x;
    let inputWidth = fakeInputRef.current.getBoundingClientRect().width;

    // console.log('caretPos is ', caretPos);
    // console.log('inputWidth is ', inputWidth);

    console.log('fakeInputRef.current.scrollLeft is ', fakeInputRef.current.scrollLeft);
    
    if (caretPos > inputWidth) {
      let difference = caretPos - inputWidth;
      let currentScrollPos = fakeInputRef.current.scrollLeft;
      fakeInputRef.current.scrollLeft = currentScrollPos + difference;
    }
    
  })


  // controls the caret blinking effect
  useEffect(() => {
    let BLINKING_CARET;
    
    if(inputFocus){
      BLINKING_CARET = setInterval(() => {
        setCaretBright(oldstate => !oldstate);
      }, 500);
    }else if(!inputFocus){
      clearInterval(BLINKING_CARET);
    }

    return () => clearInterval(BLINKING_CARET);
  }, [inputFocus]);
  

  // sets the caret in the corrent position when the input is clicked
  const handleClick = (e) => {
    setCaretPosition(e.target.selectionStart);
  }


  // manages caret position when using the left and right arrows
  const handleInputKeyDown = (e) => {
    // console.log("key down and selectionStart is ", e.target.selectionStart);
    if(e.keyCode === 39) {
      setCaretPosition(oldPosition => oldPosition + 1);
    } 
    else if (e.keyCode === 37){
      setCaretPosition(oldPosition => oldPosition - 1);
    }
  }


  // converts the user input into a series of spans
  const createInputString = () => {
    const updatedInputValue = NUMBER_MODE ? prependWithZeros(inputValue) : inputValue;

    const arr = displayMode ? 
      <span className="string-char" style={{lineHeight: `${HEIGHT}rem`}}>
        { updatedInputValue } 
      </span>
      : inputFocus ? 
        inputValue.split("").map((char, i) => 
          <span 
            className="string-char" 
            key={`string-char-${i}`}
            style={{
              lineHeight: `${HEIGHT}rem`
            }}
          >
            {char}
          </span>
        )
        :
        updatedInputValue.split("").map((char, i) => 
          <span 
            className="string-char" 
            key={`string-char-${i}`}
            style={{
              lineHeight: `${HEIGHT}rem`
            }}
          >
            {char}
          </span>
        )

    return arr;
  }


  // updates the input value
  const updateValue = (e) => {
    
    // handle input filtering here
    if (NUMBER_MODE) {
      if (/^[0-9]*$/.test(e.target.value)) {
        setCaretPosition(e.target.selectionStart);
        setInputVal(e.target.value);
        passValue(e.target.value);
      }
      else {
        console.log("inside updateValue, number input error")
      }
    }
    else {
      setCaretPosition(e.target.selectionStart);
      setInputVal(e.target.value);
      passValue(e.target.value);
    }
  }


  // set the caret in the corrent position and set the inputFocus flag (which starts the caret blinking cycle)
  const gainFocus = (e) => {
    // console.log('gain focus and e.target.selectionStart is ', e.target.selectionStart);
    setCaretPosition(e.target.selectionStart);
    setInputFocus(true);
  }


  // focus is lost, make the caret invisible
  const loseFocus = (e) => {
    setInputFocus(false);
    handleBlur();
  }


  // input string is split into an array of characters so that the caret, which is a span, can be inserted between characters
  let inputStringArr = createInputString();
  if (!displayMode) inputStringArr.splice(caretPosition, 0, fakeCaretSpan);

  let inputDiv = (
    <div 
      ref={fakeInputRef}
      className={FAKE_DIV_CLASS}
      style={{ 
        padding:`${HEIGHT * 0.1}rem`,
      }}
    >
      { inputStringArr }
    </div>
  );


  return(
    <div 
      className="input-wrapper" 
      style={{
        width: `${WIDTH}rem`,
        height: `${HEIGHT}rem`,
        fontSize: `${FONT_SIZE}rem`,
      }}
    >

      {inputDiv}

      { !displayMode && (
        <input 
          className="real-input" 
          style={{
            width: `${WIDTH}rem`,
            height: `${HEIGHT}rem`,
            lineHeight: `${HEIGHT}rem`,
            fontSize: `${FONT_SIZE}rem`,
          }}
          type="text" 
          value={inputFocus ? inputValue : NUMBER_MODE ? prependWithZeros(inputValue) : inputValue } 
          maxLength={maxInputLength}
          onChange={updateValue}
          onClick={handleClick}
          onKeyDown={handleInputKeyDown}
          onFocus={gainFocus}
          onBlur={loseFocus}
          onPaste={(e) => { e.preventDefault(); return false }} 
        />
      )}
    </div>
  )
};

SecretInput.defaultProps = {
  maxInputLength: 4, 
  elementWidth: 50,
  elementHeight: 20,
  passValue: () => console.log("pass input value to parent here"), 
  inputValue: "NO VAL FOUND", 
  handleBlur: () => console.log("no blur handler?"),
  inputType: 'number',
  displayMode: false
}

SecretInput.propTypes = {
  maxInputLength: PropTypes.number,
  passValue: PropTypes.func,
  inputValue: PropTypes.string,
  handleBlur: PropTypes.func,
  inputType: PropTypes.oneOf(["text", "number"]),
  elementWidth: PropTypes.number,
  elementHeight: PropTypes.number,
  displayMode: PropTypes.bool
}