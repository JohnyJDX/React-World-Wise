import { Link } from 'react-router-dom';
import s from './Logo.module.css';

function Logo() {
	return (
		<Link to="/">
			<img src="logo.png" alt="WorldWise logo" className={s.logo} />
		</Link>
	);
}

export default Logo;
