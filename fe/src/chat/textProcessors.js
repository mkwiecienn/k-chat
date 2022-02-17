export const smile = ({ text }) => ({ text: text.replace('(smile)', '🙂'), properties: {} });

export const wink = ({ text }) => ({ text: text.replace('(wink)', '😉'), properties: {} });

export const think = ({ text }) => {
	const match = /\/think\s(.*)$/g.exec(text);

	if (match) {
		return {
			text: match[1],
			properties: {
				color: 'darkgray'
			}
		};
	}
	return { text, properties: {} };
};

const processors = [ smile, wink, think ];

export default processors;
