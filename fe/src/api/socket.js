import { io } from 'socket.io-client';

function socketApi() {
	return {
		init: function() {
			return new Promise((resolve) => {
				this.socket = io('ws://localhost:3333');
				this.socket.on('connect', () => {
					console.log(this.socket.id);
				});
				this.socket.on('your-username', (payload) => {
					this.username = payload.username;
					resolve();
				});
			});
		},
		sendMsg: function(msg) {
			this.socket.emit('send-msg', { msg });
		},
		getUsername: function() {
			return this.username;
		}
	};
}

export default socketApi;
