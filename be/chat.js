const { getId } = require('./utils');

// id: username
const Usernames = {};

const Message = (author = '', content = '') => ({
	id: getId(),
	content,
	author
});

const Room = (userIds = []) => ({
	userIds,
	messages: [],
	id: getId()
});

const chatFactory = () => {
	let rooms = [];

	return {
		rooms,
		handleUserConnect: (userId) => {
			let room = rooms.find((r) => r.userIds.length < 2);

			if (!room) {
				room = Room([ userId ]);
				rooms.push(room);
			} else {
				room.userIds.push(userId);
			}
			return room.id;
		},
		handleUserDiconnect: (userId, roomId) => {
			const room = rooms.find((r) => r.userIds.includes(userId));

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
		removeRoom: (roomId) => {
			rooms = rooms.filter((r) => r.id !== roomId);
		},
		addMessage: (author, roomId, messageContent) => {
			// const room = self.rooms.find((r) => r.userIds.includes(userId));
			const room = rooms.find((r) => r.id === roomId);

			if (room) {
				room.messages.push(Message(author, messageContent));
			}
		},
		changeUsername: (userId, username) => {
			Usernames[userId] = username;
		}
	};
};

module.exports = {
	Usernames,
	Message,
	Room,
	chatFactory
};
