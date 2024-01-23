import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from 'react';

const API = 'https://6488799a0e2469c038fdd6e5.mockapi.io/';

const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'loading':
			return { ...state, isLoading: true };

		case 'cities/loaded':
			return { ...state, isLoading: false, cities: payload };

		case 'city/loaded':
			return { ...state, isLoading: false, currentCity: payload };

		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, payload],
				currentCity: payload,
			};

		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(city => city.id !== payload),
				currentCity: {},
			};

		case 'rejected':
			return { ...state, error: payload };

		default:
			return state;
	}
};

const CitiesProvider = ({ children }) => {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		const fetchCities = async () => {
			dispatch({ type: 'loading' });
			try {
				const res = await fetch(API + 'cities');
				const data = await res.json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading cities...',
				});
			}
		};

		fetchCities();
	}, []);

	const fetchCity = useCallback(
		async id => {
			if (Number(id) === currentCity.id) return;

			dispatch({ type: 'loading' });

			try {
				const res = await fetch(API + 'cities/' + id);
				const data = await res.json();
				dispatch({ type: 'city/loaded', payload: data });
			} catch {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading the city...',
				});
			}
		},
		[currentCity.id]
	);

	const addCity = async newCity => {
		dispatch({ type: 'loading' });

		try {
			const res = await fetch(API + 'cities/', {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			dispatch({ type: 'city/created', payload: data });
		} catch {
			dispatch({
				type: 'rejected',
				payload: 'There was an error add city.',
			});
		}
	};

	const deleteCity = async id => {
		dispatch({ type: 'loading' });

		try {
			await fetch(API + `cities/${id}`, {
				method: 'DELETE',
			});
			dispatch({ type: 'city/deleted', payload: id });
		} catch {
			dispatch({
				type: 'rejected',
				payload: 'There was an error delete city.',
			});
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				fetchCity,
				addCity,
				deleteCity,
				error,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
};
const useCities = () => {
	const context = useContext(CitiesContext);
	return context;
};

export { CitiesContext, CitiesProvider, useCities };
