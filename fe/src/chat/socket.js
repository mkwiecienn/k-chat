import { io } from 'socket.io-client';
import { Events } from './chat';
import { firstValueFrom, fromEvent } from 'rxjs';

const socketApi = () => {
	let messageUpdate$;
	let messages$;
	let username$;
	let socket;

	return {
		init: function() {
			socket = io('ws://localhost:3333');
			socket.on('connect', () => {
				console.log(socket.id);
			});

			messages$ = fromEvent(socket, Events.NEW_MESSAGES);
			username$ = fromEvent(socket, Events.USERNAME_UPDATE);
			messageUpdate$ = fromEvent(socket, Events.UPDATE_MESSAGE);
		},
		getWelcome: () => firstValueFrom(fromEvent(socket, Events.WELCOME)),
		getMessages: () => messages$,
		getUsername: () => username$,
		getMessageUpdate: () => messageUpdate$,
		sendMessage: function(msg) {
			socket.emit(Events.SEND_MESSAGE, msg);
		},
		updateUsername: (username) => {
			socket.emit(Events.USERNAME_UPDATE, { username });
		}
	};
};

export default socketApi;
