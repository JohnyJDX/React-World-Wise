import Map from '../components/Map';
import SideBar from '../components/SideBar';
import User from '../components/User';
import { useAuth } from '../contexts/FakeAuthContext';
import s from './AppLayout.module.css';

const AppLayout = () => {
	const { isAuthenticated } = useAuth();
	return (
		<div className={s.app}>
			<SideBar />
			<Map />
			{isAuthenticated && <User />}
		</div>
	);
};

export default AppLayout;
