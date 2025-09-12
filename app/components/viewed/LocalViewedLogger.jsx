'use client';

import { useEffect } from "react";

export default function LocalViewedLogger({ museum }) {
    useEffect(() => {
        if (!museum.id) return;

        const saveToLocalStorage = () => {
            const existing = localStorage.getItem('viewedMuseums');
            let viewed = [];

            try {
                viewed = existing ? JSON.parse(existing) : [];
            } catch (err) {
                console.warn('LocalStorageのデータ解析に失敗:', err);
            }

            viewed = viewed.filter((m) => m.id !== museum.id);
            viewed.unshift({
                id: museum.id,
                name: museum.name,
                imageUrl: museum.imageUrl,
                exhibition: museum.exhibition,
                schedule: museum.schedule,
                viewedAt: new Date().toISOString(),
            });


            if (viewed.length > 10) {
                viewed = viewed.slice(0, 10);
            }

            localStorage.setItem('viewedMuseums', JSON.stringify(viewed));
        };

        saveToLocalStorage();
    }, [museum]);

    return null;
}
