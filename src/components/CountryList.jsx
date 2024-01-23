import { useCities } from "../contexts/CitiesContext";
import CountryItem from './CountryItem';
import s from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

const CountryList = () => {
	const { isLoading, cities } = useCities();

	if (isLoading) return <Spinner />;

	if (cities.length === 0)
		return (
			<Message message="Add your first city by clicking on a city on the map" />
		);

	const countries = cities.reduce((arr, city) => {
		if (!arr.some(el => el.country === city.country)) {
			return [...arr, { country: city.country, countryCode: city.countryCode }];
		} else {
			return arr;
		}
	}, []);

	return (
		<ul className={s.countryList}>
			{countries.map((country, index) => (
				<CountryItem key={index} country={country} />
			))}
		</ul>
	);
};

export default CountryList;
