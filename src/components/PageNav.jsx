import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import s from './PageNav.module.css';

const PageNav = () => {
	return (
		<nav className={s.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to={'/pricing'}>pricing</NavLink>
				</li>
				<li>
					<NavLink to={'/product'}>product</NavLink>
				</li>
				<li>
					<NavLink to={'/login'} className={s.ctaLink}>
						login
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default PageNav;
