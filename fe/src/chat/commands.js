export const usernameChange = (text) => {
	const match = /\/nick\s(\w+)$/g.exec(text);

	if (match) {
		return match[1];
	}
	return '';
};

export const think = (text) => {
	const match = /\/think\s(.*)$/g.exec(text);

	if (match) {
		return match[0];
	}
	return '';
};

export const removeLast = (text) => text === '/oops';

export const fadeLast = (text) => text === '/fadelast';

export const higlight = (text) => {
	const match = /\/highlight\s(.*)$/g.exec(text);

	if (match) {
		return match[0];
	}
	return '';
};
