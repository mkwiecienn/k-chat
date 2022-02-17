import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ messages, className }) => {
	return (
		<div className={`Messages ${className}`}>
			<ul className="messages-wrapper">
				{messages.map((m) => (
					<li key={m.id}>
						<Message {...m} />
					</li>
				))}
			</ul>
		</div>
	);
};

Messages.defaultProps = {
	messages: [],
	className: ''
};

export default Messages;
