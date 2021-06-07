import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './App.css';


function App() {
  const [state, setState] = useState({message: '', name: ''})
  const [chat, setChat] = useState([])
  
  const socket = socketIOClient(window.location.hostname+":4000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx*
      console.log(socket.connected)
    });
    socket.on("connect_error", (err) => {
      console.log(err.message)
      socket.connect();
    });
    socket.on('message-show', ({ name, message }) => {
      console.log("ee")
      setChat([ ...chat, { name, message }])
    })
  }, []);

  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {message, name} = state
    socket.emit('message-send', {message, name})
    setState({message: '', name})
  }

  const renderChat = () => {
    return chat.map(({message, name}, i) => (
      <div key={i}>
        <h3>
          {name} <span>{message}</span>
        </h3>
      </div>)
    )
  }

  return (
    <div className="card">
      <form onSubmit = {handleSubmit}>
        <div className="name-field">
          <TextField
            name="name"
            onChange = {handleChange}
            value = {state.name}
            label='Name'
          />
        </div>
        <div>
          <TextField
            name = "message"
            onChange = {handleChange}
            value = {state.message}
            id = "outlined-multiline-static"
            variant = "outlined"
            label='Message'
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
