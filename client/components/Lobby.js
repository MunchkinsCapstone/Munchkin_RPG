import React, { Component } from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { receiveUser } from '../store/userReducer';
import { Link } from 'react-router-dom';
import ChatLog from './ChatLog';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check: false,
			user: '',
			allUsers: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	generateId() {
		let singleRand = () => Math.floor(Math.random() * 10);
		let digits = [];

		for (let i = 0; i < 9; i++) {
			let random = singleRand();
			digits.push(random);
		}
		return digits.join('');
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const newUser = evt.target.newUser.value;
		let currentUser = {
			id: this.generateId(),
			name: newUser
		};
		socket.emit('create new user', currentUser);

		localStorage.setItem('currentUser', JSON.stringify(currentUser));

		socket.on('received user', (userArr) => {
			this.setState(() => ({ allUsers: userArr }));
			localStorage.setItem('allUsers', JSON.stringify(userArr));
		});

		this.props.getUser(currentUser);
		this.setState((prevState) => ({ check: !prevState.check, user: currentUser.name }));
	}

	handleChange(evt) {
		evt.preventDefault();
		const currUser = evt.target.value;
		this.setState({ user: currUser });
	}

	handleClick(evt) {
		evt.preventDefault();
		socket.emit('reset users', []);
		localStorage.clear();
		window.location.reload();
	}

	render() {
		let liveArr = this.state.allUsers;
		const currUser = JSON.parse(localStorage.getItem('currentUser'));
		return (
			<div>
				<h1 id='title'>MUNCHKIN</h1>
				<div id='container'>
					{(() => {
						if (liveArr === null) {
							return (
								<div>
									<form onSubmit={this.handleSubmit}>
										<div>
											<label className='lobbyButton' htmlFor='newUser'>
												Create User{' '}
											</label>
											<input
												type='text'
												name='newUser'
												value={this.state.newUser}
												onChange={this.handleChange}
												required='required'
											/>
										</div>
										<button>Enter the Dungeon</button>
									</form>
								</div>
							);
						}
						if (!currUser) {
							return (
								<div>
									<form onSubmit={this.handleSubmit}>
										<div>
											<label className='lobbyButton' htmlFor='newUser'>
												Create User{' '}
											</label>
											<input
												type='text'
												name='newUser'
												value={this.state.newUser}
												onChange={this.handleChange}
												required='required'
											/>
										</div>
										<button>Enter the Dungeon</button>
									</form>
								</div>
							);
						}
						if (liveArr.length === 3) {
							return (
								<span>
									{liveArr.map((user, idx) => {
										return (
											<div>
												<li key={idx}>{user.name}</li>
											</div>
										);
									})}
									<Link to='/game'>START GAME</Link>
								</span>
							);
						}
						if (currUser) {
							return (
								<div>
									<h2 className='intro'>welcome {currUser.name}</h2>
									<p>...waiting for more players</p>
									{liveArr.map((user, idx) => {
										console.log('if statement arr', liveArr);
										console.log('user in ...', user);
										return (
											<div>
												<li key={idx}>{user.name}</li>
											</div>
										);
									})}
								</div>
							);
						}
						if (liveArr.length >= 3) {
							return <p>...too many cooks in the kitchen right now</p>;
						}
					})()}
				</div>
				<ChatLog />
				<button id='resetButton' onClick={this.handleClick}>reset users</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: (user) => {
			dispatch(receiveUser(user));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
