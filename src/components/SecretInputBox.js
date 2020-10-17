import React, {useState, useEffect} from "react";

//This allows for customization of a text input box, including the caret
//Work in progress - the input box itself needs to be masked
export const SecretInputBox = (props) => {

  let [ inputValue, setInputValue ] = useState("");
  let [ caretBright, setCaretBright ] = useState(true);
  let [ caretPosition, setCaretPosition ] = useState(0);
  let [ inputFocus, setInputFocus ] = useState(false);

  const handleTyping = (e) => {
    setCaretPosition(e.target.selectionStart);
    setInputValue(e.target.value);
  }

  const handleInputClick = (e) => {
    setCaretPosition(e.target.selectionStart);
  }

  const handleInputKeyDown = (e) => {
    // if right or left arrow key...
    if(e.keyCode === 39){
      setCaretPosition(oldPosition => oldPosition + 1);
    } 
    else if (e.keyCode === 37){
      setCaretPosition(oldPosition => oldPosition - 1);
    }
  }

  const handleFocus = () => {
    setInputFocus(true);
  }

  const handleBlur = () => {
    setInputFocus(false);
  }

  let caretStyle = {
    opacity: caretBright ? "1" : "0.3"
  }

  const fakeCaret = <span className="fake-caret" key={"fake-caret"} style={caretStyle}></span>;

  useEffect(() => {

    const BLINKING_CARET = setInterval(() => {
      setCaretBright(oldstate => !oldstate);
    }, 500);

    return () => clearInterval(BLINKING_CARET);
  }, []);

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
  )

  return(
    <div className="input-wrapper">
      
      <input 
        className="real-input" 
        type="text" 
        value={inputValue} 
        onChange={(e) => handleTyping(e)}
        onClick={(e) => handleInputClick(e)}
        onKeyDown={(e) => handleInputKeyDown(e)}
        onFocus={handleFocus}
        onBlur={handleBlur} />

      {inputDiv}

    </div>
  )
};