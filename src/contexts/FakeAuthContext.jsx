import { createContext, useContext, useReducer } from 'react';

const FAKE_USER = {
	name: 'User',
	email: 'user@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'login':
			return { ...state, user: payload, isAuthenticated: true };

		case 'logout':
			return { ...state, user: null, isAuthenticated: false };

		default:
			return state;
	}
};

const AuthProvider = ({ children }) => {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	const login = (email, password) => {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: 'login', payload: FAKE_USER });
	};

	const logout = () => {
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	return context;
};

export { AuthProvider, useAuth };
