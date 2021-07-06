export const wrapperStyle = {
  position: 'relative',
  fontFamily: 'Helvetica'
}

export const realInputStyle = {
  position: "absolute",
  boxSizing: "border-box",
  fontSize: 'inherit',
  fontFamily: "Helvetica",
  
  borderImageWidth: 0,
  border: "none",
  outline: "none",

  opacity: 0,
  zIndex: 10,
}

export const fakeInputStyle = {
  position: "absolute",
  top: 0, 
  height: "100%",
  width: "100%",
  // padding: vars.$fake-element-height * 0.1,
  pointerEvents: "none",

  fontSize: "inherit",
  
  color: "orangered",
  backgroundColor: "grey",
  boxSizing: "border-box",
}

export const stringCharStyle = {
  display: "inline-block",
  fontSize: "1.05em",
}

export const fakeCaretStyle = {
  position: "absolute",
  display: "inline-block",
  width: "0.3rem",
  // height: vars.$fake-element-height * 0.80,
  backgroundColor: "white",
  margin: 0,
  padding: 0,
}

export const noCaretStyle = {
  opacity: 0
}