'use client';

import { useEffect, useState } from "react";
import MuseumDetailCard from "@/app/components/common/MuseumDetailCard";
import ViewedLogger from "@/app/components/viewed/ViewedLogger";
import LocalViewedLogger from "@/app/components/viewed/LocalViewedLogger";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

export default function FetchMuseumsById({ fetchedData }) {
    const { user } = useAuth();
    const [museum, setMuseum] = useState(null);
    const [error, setError] = useState('');
    const fetchedMuseum = fetchedData;
    
    useEffect(() => {
        async function fetchMuseum() {
            try {
                setMuseum(fetchedMuseum);
            } catch (err) {
                console.error('美術館の情報取得に失敗しました:', err);
                setError('美術館の情報を取得できませんでした。');
            }
        }

        fetchMuseum();
    }, [fetchedData]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!museum) {
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
        <>
            <MuseumDetailCard museum={museum} />
            {museum && (user ? (
                <ViewedLogger museum={museum} />
            ) : (
                <LocalViewedLogger museum={museum} />
            ))}
        </>
    );
}