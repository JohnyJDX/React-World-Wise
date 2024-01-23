import s from './CountryItem.module.css';

function CountryItem({ country }) {
	return (
		<li className={s.countryItem}>
			<span className={`fi fi-${country.countryCode}`}></span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
