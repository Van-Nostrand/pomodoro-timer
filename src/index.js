import React from 'react'
import ReactDOM from 'react-dom'
// import TimeCopPonent from '@/components/TimeCopPonent'
// import NoteList from '@/components/NoteList'
import FakeInputElement from '@/components/SecretInput/FakeInputElement'
import '@/index.css'
import '@/scss/main.scss'
// import FocusTest from '@/FocusTest'

ReactDOM.render(
  <div className="dev-wrapper">
    <FakeInputElement />
  </div>
  ,
  document.getElementById('root'))
// ReactDOM.render(<TimeCopPonent />, document.getElementById("root"));
// ReactDOM.render(<NoteList />, document.getElementById("root"));
