import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { connect } from 'react-redux'
import { writeMessage, sendMessage } from '../store'

const ChatLog = props => {
	console.log('PROPS', props.chat)
	const { handleChange, handleSubmit } = props

	return (

		<div className='chat-log' style={{ marginBottom: '1em' }}>
			<h4 style={{ textAlign: 'center' }}>Chatroom & GameLog</h4>
			<hr />
			{/* 
				We just need to store our game logs and messages in our store in an array and just map it here.
			 */}
			{/* <h6>01:11 Game: Yang knocked door.</h6>
			<h6>
				01:12 Game: <span style={{ color: 'red' }}>Plutonium Dragon</span> was behind the door!
			</h6>
			<h6 style={{ color: 'blue' }}>01:14 Oz: I'm not helping.</h6>
			<h6 style={{ color: 'purple' }}>01:15 Raymond: I'll help for 5 Treasures.</h6>
			<h6>01:17 Game: Graham has joined the battle!</h6> */}
			<div className='input-group'>
				<input onChange={handleChange} value={props.chat.newMessage} type='text' name='name' className='form-control' aria-label='Text input with segmented dropdown button' />
				<form onSubmit={handleSubmit}>
					<div className='input-group-append'>
						<button type='submit' className='btn btn-secondary'>
							Send
					</button>
						<button
							type='button'
							className='btn btn-outline-secondary dropdown-toggle dropdown-toggle-split'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						>
							<span className='sr-only'>Toggle Dropdown</span>
						</button>
						<div className='dropdown-menu'>
							<a className='dropdown-item' href='#'>
								Action
						</a>
							<a className='dropdown-item' href='#'>
								Another action
						</a>
							<a className='dropdown-item' href='#'>
								Something else here
						</a>
							<div role='separator' className='dropdown-divider' />
							<a className='dropdown-item' href='#'>
								Separated link
						</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		chat: state.chat
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => {
			console.log('typing...', event.target.value)
			dispatch(writeMessage(event.target.value))
		},
		handleSubmit: event => {
			event.preventDefault()
			console.log('event', event)
			// const newMessage = event.target.newMessage.value
			// console.log(newMessage, 'submit messg')
			// dispatch(sendMessage(event.target.value))
			// dispatch(writeMessage(''))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatLog);
