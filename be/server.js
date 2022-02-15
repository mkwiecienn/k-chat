const { Server } = require('socket.io');
const { chatFactory, Usernames } = require('./chat');

const chat = chatFactory();

const io = new Server(3333, {
	cors: {
		origin: 'http://localhost:3000'
	}
});

io.on('connection', (socket) => {
	console.log('new socket connection', socket.id);
	const { room, username } = chat.handleUserConnect(socket.id);

	const anotherUserId = room.userIds.find((uId) => uId !== socket.id);

	if (anotherUserId) {
		// send first user an update how's he talking to
		// also send second user and update that someone has joined
	}

	socket.emit('your-username', { username });

	socket.on('send-msg', (payload) => {
		console.log('newMsg event: ', payload);
		chat.addMessage(socket.id, room.id, payload.msg);
	});

	socket.on('username', (payload) => {
		const oldUsername = (Usernames = [ socket.id ]);
		Usernames[socket.id] = payload.username;
		io.emit('username-change', { old: oldUsername, new: payload.username });
	});

	socket.on('disconnect', () => {
		console.log('user has disconnected ', socket.id);
		chat.handleUserDiconnect(socket.id);
	});
});
