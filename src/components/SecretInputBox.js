import React, {useState, useEffect} from "react";

//This allows for deeper customization of a text input box, including the caret
//for simplicity, I've disabled pasting into the input
//highlighting with the mouse is not possible right now
//spaces are not properly represented
export const SecretInputBox = ({
  maxInputLength = "10", 
  passValue = () => console.log("pass input value to parent here"), 
  inputValue = "NO VAL FOUND",
  handleBlur = () => console.log("no blur handler?")}) => {

  
  let [ caretBright, setCaretBright ] = useState(true); //controls the carets blink
  let [ caretPosition, setCaretPosition ] = useState(0); //position of the "fake" caret
  let [ inputFocus, setInputFocus ] = useState(false); //when input has focus, this shows the caret

  const handleTyping = (e) => {
    setCaretPosition(e.target.selectionStart);
    // setInputValue(e.target.value);
    passValue(inputValue);
  }

  const handleInputClick = (e) => {
    setCaretPosition(e.target.selectionStart);
  }

  // allows use of left and right arrow keys
  const handleInputKeyDown = (e) => {
    if(e.keyCode === 39){
      setCaretPosition(oldPosition => oldPosition + 1);
    } 
    else if (e.keyCode === 37){
      setCaretPosition(oldPosition => oldPosition - 1);
    }
  }


  const gainFocus = () => {
    setInputFocus(true);
  }

  const loseFocus = () => {
    setInputFocus(false);
    handleBlur();
  }

  let caretStyle = {
    opacity: caretBright ? "1" : "0.3"
  }

  const fakeCaret = inputFocus ? <span className="fake-caret" key={"fake-caret"} style={caretStyle}></span> : <span className="no-caret" key="no-caret"></span>;


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


  // input string is split into an array so that the caret, which is a span, can be inserted between characters
  let inputStringArr = 
    inputValue.split("").map((char, i) => 
      <span className="string-char" key={`string-char-${i}`}>
        {char}
      </span>
    );
  inputStringArr.splice(caretPosition, 0, fakeCaret);

  let inputDiv = (
    <div className="fake-input">
      {inputStringArr}
    </div>
  );

  return(
    <div className="input-wrapper">

      {inputDiv}

      <input 
        className="real-input" 
        type="text" 
        value={inputValue} 
        maxLength={maxInputLength}
        onChange={(e) => passValue(e.target.value)}
        onClick={(e) => handleInputClick(e)}
        onKeyDown={(e) => handleInputKeyDown(e)}
        onFocus={gainFocus}
        onBlur={loseFocus}
        onPaste={(e) => {e.preventDefault(); return false;}} />

    </div>
  )
};