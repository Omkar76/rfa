import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLngExpression, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import './leaflet.css';
import Modal from '../components/commons/Modal';

interface LocationSelectorProps {
    onChange: (location: LatLngExpression) => void;
}


const LocationSelector: React.FC<LocationSelectorProps> = ({
    onChange,
}) => {
    const [position, setPosition] = useState<LatLngExpression>([44.4268, 26.1025]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition([position.coords.latitude, position.coords.longitude]);
        });
    }
        , []);

    const [open, setOpen] = useState(false);

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto block" 
            onClick={() => setOpen(true)}>Select Location</button>
            <Modal open={open} closeCB={() => {
                setOpen(false);
                onChange(position);
            }}>
                <MapContainer center={position} style={{ width: '500px', height: '500px' }} zoom={13}>

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <PositionMarker position={position} onPositionChange={
                        (position) => setPosition(position)
                    } />
                </MapContainer>
            </Modal>
            {" "}
            {position.toString()}
        </div>
    );
};

interface PositionMarkerProps {
    position: LatLngExpression;
    onPositionChange: (position: LatLngExpression) => void;
}

function PositionMarker({ position, onPositionChange }: PositionMarkerProps) {
    const map = useMapEvents({
        click: (e) => {
            onPositionChange([e.latlng.lat, e.latlng.lng]);
        },
    })

    useEffect(() => {
        map.invalidateSize();
    });

    const icon = divIcon({
        className: '',
        html: `
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 fill-red-500">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
         `
    });

    return (
        <Marker position={position} icon={icon} >
            Selected Location
        </Marker>
    )
}

export default LocationSelector;
