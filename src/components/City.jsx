import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import Button from './Button';
import s from './City.module.css';
import Spinner from './Spinner';

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function City() {
	const { fetchCity, currentCity, isLoading } = useCities();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchCity(id);
	}, [id, fetchCity]);

	const { cityName, countryCode, date, notes } = currentCity;

	if (isLoading) return <Spinner />;

	return (
		<div className={s.city}>
			<div className={s.row}>
				<h6>City name</h6>
				<h3>
					<span className={`fi fi-${countryCode}`}></span>
					{cityName}
				</h3>
			</div>

			<div className={s.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={s.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={s.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>
				<Button onClick={() => navigate(-1)} type="back">
					Back
				</Button>
			</div>
		</div>
	);
}

export default City;
