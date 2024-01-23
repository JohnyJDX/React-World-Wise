import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import s from './SideBar.module.css';

const SideBar = () => {
	return (
		<div className={s.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<footer className={s.footer}>
				<p className={s.copyright}>
					&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
				</p>
			</footer>
		</div>
	);
};

export default SideBar;
