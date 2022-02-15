// const { createServer } = require('http');
const { Server } = require('socket.io');

// const httpServer = createServer();
const io = new Server(3333, {
	cors: {
		origin: 'http://localhost:3000'
	}
});

io.on('connection', (socket) => {
	console.log('new socket connection');

	socket.on('send-msg', (payload) => {
		console.log('newMsg event: ', payload);
	});

	socket.on('close', () => {
		console.log('user has disconnected');
	});
});
