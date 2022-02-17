export const Command = {
	NICK: 'nick',
	REMOVE_LAST: 'remove-last',
	FADE_LAST: 'fade-last',
	HIGHLIGHT: 'highlight',
	COUNTDOWN: 'countdown'
};

export const usernameChange = (text) => {
	const match = /\/nick\s(\w+)$/g.exec(text);

	if (match) {
		return { text: match[1], command: Command.NICK };
	}
	return { text };
};

export const removeLast = (text) => {
	return text === '/oops' ? { command: Command.REMOVE_LAST, text: '' } : { text };
};

export const fadeLast = (text) => {
	return text === '/fadelast' ? { command: Command.FADE_LAST, text: '' } : { text };
};

export const higlight = (text) => {
	const match = /\/highlight\s(.*)$/g.exec(text);

	if (match) {
		return { text: match[1], command: Command.HIGHLIGHT };
	}
	return { text };
};

const commands = [ usernameChange, removeLast, fadeLast, higlight ];

export default commands;
