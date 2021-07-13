
export const initialState = {
  caretBright: true,
  caretPosition: 0,
  inputFocus: false,
  inputString: 'abc d',
  writingMode: false,
  focusWasApplied: false,
}

export function reducer(state, action) {
  switch(action.type) {
    case 'set_state':
      return { ...state, ...action.payload }
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
    case 'set_focus_was_applied':
      return { ...state, focusWasApplied: action.payload }
    default: return state;
  }
}