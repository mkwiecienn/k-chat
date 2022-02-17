import { BehaviorSubject } from 'rxjs';
import processors from './textProcessors';

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
				messages = messages.concat(newMsgs.map((m) => ({ ...m, isMy: this.isMyMessage(m) })));
				messages$.next(messages);
			});

			const data = await _api.getWelcome();
			userId = data.id;
			usernames[0] = data.username;

			usernames$.next(usernames);
		},
		sendMessage: (msgContent) => {
			let content = processors.reduce((prev, curr) => curr(prev), msgContent);

			if (!content) return;
			_api.sendMessage({ content });
		},
		usernames$,
		messages$,
		isMyMessage: (msg) => msg.author === userId
	};
};