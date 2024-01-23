import s from './Button.module.css';

const Button = ({ children, type, onClick }) => {
	return (
		<button onClick={onClick} className={`${s.btn} ${s[type]}`}>
			{children}
		</button>
	);
};

export default Button;
