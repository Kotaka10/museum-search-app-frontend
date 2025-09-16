'use client';

import { useEffect, useState } from "react";
import NearbyMuseums from "@/app/nearby/ui/NearbyMuseums";

export default function NearbyMuseumsClient() {
    const [museums, setMuseums] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("位置情報を取得できません");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/nearby?lat=${latitude}&lon=${longitude}`);
                if (!res.ok) {
                    throw new Error('美術館の情報を取得できません');
                }
                const data = await res.json();
                setMuseums(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            };
        });
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;

    return <NearbyMuseums museums={museums} />
}