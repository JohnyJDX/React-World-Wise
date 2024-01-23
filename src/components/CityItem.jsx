import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import s from './CityItem.module.css';

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

const CityItem = ({ city }) => {
	const { currentCity, deleteCity } = useCities();
	const { cityName, countryCode, date, id, position } = city;

	const handleClick = e => {
		e.preventDefault();
		deleteCity(id);
	};

	return (
		<li>
			<Link
				className={`${s.cityItem} ${
					currentCity.id === id ? s['cityItem--active'] : ''
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={`${s.countryCode} fi fi-${countryCode}`}></span>
				<h3 className={s.name}>{cityName}</h3>
				<time className={s.date}>{formatDate(date)}</time>
				<button className={s.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
};

export default CityItem;
