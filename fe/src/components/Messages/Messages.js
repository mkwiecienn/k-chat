import Message from '../Message/Message';

const Messages = ({ messages }) => {
	return <div className="messages">{messages.map((m) => <Message key={m.id} {...m} />)}</div>;
};

Messages.defaultProps = {
	messages: []
};

export default Messages;
