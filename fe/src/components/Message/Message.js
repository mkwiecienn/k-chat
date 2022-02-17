import PropTypes from 'prop-types';

const Message = ({ id, content }) => <p>{content}</p>;

Message.propTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
};

export default Message;
