'use client';

import dynamic from "next/dynamic";

const MapView = dynamic(() => import('@/app/components/common/MapView'), { ssr:false });

export default function MapWrapper({ latitude, longitude, name }) {
    return (
        <div className="mt-4">
            <MapView latitude={latitude} longitude={longitude} name={name} />
        </div>
    );
}