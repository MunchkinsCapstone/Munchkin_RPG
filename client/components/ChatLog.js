import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

const ChatLog = (props) => {
	return (
		<div className='chat-log' style={{ marginBottom: '1em' }}>
			<h4 style={{ textAlign: 'center' }}>Chatroom & GameLog</h4>
			<hr />
			{/* 
				We just need to store our game logs and messages in our store in an array and just map it here.
			 */}
			<h6>01:11 Game: Yang knocked door.</h6>
			<h6>
				01:12 Game: <span style={{ color: 'red' }}>Plutonium Dragon</span> was behind the door!
			</h6>
			<h6 style={{ color: 'blue' }}>01:14 Oz: I'm not helping.</h6>
			<h6 style={{ color: 'purple' }}>01:15 Raymond: I'll help for 5 Treasures.</h6>
			<h6>01:17 Game: Graham has joined the battle!</h6>
			<div className='input-group'>
				<input type='text' className='form-control' aria-label='Text input with segmented dropdown button' />
				<div className='input-group-append'>
					<button type='button' className='btn btn-secondary'>
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
			</div>
		</div>
	);
};

export default ChatLog;

// export default class ChatRoom extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			messages: [
// 				new Message({
// 					id: 1,
// 					message: "I'm the recipient! (The person you're talking to)"
// 				}), // Gray bubble
// 				new Message({ id: 0, message: "I'm you -- the blue bubble!" }) // Blue bubble
// 			]
// 			//...
// 		};
// 	}

// 	render() {
// 		return (
// 			<ChatFeed
// 				messages={this.state.messages} // Boolean: list of message objects
// 				isTyping={this.state.is_typing} // Boolean: is the recipient typing
// 				hasInputField={false} // Boolean: use our input, or use your own
// 				showSenderName // show the name of the user who sent the message
// 				bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
// 				// JSON: Custom bubble styles
// 				bubbleStyles={{
// 					text: {
// 						fontSize: 30
// 					},
// 					chatbubble: {
// 						borderRadius: 70,
// 						padding: 40
// 					}
// 				}}
// 			/>
// 		);
// 	}
// }
