'use client';

import { GoogleMap, Marker, InfoWindow, Circle, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

function getDistance(currentLat, museumLat, currentLon, museumLon) {
    const earthRadiusKm = 6371;
    const deltaLatitudeRad = (museumLat - currentLat) * (Math.PI / 180);
    const deltaLongitudeRad = (museumLon - currentLon) * (Math.PI / 180);

    const haversineFormulaValue = 
        Math.sin(deltaLatitudeRad / 2) ** 2 +
        Math.cos(currentLat * (Math.PI / 180)) *
        Math.cos(museumLat * (Math.PI / 180)) *
        Math.sin(deltaLongitudeRad / 2) ** 2
    ;

    const centralAngelRad = 2 * Math.atan2(
        Math.sqrt(haversineFormulaValue),
        Math.sqrt(1 - haversineFormulaValue)
    );

    return earthRadiusKm * centralAngelRad;
}

const LIBRARIES = ["geometry"];

export default function NearbyMuseums({ museums }) {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: LIBRARIES,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("位置情報が取得できません ");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                setUserLocation({
                    lat: latitude,
                    lng: longitude,
                });

                const museumsProperty = museums.map((museum) => ({
                    ...museum,
                    distance: getDistance(latitude, longitude, museum.latitude, museum.longitude),
                }));
            },
            (error) => {
                console.error("位置情報取得失敗" + error);
            }
        );
    }, [museums]);

    const mapContainerStyle = {
        width: '100%',
        height: '75vh',
    };

    if (!isLoaded) {
        return null;
    }

    if (!userLocation) {
        return <div className="relative w-full h-full">
                    <Image  
                        src="/images/placeholderImage/abstract-surface-textures-white-concrete-stone-wall.jpg"
                        alt="placeholderWhiteImage"
                        fill
                        className="object-cover"
                    />
                </div>
        ;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation}
            zoom={12}
        >
            <Marker position={userLocation} label="現在地" />

            <Circle
                center={userLocation}
                radius={50000}
                options={{
                strokeOpacity: 0.5,
                fillOpacity: 0.1,
                }}
            />

            {museums.map((museum) => {
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
                    new window.google.maps.LatLng(museum.latitude, museum.longitude)
                );

                if (distance <= 50000) {
                    const museumWithDistance = { ...museum, distance: distance / 1000 };

                    return (
                        <Marker
                            key={museum.id}
                            position={{ lat: museum.latitude, lng: museum.longitude }}
                            onClick={() => setSelectedMuseum(museumWithDistance)}
                        />
                    )
                }
                return null;
            })}

            {selectedMuseum && (
                <InfoWindow
                    position={{ lat: selectedMuseum.latitude, lng: selectedMuseum.longitude }}
                    onCloseClick={() => setSelectedMuseum(null)}
                >
                    <Link
                        key={selectedMuseum.id}
                        href={`/museums/${selectedMuseum.id}`}
                        className="
                            block border p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-200
                            bg-gradient-to-br from-lime-50 to-green-50 cursor-pointer
                        "
                    >
                        <div className="text-sm">
                            <h2 className="font-semibold">{selectedMuseum.name}</h2>
                            <p>{selectedMuseum.exhibition}</p>
                            <p className="text-sm">{selectedMuseum.distance.toFixed(2)} km</p>
                        </div>
                    </Link>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}