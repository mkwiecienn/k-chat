import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '.';
import Messages from './components/Messages/Messages';
import './App.css';

function App() {
	const [ ourUsername, setOutUsername ] = useState('');
	const [ theirUsername, setTheirUsername ] = useState('');
	const [ messages, setMessages ] = useState([]);

	const chatContext = useContext(ChatContext);

	useEffect(() => {
		const init = async () => {
			await chatContext.init();

			chatContext.messages$.subscribe(setMessages);
			chatContext.usernames$.subscribe(([ our, their ]) => {
				setOutUsername(our);
				setTheirUsername(their);
			});
		};
		init();
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();
		chatContext.sendMessage(event.target[0].value);
		event.target[0].value = '';
	};

	return (
		<div className="App">
			<div className="chat-header">
				<div>
					<span>You: {ourUsername}</span>
					<span>Friend: {theirUsername}</span>
				</div>
			</div>
			<Messages messages={messages} className="messages" />

			<div className="chat-form">
				<form onSubmit={sendMessage}>
					<input type="text" name="msg" />
					<input type="submit" value="Send" />
				</form>
			</div>
		</div>
	);
}

export default App;
