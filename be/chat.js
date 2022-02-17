const genUsername = require('unique-username-generator');
const { getId } = require('./utils');

// userId: username
const Usernames = {};

const Message = ({ author = '', content = '', color = 'black', fontSize = '100%', backgroundColor = 'white' }) => ({
	id: getId(),
	content,
	author,
	color,
	fontSize,
	backgroundColor
});

const Room = (userIds = []) => ({
	userIds,
	messages: [],
	id: getId()
});

const chatFactory = () => ({
	rooms: [],
	handleUserConnect: function(userId) {
		let room = this.rooms.find((r) => r.userIds.length < 2);

		if (!room) {
			room = Room([ userId ]);
			this.rooms.push(room);
		} else {
			room.userIds.push(userId);
		}

		Usernames[userId] = genUsername.generateUsername('', 2, 19);

		return { room, username: Usernames[userId] };
	},
	handleUserDiconnect: function(userId, roomId) {
		const room = this.rooms.find((r) => r.userIds.includes(userId));

		if (!room) throw Error('There is no such room: ' + roomId);

		const userIds = room.userIds;
		const userIndex = userIds.indexOf(userId);

		if (userIndex > -1) {
			userIds.splice(userIndex, 1);
		}

		if (userIds.length === 0) {
			this.removeRoom(room.id);
		}
	},
	removeRoom: function(roomId) {
		this.rooms = this.rooms.filter((r) => r.id !== roomId);
	},
	addMessage: function(author, roomId, message) {
		const room = this.rooms.find((r) => r.id === roomId);
		const msg = Message({ author, content: message.content, ...message });

		if (room) {
			room.messages.push(msg);
		}
		return msg;
	},
	udpateMessage: function(msg) {
		const foundRoom = this.rooms.find((r) => r.id === msg.roomId);

		if (!foundRoom) return;

		const msgIndex = foundRoom.messages.findIndex((m) => m.id === msg.id);

		if (msgIndex === -1) return;

		foundRoom.messages[msgIndex] = msg;
		return msg;
	},
	changeUsername: function(userId, username) {
		Usernames[userId] = username;
	}
});

module.exports = {
	Usernames,
	Message,
	Room,
	chatFactory
};
