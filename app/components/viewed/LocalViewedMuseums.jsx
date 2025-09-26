'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";

export default function LocalViewedMuseums() {
    const [viewedMuseums, setViewedMuseums] = useState([]);

    useEffect(() => {
        const fetchViewedMuseums = () => {
            const existing = localStorage.getItem('viewedMuseums');
            let viewed = [];

            try {
                viewed = existing ? JSON.parse(existing) : [];
            } catch (err) {
                console.warn('LocalStorageのデータ解析に失敗:', err);
            }

            setViewedMuseums(viewed);
        };

        fetchViewedMuseums();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-4">
            <div className="flex gap-1 items-center bg-gray-100 rounded shadow p-6 mb-4">
                <FaHistory className="w-7 h-7 text-gray-700" />
                <h2 className="text-xl font-bold">最近見た美術館</h2>
            </div>
            <div className="grid gap-2 px-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {viewedMuseums.map(({ id, name, exhibition, schedule, viewedAt }) => (
                    <div key={id}>
                        <Link
                                key={id}
                                href={`/museums/${id}`}
                                className="
                                    block border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 bg-white
                                    hover:bg-gray-50 cursor-pointer
                                "
                            >
                                <p className="text-base font-medium">{exhibition}</p>
                                <p className="text-sm">{name}</p>
                                <p className="text-sm font-medium">{schedule}</p>
                                <p className="text-sm text-gray-500">閲覧日時: {new Date(viewedAt).toLocaleString()}</p>
                            </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}