import { useCities } from "../contexts/CitiesContext";
import CityItem from './CityItem';
import s from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

const CityList = () => {
	const { isLoading, cities } = useCities();
	if (isLoading) return <Spinner />;
	if (cities.length === 0)
		return <Message message="Add you first city clicking on city on the map" />;
	return (
		<ul className={s.cityList}>
			{cities.map(city => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	);
};

export default CityList;
