import { io } from 'socket.io-client';

export const socketApi = () => {
	const socket = io('ws://localhost:3333');
	console.log('initializing socket.io connection');
	socket.on('connect', () => {
		console.log(socket.id);
	});
	socket.on('disconnect', () => {
		console.log('client disconnected from the server');
	});

	return {
		sendMsg: (msg) => {
			socket.emit('send-msg', { msg });
		}
	};
};
