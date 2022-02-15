export const chatApi = (_api) => {
	return {
		_api,
		sendMsg: (msg) => _api.sendMsg(msg)
	};
};
