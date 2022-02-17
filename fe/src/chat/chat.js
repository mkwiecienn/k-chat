import { BehaviorSubject } from 'rxjs';
import commands, { Command } from './commands';
import processors from './textProcessors';

export const Events = {
	WELCOME: 'welcome',
	USERNAME_UPDATE: 'username',
	NEW_MESSAGES: 'new-messages',
	SEND_MESSAGE: 'send-msg',
	UPDATE_MESSAGE: 'update-message'
};

export const chat = (_api) => {
	let usernames$ = new BehaviorSubject();
	let messages$ = new BehaviorSubject();
	let messages = [];
	let userId = '';
	let roomId = '';
	// 1st - ours, 2nd - our friend
	const usernames = [ '', '' ];

	return {
		_api,
		init: async function() {
			await _api.init();

			_api.getUsername().subscribe((usernamePayload) => {
				const { username, id } = usernamePayload;
				usernames[+(id !== userId)] = username;
				usernames$.next(usernames);
			});

			_api.getMessages().subscribe((newMsgs) => {
				messages = messages.concat(newMsgs.map((m) => ({ ...m, isMy: this.isMyMessage(m) })));
				messages$.next(messages);
			});

			_api.getMessageUpdate().subscribe((updated) => {
				const foundIndex = messages.findIndex((m) => m.id === updated.id);

				if (foundIndex === -1) return;

				if (updated.content === '') {
					messages.splice(foundIndex, 1);
				} else {
					messages[foundIndex] = updated;
				}

				messages$.next(messages);
			});

			const data = await _api.getWelcome();
			userId = data.id;
			usernames[0] = data.username;
			roomId = data.roomId;

			usernames$.next(usernames);
		},
		sendMessage: (msgContent) => {
			let msgText = msgContent;
			const foundCommand = commands.map((c) => c(msgContent)).find((c) => !!c.command);

			if (!!foundCommand) {
				const { text, command } = foundCommand;
				msgText = text;

				switch (command) {
					case Command.NICK:
						_api.updateUsername(text);
						return;
					case Command.FADE_LAST:
					case Command.HIGHLIGHT:
					case Command.REMOVE_LAST:
					case Command.COUNTDOWN:
						break;
					default:
						break;
				}
			}

			const { text, properties } = processors.reduce(
				(prev, curr) => {
					const currResult = curr(prev);
					return { text: currResult.text, properties: { ...prev.properties, ...currResult.properties } };
				},
				{ text: msgText, properties: {} }
			);

			if (!text) return;
			_api.sendMessage({ content: text, roomId, ...properties });
		},
		usernames$,
		messages$,
		isMyMessage: (msg) => msg.author === userId
	};
};
