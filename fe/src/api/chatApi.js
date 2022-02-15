export const chatApiFactory = (_api) => {
	return {
		_api,
		..._api
		// init: _api.init,
		// sendMsg: (msg) => _api.sendMsg(msg),
		// getUsername: () => _api.getUsername()
	};
};
