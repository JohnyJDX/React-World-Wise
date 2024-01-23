import s from './Message.module.css';

function Message({ message }) {
	return (
		<p className={s.message}>
			<span role="img">👋</span> {message}
		</p>
	);
}

export default Message;
