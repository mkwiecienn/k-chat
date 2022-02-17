import PropTypes from 'prop-types';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ messages, className }) => {
	return (
		<div className={`Messages ${className}`}>
			<ul className="messages-wrapper">
				{messages.map((m) => (
					<li key={m.id} className={m.isMy ? 'my' : 'theirs'}>
						<Message {...m} />
					</li>
				))}
			</ul>
		</div>
	);
};

Messages.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
			color: PropTypes.string,
			fontSize: PropTypes.string,
			backgroundColor: PropTypes.string
		})
	)
};

Messages.defaultProps = {
	messages: [],
	className: ''
};

export default Messages;
