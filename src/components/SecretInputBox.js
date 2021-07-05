import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import moment from 'moment';

// This allows for deeper customization of a text input box, including the caret
// for now, I've disabled pasting into the input
// highlighting with the mouse is not possible right now
// spaces are not properly represented
// input type = text is necessary because type = number gives those stupid arrow buttons

// clicking on an input fires onFocus and then it fires onclick
export default function SecretInputBox({ maxInputLength, passValue, inputValue, handleBlur, inputType }) {

  
  const [ caretBright, setCaretBright ] = useState(true); //controls the carets blink
  const [ caretPosition, setCaretPosition ] = useState(0); //position of the "fake" caret
  const [ inputFocus, setInputFocus ] = useState(false); //when input has focus, this shows the caret
  const [ inputVal , setInputVal ] = useState('0'); 

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
  

  // actions from the user that need handling:
  // - the user clicks the input (done)
  // - the user types (done)
  // - the user uses the arrow keys (done)
  // - the user clicks and drags with their mouse

  // the user clicks the input
  const handleClick = (e) => {
    // console.log('inputclick and selectionstart is ', e.target.selectionStart);
    
    setCaretPosition(e.target.selectionStart);
  }


  // 
  const handleInputKeyDown = (e) => {
    // console.log("key down and selectionStart is ", e.target.selectionStart);
    if(e.keyCode === 39) {
      setCaretPosition(oldPosition => oldPosition + 1);
    } 
    else if (e.keyCode === 37){
      setCaretPosition(oldPosition => oldPosition - 1);
    }
    else {
      setCaretPosition(e.target.selectionStart);
    }
  }


  const createInputString = () => {
    const arr = 
      inputVal.split("").map((char, i) => 
        <span 
          className="string-char" 
          key={`string-char-${i}`}
        >
          {char}
        </span>
      );
    return arr;
    
  }


  const updateValue = (e) => {
    // console.log('updatevalue and e.target.selectionStart is ', e.target.selectionStart);
    
    setInputVal(e.target.value);
    setCaretPosition(e.target.selectionStart);
  }


  const gainFocus = (e) => {
    // console.log('gain focus and e.target.selectionStart is ', e.target.selectionStart);
    setCaretPosition(e.target.selectionStart);
    setInputFocus(true);
  }


  const loseFocus = (e) => {
    setInputFocus(false);
    handleBlur();
  }


  let caretStyle = {
    opacity: caretBright ? "1" : "0.3"
  }

  const fakeCaret = inputFocus ? 
    <span 
      className="fake-caret" 
      key={"fake-caret"} 
      style={caretStyle}
    ></span> 
    : 
    <span 
      className="no-caret" 
      key="no-caret"
    ></span>;


  

  // console.log("inputVal is ", inputVal);


  // input string is split into an array so that the caret, which is a span, can be inserted between characters
  let inputStringArr = createInputString();

  inputStringArr.splice(caretPosition, 0, fakeCaret);

  let inputDiv = (
    <div className="fake-input">
      { inputStringArr }
    </div>
  );

  return(
    <div className="input-wrapper">

      {inputDiv}

      <input 
        className="real-input" 
        type="text" 
        value={inputVal} 
        maxLength={maxInputLength}
        onChange={updateValue}
        onClick={handleClick}
        onKeyDown={handleInputKeyDown}
        onFocus={gainFocus}
        onBlur={loseFocus}
        onPaste={(e) => {e.preventDefault(); return false;}} 
      />

    </div>
  )
};

SecretInputBox.defaultProps = {
  maxInputLength: 10, 
  passValue: () => console.log("pass input value to parent here"), 
  inputValue: "NO VAL FOUND", 
  handleBlur: () => console.log("no blur handler?"),
  inputType: 'number'
}

SecretInputBox.propTypes = {
  maxInputLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  passValue: PropTypes.func,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleBlur: PropTypes.func,
  inputType: PropTypes.oneOf(["text", "number"])
}