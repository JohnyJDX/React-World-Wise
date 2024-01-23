import { useEffect, useState } from 'react';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvent,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import useGeolocation from '../hooks/useGeolocation';
import useUrlPosition from '../hooks/useUrlPosition';
import Button from './Button';
import s from './Map.module.css';

const Map = () => {
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const { lat: mapLat, lng: mapLng } = useUrlPosition();
	const { cities } = useCities();
	const {
		isLoading: isLoadingPosition,
		position: geoPosition,
		getPosition,
	} = useGeolocation();

	useEffect(() => {
		if (geoPosition) {
			setMapPosition([geoPosition.lat, geoPosition.lng]);
		}
	}, [geoPosition]);

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	return (
		<div className={s.mapContainer}>
			{!geoPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={13}
				minZoom={3}
				scrollWheelZoom={true}
				className={s.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map(city => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>{city.cityName}</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<ClickOnMap />
			</MapContainer>
		</div>
	);
};

const ChangeCenter = ({ position }) => {
	const map = useMap();
	map.setView(position, 8);
	return null;
};

const ClickOnMap = () => {
	const navigate = useNavigate();

	useMapEvent({
		click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
};

export default Map;
