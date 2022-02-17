import { BehaviorSubject } from 'rxjs';

export const Events = {
	WELCOME: 'welcome',
	USERNAME_UPDATE: 'username',
	NEW_MESSAGES: 'new-messages',
	SEND_MESSAGE: 'send-msg'
};

export const chat = (_api) => {
	let usernames$ = new BehaviorSubject();
	let messages$ = new BehaviorSubject();
	let messages = [];
	let userId = '';
	// 1st - ours, 2nd - our friend
	const usernames = [ '', '' ];

	return {
		_api,
		init: async function() {
			await _api.init();

			_api.getUsername().subscribe((usernamePayload) => {
				const { username, id } = usernamePayload;
				usernames[+(id !== userId)] = username;

				console.log('usernames: ', usernames);

				usernames$.next(usernames);
			});

			_api.getMessages().subscribe((newMsgs) => {
				messages = messages.concat(newMsgs);
				messages$.next(messages);
			});

			const data = await _api.getWelcome();
			userId = data.id;
			usernames[0] = data.username;

			usernames$.next(usernames);
		},
		sendMessage: _api.sendMessage,
		usernames$,
		messages$,
		isMyMessage: (msg) => msg.author === userId
	};
};
