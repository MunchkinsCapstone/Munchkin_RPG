//CLIENT SIDE SOCKET

import io from 'socket.io-client';
import store, { sendMessage } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
	socket.on('sent message', message => {
		store.dispatch(sendMessage(message))
	})
});

export default socket;
