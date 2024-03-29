// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useCities } from '../contexts/CitiesContext';
import useUrlPosition from '../hooks/useUrlPosition';
import Button from './Button';
import s from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';

const API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [geoCodingError, setGeoCodingError] = useState('');
	const { addCity, isLoading } = useCities();
	const { lat, lng } = useUrlPosition();
	const navigator = useNavigate();

	useEffect(() => {
		if (!lat && !lng) return;

		const fetchCityData = async () => {
			try {
				setIsLoadingGeocoding(true);
				setGeoCodingError('');
				const res = await fetch(`${API_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();

				setIsLoadingGeocoding(false);
				if (!data.countryCode)
					throw new Error(
						"That doesn't seem to be a city. Click somewhere else 😉"
					);
				setCityName(data.city);
				setCountry(data.countryName);
				setCountryCode(data.countryCode.toLowerCase());
			} catch (error) {
				setGeoCodingError(error.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		};
		fetchCityData();
	}, [lat, lng]);

	const handleSubmit = async e => {
		e.preventDefault();

		if (!cityName && !date) return;

		const newCity = {
			cityName,
			country,
			countryCode: countryCode,
			date,
			notes,
			position: {
				lat,
				lng,
			},
			id: uuidv4(),
		};

		await addCity(newCity);
		navigator('/app/cities');
	};

	if (isLoadingGeocoding) {
		return <Spinner />;
	}

	if (!lat && !lng)
		return <Message message="Start by clicking somewhere on the map" />;

	if (geoCodingError) return <Message message={geoCodingError} />;

	return (
		<form
			className={`${s.form} ${isLoading ? s.loading : ''}`}
			onSubmit={handleSubmit}
		>
			<div className={s.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={`${s.flag} fi fi-${countryCode}`}></span>
			</div>

			<div className={s.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					selected={date}
					onChange={date => setDate(date)}
					dateFormat="dd/MM/yyyy"
					id="date"
				/>
			</div>

			<div className={s.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={s.buttons}>
				<Button type="primary">Add</Button>
				<Button
					type="back"
					onClick={e => {
						e.preventDefault();
						navigator(-1);
					}}
				>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
