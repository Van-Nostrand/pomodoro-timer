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
  const realInputRef = useRef(null);
  
  const [ caretBright, setCaretBright ] = useState(true); //controls the carets blink
  const [ caretPosition, setCaretPosition ] = useState(0); //position of the "fake" caret
  const [ inputFocus, setInputFocus ] = useState(false); //when input has focus, this shows the caret
  const [ inputVal , setInputVal ] = useState(inputValue); // not needed?
  const [ finalInputWidth, setFinalInputWidth ] = useState(0);

  const WIDTH = elementWidth;
  const HEIGHT = elementHeight;
  const FONT_SIZE = HEIGHT * 0.87;
  const NUMBER_MODE = inputType === "number";
  const FAKE_DIV_CLASS = NUMBER_MODE ? "fake-input" : "fake-input fake-text-input";
  const INPUT_SIDE_PAD_MULT = 0.01;
  const INPUT_MARGIN_TOP_MULT = 0.1;
  const INPUT_CARET_SCROLL_BUFFER = elementWidth * 0.02;


  // handling scroll window and caret position
  useEffect(() => {
    // console.log('in effect loop, realInputRef.current.scrollLeft is ', realInputRef.current.scrollLeft);
    
    let fakeInputScrollPosition = fakeInputRef.current.scrollLeft;
    let fakeCaretRect = fakeCaretRef.current.getBoundingClientRect();
    let fakeInputRect = fakeInputRef.current.getBoundingClientRect();
    
    if (fakeCaretRect.x > (fakeInputRect.width + fakeInputRect.x)) {
      let diff = fakeCaretRect.x - (fakeInputRect.width + fakeInputRect.x)
      // console.log('diff is ', diff);
      
      fakeInputRef.current.scrollLeft = fakeInputRef.current.scrollLeft + diff;
    }
    else if (fakeCaretRect.x < fakeInputRect.x) {
      let diff = Math.abs(fakeInputRect.x - fakeCaretRect.x);
      
      fakeInputRef.current.scrollLeft = fakeInputRef.current.scrollLeft - diff; 
    }
    // updateScrollPosition();
  });


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
    if(e.keyCode === 39) {
      setCaretPosition(oldPosition => oldPosition + 1);
    } 
    else if (e.keyCode === 37){
      setCaretPosition(oldPosition => oldPosition - 1);
    }
  }


  // updates the input value
  const handleChange = (e) => {
    if (NUMBER_MODE) {
      if (/^[0-9]*$/.test(e.target.value)) {
        setCaretPosition(e.target.selectionStart);
        setInputVal(e.target.value);
        passValue(e.target.value);
      }
      else {
        console.log("inside handleChange, number input error")
      }
    }
    // if it's string mode, the user can enter whatever they want...
    else {
      setCaretPosition(e.target.selectionStart);
      setInputVal(e.target.value);
      passValue(e.target.value);
    }
  }

  const handleInputEvent = (e) => {
    // console.log("realinputref scrolleft is ",realInputRef.current.scrollLeft, " and e.target.scrollLeft is ", e.target.scrollLeft);
    // updateSP(e.target.scrollLeft);
  }


  // temporary 
  const updateSP = (sl) => {
    fakeInputRef.current.scrollLeft = sl;
  }


  const updateScrollPosition = () => {
    fakeInputRef.current.scrollLeft = realInputRef.current.scrollLeft;
  }


  // set the caret in the corrent position and set the inputFocus flag (which starts the caret blinking cycle)
  const gainFocus = (e) => {
    setCaretPosition(e.target.selectionStart);
    setInputFocus(true);
  }


  // focus is lost, make the caret invisible
  const loseFocus = (e) => {
    setInputFocus(false);
    handleBlur();
  }


  // if in number mode, keeps the display like a digital clock by adding "0"'s to the front
  const prependWithZeros = (numb) => {
    if (numb.length < maxInputLength) {
      return Array(maxInputLength - numb.length).fill("0").join("") + numb;
    }
    return numb;
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


  // input string is split into an array of characters 
  // fake-caret is a span, and is inserted between characters
  const inputStringArr = createInputString();
  if (!displayMode) inputStringArr.splice(caretPosition, 0, fakeCaretSpan);

  const inputDiv = (
    <div 
      ref={fakeInputRef}
      className={FAKE_DIV_CLASS}
      style={{ 
        // padding:`${HEIGHT * 0.1}rem`,
      }}
    >
      { inputStringArr }
    </div>
  );

  // updateScrollPosition()

  if (
    realInputRef.current !== null && 
    fakeInputRef.current !== null &&
    fakeInputRef.scrollLeft !== realInputRef.current.scrollLeft
  ) {
    // updateScrollPosition();
  }  


  return(
    <div 
      className="input-wrapper" 
      style={{
        width: `${WIDTH}rem`,
        height: `${HEIGHT}rem`,
        fontSize: `${FONT_SIZE}rem`
      }}
    >

      {inputDiv}

      { !displayMode && (
        <input 
          ref={realInputRef}
          className="real-input" 
          style={{
            width: `${WIDTH}rem`,
            height: `${HEIGHT}rem`,
            lineHeight: `${HEIGHT}rem`,
            fontSize: `${FONT_SIZE}rem`,
            // padding: `0 `,
            // paddingLeft: `${WIDTH * INPUT_SIDE_PAD_MULT}rem`,
            // marginTop: `${HEIGHT * INPUT_MARGIN_TOP_MULT}rem`
          }}
          type="text" 
          value={inputFocus ? inputValue : NUMBER_MODE ? prependWithZeros(inputValue) : inputValue } 
          maxLength={maxInputLength}
          onChange={handleChange}
          onInput={handleInputEvent}
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