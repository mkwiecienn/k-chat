export const smile = (text) => text.replace('(smile)', '🙂');

export const wink = (text) => text.replace('(wink)', '😉');

const processors = [ smile, wink ];

export default processors;
