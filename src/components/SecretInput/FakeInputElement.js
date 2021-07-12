import React, { useState, useEffect, useMemo, useRef, useReducer } from "react";
import PropTypes from 'prop-types';
import './nustyle.css';
import { initialState, reducer } from './FakeInputReducer';


// This component renders an input box that can be fully customized
// for now, pasting and highlighting are not implemented
// input type = text is necessary because type = number gives those stupid arrow buttons
// clicking on an input fires onFocus and then it fires onclick. Important that caret position is updated onFocus
// number input testing is implemented but string input testing is not
export default function FakeInputElement({ 
  displayMode, 
  elementWidth , 
  elementHeight, 
  // handleBlur, 
  passValue, 
  maxInputLength, 
  inputType, 
}) {

  const fakeCaretRef = useRef(null);
  const fakeInputRef = useRef(null);
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const FONT_SIZE = elementHeight * 0.87;
  const NUMBER_MODE = inputType === "number";
  const FAKE_DIV_CLASS = NUMBER_MODE ? "fake-input" : "fake-input fake-text-input";


  useEffect(() => {
    // if gaining focus
    if (state.inputFocus && !state.focusWasApplied) {
      setFocusWasApplied(true);
      giveFocus();
      setWritingMode(true);
    }
    // else if losing focus
    else if (!state.inputFocus && state.focusWasApplied) {
      setFocusWasApplied(false);
      giveBlur();
    }
  });

  // no longer necessary?
  const setFocusWasApplied = (b = !state.focusWasApplied) => {
    dispatch({ type: 'set_focus_was_applied', payload: b });
  }


  const setWritingMode = (b = !state.writingMode) => {
    dispatch({ type: 'set_writing_mode', payload: b })
  }


  const giveFocus = () => {
    fakeInputRef.current.focus();
  }

  const giveBlur = () => {
    fakeInputRef.current.blur();
  }


  // controls the caret blinking effect
  useEffect(() => {
    let BLINKING_CARET;
    
    if(state.writingMode){
      BLINKING_CARET = setInterval(() => {
        dispatch({type: 'blink_caret'});
      }, 500);
    }else if(!state.writingMode){
      clearInterval(BLINKING_CARET);
    }

    return () => clearInterval(BLINKING_CARET);
  }, [state.writingMode]);
  

  // sets the caret in the corrent position when the input is clicked
  // WIP here
  // todo - determine where caret should be placed
  const handleClick = (e) => {
    // let boundRect = e.target.getBoundingClientRect();
    if (e.target.className === "string-char") {
      console.log(e.target);
    }

    let divBoundingRect = e.target.getBoundingClientRect();
    let divPosition = {x: divBoundingRect.x, y: divBoundingRect.y};
    let clickPosition = { x: e.clientX, y: e.clientY};

    let clickInDiv = {
      x: clickPosition.x - divPosition.x, 
      y: clickPosition.y - divPosition.y
    };

    // determineCaretPosition(clickInDiv);

    if (!state.writingMode) {
      setWritingMode(true);
      // set caret position here ?
    }
  }

  const handleLetterClick = (e) => {
    // console.log("handleLetterClick",e);
  }


  const determineCaretPosition = (clickPosition) => {
    // console.log(fakeInputRef.current.children);

  }


  // manages caret position when using the left and right arrows
  // todo - check that the caret can actually move to this position (no negative values and not longer than inputValue.length)
  const handleInputKeyDown = (e) => {
    if(e.keyCode === 39) {
      setCaretPosition(state.caretPosition + 1);
    } 
    else if (e.keyCode === 37){
      setCaretPosition(state.caretPosition - 1);
    }
  }


  const setCaretPosition = (position) => {
    dispatch({
      type: 'set_caret_position',
      payload: position
    });
  }

  const setInputFocus = (b = !state.inputFocus) => {
    dispatch({ type: 'set_input_focus', payload: b})
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

 
  // set the caret in the corrent position and set the inputFocus flag (which starts the caret blinking cycle)
  const handleFocus = (e) => {
    setInputFocus(true);
  }


  // focus is lost, make the caret invisible
  const handleBlur = (e) => {
    setInputFocus(false);
  }


  // if in number mode, keeps the display like a digital clock by adding "0"'s to the front
  const prependWithZeros = (numb) => {
    if (numb.length < maxInputLength) {
      return Array(maxInputLength - numb.length).fill("0").join("") + numb;
    }
    return numb;
  }

  const convertStringToSpanArray = (string) => {
    return string.split("").map((char, i) => 
      <span
        className="str-char"
        id={`${i}--str-char`}
        key={`${i}--str-char`}
        style={{ lineHeight: `${elementHeight}rem`}}
      >
        { char }
      </span>
    )
  }

  const createInputString = () => {
    let { inputString } = state;
    if (inputType === 'number' && displayMode && !state.inputFocus) {
      inputString = prependWithZeros(inputString);
    }
    return convertStringToSpanArray(inputString);
  }


  const fakeCaretSpan = (
    <span 
      ref={fakeCaretRef}
      className="caret" 
      id="caret"
      key={"caret"} 
      style={{
        opacity: state.writingMode ? state.caretBright ? "1" : "0.3" : "0",
        height: `${elementHeight * 0.8}rem`
      }}
    /> 
  );


  // input string is split into an array of characters 
  // fake-caret is a span, and is inserted between characters
  const inputStringArr = createInputString();
  if (!displayMode) inputStringArr.splice(state.caretPosition, 0, fakeCaretSpan);


  const fakeInputDiv = (
    <div 
      ref={fakeInputRef}
      className={FAKE_DIV_CLASS}
      style={{ 
        // padding:`${elementHeight * 0.1}rem`,
      }}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleInputKeyDown}
    >
      { inputStringArr }
    </div>
  );



  return(
    <div 
      className="input-wrapper" 
      style={{
        width: `${elementWidth}rem`,
        height: `${elementHeight}rem`,
        fontSize: `${FONT_SIZE}rem`
      }}
    >

      {fakeInputDiv}

    </div>
  )
};

FakeInputElement.defaultProps = {
  maxInputLength: 4, 
  elementWidth: 50,
  elementHeight: 20,
  passValue: () => console.log("pass input value to parent here"), 
  // handleBlur: () => console.log("no blur handler?"),
  inputType: 'number',
  displayMode: false
}

FakeInputElement.propTypes = {
  maxInputLength: PropTypes.number,
  passValue: PropTypes.func,
  // handleBlur: PropTypes.func,
  inputType: PropTypes.oneOf(["text", "number"]),
  elementWidth: PropTypes.number,
  elementHeight: PropTypes.number,
  displayMode: PropTypes.bool
}
