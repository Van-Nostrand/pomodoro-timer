import React, { useState, useEffect, useMemo, useRef, useReducer } from "react";
import PropTypes from 'prop-types';
import './nustyle.css';

const initialState = {
  caretBright: true,
  caretPosition: 0,
  inputFocus: false,
  inputString: '',
  writingMode: false,
  hasFocus: false,
  focusWasApplied: false,
}

function reducer(state, action) {
  switch(action.type) {
    case 'blink_caret':
      return { ...state, caretBright: !state.caretBright }
    case 'set_caret_bright':
      return { ...state, caretBright: action.payload }
    case 'set_caret_position':
      return { ...state, caretPosition: action.payload }
    case 'set_input_focus':
      return { ...state, inputFocus: action.payload }
    case 'set_input_string':
      return { ...state, inputString: action.payload }
    case 'set_writing_mode':
      return { ...state, writingMode: action.payload }
    case 'set_div_focus':
      return { ...state, hasFocus: action.payload }
    case 'set_focus_was_applied':
      return { ...state, focusWasApplied: action.payload }
    default: return state;
  }
}
/*
I'm rewriting this whole thing.
I was last working on caret position detection
 */

// This component renders an input box that can be fully customized
// for now, pasting and highlighting are not implemented
// input type = text is necessary because type = number gives those stupid arrow buttons
// clicking on an input fires onFocus and then it fires onclick. Important that caret position is updated onFocus
// number input testing is implemented but string input testing is not
export default function FakeInputElement({ 
  displayMode, 
  elementWidth , 
  elementHeight, 
  handleBlur, 
  passValue, 
  maxInputLength, 
  inputType, 
}) {

  const fakeCaretRef = useRef(null);
  const fakeInputRef = useRef(null);

  const [ state, dispatch ] = useReducer(reducer, initialState);
  
  // const [ caretBright, setCaretBright ] = useState(true); //controls the carets blink
  // const [ caretPosition, setCaretPosition ] = useState(0); //position of the "fake" caret
  const [ inputFocus, setInputFocus ] = useState(false); //when input has focus, this shows the caret
  const [ inputString, setInputString ] = useState("");
  const [ writingMode, setWritingMode ] = useState(false);
  const [ hasFocus, setHasFocus ] = useState(false);
  const [ focusWasApplied, setFocusWasApplied ] = useState(false);

  const WIDTH = elementWidth;
  const HEIGHT = elementHeight;
  const FONT_SIZE = HEIGHT * 0.87;
  const NUMBER_MODE = inputType === "number";
  const FAKE_DIV_CLASS = NUMBER_MODE ? "fake-input" : "fake-input fake-text-input";
  const INPUT_SIDE_PAD_MULT = 0.01;
  const INPUT_MARGIN_TOP_MULT = 0.1;
  const INPUT_CARET_SCROLL_BUFFER = elementWidth * 0.02;


  useEffect(() => {
    // if gaining focus
    if (hasFocus && !focusWasApplied) {
      setFocusWasApplied(true);
      giveFocus();
      setWritingMode(true);
    }
    // else if losing focus
    else if (!hasFocus && focusWasApplied) {
      setFocusWasApplied(false);
      giveBlur();
    }
  });


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
  const handleInputClick = (e) => {
    // console.log("handleInputclick",e);
    // console.log('e.nativeEvent.target is ', e.nativeEvent.target);
    if (e.nativeEvent.target) {
      console.log("span was clicked")
    }
    else {
      console.log("span not clicked")
    }
    

    let divBoundingRect = e.target.getBoundingClientRect();
    let divPosition = {x: divBoundingRect.x, y: divBoundingRect.y};
    let clickPosition = { x: e.clientX, y: e.clientY};

    let clickInDiv = {
      x: clickPosition.x - divPosition.x, 
      y: clickPosition.y - divPosition.y
    };

    determineCaretPosition(clickInDiv);

    if (!writingMode) {
      dispatch({ type: 'set_writing_mode', payload: true })

      // set caret position here ?
    }
  }

  const handleLetterClick = (e) => {
    console.log("handleLetterClick",e);
  }


  const determineCaretPosition = (clickPosition) => {
    console.log(fakeInputRef.current.children);

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
    const updatedInputValue = NUMBER_MODE ? prependWithZeros(inputString) : inputString;

    const arr = displayMode ? 
      <span className="string-char" style={{lineHeight: `${HEIGHT}rem`}}>
        { updatedInputValue } 
      </span>
      : inputFocus ? 
        inputString.split("").map((char, i) => 
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
            onClick={handleLetterClick}
            onMouseDown={() => console.log("onmousedown")}
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
        opacity: state.writingMode ? state.caretBright ? "1" : "0.3" : "0",
        height: `${HEIGHT * 0.8}rem`
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
        // padding:`${HEIGHT * 0.1}rem`,
      }}
      onClick={handleInputClick}
      onFocus={() => console.log("gained focus!")}
      onBlur={() => console.log("lost focus!")}
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
  handleBlur: () => console.log("no blur handler?"),
  inputType: 'number',
  displayMode: false
}

FakeInputElement.propTypes = {
  maxInputLength: PropTypes.number,
  passValue: PropTypes.func,
  handleBlur: PropTypes.func,
  inputType: PropTypes.oneOf(["text", "number"]),
  elementWidth: PropTypes.number,
  elementHeight: PropTypes.number,
  displayMode: PropTypes.bool
}
