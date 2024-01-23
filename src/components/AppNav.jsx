import s from './AppNav.module.css';
import { NavLink } from 'react-router-dom';

const AppNav = () => {
	return (
		<nav className={s.nav}>
			<ul>
				<li>
					<NavLink to="cities">Cities</NavLink>
				</li>
				<li>
					<NavLink to="countries">countries</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default AppNav;
