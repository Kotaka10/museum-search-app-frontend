'use client';

import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "300px",
};

export default function MapView({ latitude, longitude, name }) {
    const center = {
        lat: latitude,
        lng: longitude
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
        >
            <Marker position={center} title={name} />
        </GoogleMap>
    );
}