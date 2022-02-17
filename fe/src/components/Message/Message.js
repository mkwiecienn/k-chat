import PropTypes from 'prop-types';
import './Message.css';

const Message = ({ id, content, isMy, color, fontSize, backgroundColor }) => {
	const bgColor = isMy ? 'lightgray' : 'lightgreen';
	return (
		<p className={`message ${isMy ? 'my' : 'their'}`} style={{ backgroundColor: bgColor, fontSize, color }}>
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
	backgroundColor: PropTypes.string
};

Message.defaultProps = {
	content: '<empty message>',
	isMy: true,
	color: 'black',
	fontSize: '100%',
	backgroundColor: 'white'
};

export default Message;
