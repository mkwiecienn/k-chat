import PropTypes from 'prop-types';
import './Message.css';

const Message = ({ id, content, isMy, color, fontSize, backgroundColor, className }) => {
	const bgColor = isMy ? 'lightgray' : 'lightgreen';
	return (
		// I know I could use some kind of a library for composing classes
		<p
			className={`message ${isMy ? 'my' : 'their'} ${className}`}
			style={{ backgroundColor: bgColor, fontSize, color }}
		>
			{content}
		</p>
	);
};

Message.propTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	isMy: PropTypes.bool,
	color: PropTypes.string,
	fontSize: PropTypes.string,
	backgroundColor: PropTypes.string,
	className: PropTypes.string
};

Message.defaultProps = {
	content: '<empty message>',
	isMy: true,
	color: 'black',
	fontSize: '100%',
	backgroundColor: 'white',
	className: ''
};

export default Message;
