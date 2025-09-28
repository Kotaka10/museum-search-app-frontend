'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaLandmark } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import DeleteMuseum from "@/app/museums/delete/DeleteMuseum";

export default function RegisterMuseumsList() {
    const [museums, setMuseums] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchMuseums = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/mypage`, {
                    headers: {
						"Authorization": `Bearer ${token}`
					},
            });
                if (res.ok) {
                    const data = await res.json();
                    setMuseums(data);
                } else {
                    console.error("美術館の取得に失敗しました");
                }
            } catch (err) {
                console.error('通信エラー', err);
            }
        }

        fetchMuseums();
    }, []);

    return (
        <div className="max-w-2xl mx-auto my-6 p-4 bg-gray-100 rounded shadow">
            <div className="flex gap-1 justify-center">
                <FaLandmark className="w-7 h-7 text-indigo-500" />
                <h2 className="text-xl font-bold mb-4">最近登録した美術館</h2>
            </div>
            {museums.length === 0 ? (
                <p className="text-gray-500">登録された美術館はありません</p>
            ) : (
                <ul className="space-x-8">
                    {museums.map((museum) => (
                        <li key={museum.id}>
                            <Link
                                href={`/museums/${museum.id}/edit`}
                                className="text-orange-600 hover:underline"
                            >
                                {museum.name} {
                                    museum.status === "APPROVED" && "承認済み" ||
                                    museum.status === "PENDING" && "承認待ち" ||
                                    museum.status === "REJECTED" && "非承認"
                                }
                            </Link>
                            <DeleteMuseum id={museum.id}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}