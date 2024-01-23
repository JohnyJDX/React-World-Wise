import Spinner from './Spinner';
import s from './SpinnerFullPage.module.css';

function SpinnerFullPage() {
	return (
		<div className={s.spinnerFullPage}>
			<Spinner />
		</div>
	);
}

export default SpinnerFullPage;
