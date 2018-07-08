import React, {Component} from 'react'
import {connect} from 'react-redux'
import {writeMessage, sendMessage} from '../store'
import socket from '../socket'

const ChatLog = props => {
  const {handleChange, handleSubmit, chat} = props

  return (
    <div
      className="media-list"
      className="chat-log"
      style={{marginBottom: '1em'}}
    >
      <h4 style={{textAlign: 'center'}}>Chatroom & GameLog</h4>
      <hr />
      <div className="media-list">
        <ul className="chat">
          {chat.chatLog.map((message, idx) => (
            <li key={idx}>{`${message}`}</li>
          ))}
        </ul>
      </div>

      <div className="input-group">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={props.chat.newMessage}
            type="text"
            name="newMessage"
            className="form-control"
            aria-label="Text input with segmented dropdown button"
          />

          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">
              Send
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div role="separator" className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    chat: state.chat
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      // console.log('typing...', event.target.value);
      dispatch(writeMessage(event.target.value))
    },
    handleSubmit: event => {
      event.preventDefault()
      const message = event.target.newMessage.value
      dispatch(sendMessage(message))
      socket.emit('new message', message)
      dispatch(writeMessage(''))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLog)
