import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/FakeAuthContext';
import s from './Login.module.css';

export default function Login() {
	const [email, setEmail] = useState('user@example.com');
	const [password, setPassword] = useState('qwerty');
	const { isAuthenticated, login } = useAuth();
	const navigate = useNavigate();

	const handleClick = e => {
		e.preventDefault();

		if (email && password) {
			login(email, password);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/app', { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return (
		<main className={s.login}>
			<PageNav />
			<form className={s.form} onSubmit={handleClick}>
				<div className={s.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={s.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	);
}
