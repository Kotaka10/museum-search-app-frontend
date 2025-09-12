'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { FaHistory } from 'react-icons/fa';

export default function ViewedMuseums() {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchViewedHistory = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setError('ログインが必要です');
                router.push('/users/login');
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/viewed`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('閲覧履歴の取得に失敗しました');
                }

                const data = await res.json();
                setHistory(data);
            } catch (err) {
                setError(err.message || '閲覧履歴の取得に失敗しました');
                console.error(err);
            }
        };

        fetchViewedHistory();
    }, []);

    return (
        <div className="flex flex-col items-center my-6">
            <div className="flex items-center gap-1 bg-gray-100 p-4 mb-4">
                <FaHistory className="w-7 h-7 text-gray-700" />
                <h2 className="text-xl font-bold">最近見た美術館</h2>
            </div>

            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            {history.length > 0 && !error && (
                <div className="grid gap-2 px-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {history.map(({ museum, viewedAt }) => (
                        <div key={museum.id}>
                            {museum.imageUrl && (
                                <Image
                                    src={museum.imageUrl}
                                    alt={museum.name}
                                    fill
                                    className="object-cover rounded"
                                />
                            )}
                            <div>
                                <Link
                                    key={museum.id}
                                    href={`/museums/${museum.id}`}
                                    className="
                                        block border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 bg-white
                                        hover:bg-gray-50 cursor-pointer
                                    "
                                >
                                    <p className="text-base font-medium">{museum.exhibition}</p>
                                    <p className="text-sm">{museum.name}</p>
                                    <p className="text-sm font-medium">{museum.schedule}</p>
                                    <p className="text-sm text-gray-500">
                                        閲覧日時: {new Date(viewedAt).toLocaleString('ja-JP', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })};
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}