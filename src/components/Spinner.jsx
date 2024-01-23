import s from './Spinner.module.css';

function Spinner() {
	return (
		<div className={s.spinnerContainer}>
			<div className={s.spinner}></div>
		</div>
	);
}

export default Spinner;
