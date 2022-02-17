import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { usePrevious } from '../../hooks';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ messages, className }) => {
	const [ shouldAnimate, setShouldAnimate ] = useState(false);
	const _prevMessages = usePrevious(messages);

	useEffect(
		() => {
			if (!Array.isArray(messages) || !Array.isArray(_prevMessages)) return;
			if (messages.length > _prevMessages.length && messages.length > 0) {
				setShouldAnimate(true);
			} else {
				setShouldAnimate(false);
			}
		},
		[ messages ]
	);

	return (
		<div className={`Messages ${className}`}>
			<ul className={`messages-wrapper ${shouldAnimate ? 'should-animate' : ''}`}>
				{messages.map((m, i) => (
					<li key={m.id} className={m.isMy ? 'my' : 'theirs'}>
						<Message {...m} className={(i === messages.length - 1 && shouldAnimate && 'new') || ''} />
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
