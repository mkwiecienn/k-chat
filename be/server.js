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

	socket.emit('welcome', {
		id: socket.id,
		username,
		previousMessages: [],
		roomId: room.id
		//TODO I need some verification if it's the same user joining
		// previousMessages: room.messages
	});

	if (anotherUserId) {
		socket.emit('username', {
			username: Usernames[anotherUserId],
			id: anotherUserId
		});
		io.sockets.sockets.get(anotherUserId).emit('username', { username, id: socket.id });
	}

	socket.on('send-msg', (payload) => {
		const msg = chat.addMessage(socket.id, room.id, payload);

		room.userIds.forEach((userId) => {
			io.sockets.sockets.get(userId).emit('new-messages', [ msg ]);
		});
	});

	socket.on('username', (payload) => {
		Usernames[socket.id] = payload.username;
		io.emit('username', { id: socket.id, username: payload.username });
	});

	socket.on('update-message', (payload) => {
		const updated = chat.updateMessage(payload);

		if (updated) {
			io.emit('update-message', updated);
		}
	});

	socket.on('disconnect', () => {
		console.log('user has disconnected ', socket.id);
		chat.handleUserDiconnect(socket.id);
	});
});
