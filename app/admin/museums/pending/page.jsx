'use client';

import { useEffect, useState } from "react";

export default function PendingMuseumsPage() {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        const fetchPendingMuseums = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/museums/pending`, {
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setMuseums(data);
                }
            } catch (err) {
                console.error('承認待ちの美術館の取得に失敗しました');
            }
        }

        fetchPendingMuseums();
    }, []);

    const handleApprove = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/museums/${id}/approve`, {
            method: 'PUT',
            credentials: 'include',
        });

        if (res.ok) {
            alert('承認しました');
        } else {
            alert('承認に失敗しました');
        }
    };

    const handleReject = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/museums/${id}/reject`, {
            method: 'PUT',
            credentials: 'include',
        });

        if (res.ok) {
            alert('否認しました');
        } else {
            alert('否認に失敗しました');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">承認待ち美術館一覧</h2>
            <table className="w-full border-collapse bg-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">美術館名</th>
                        <th className="border px-4 py-2">展覧会名</th>
                        <th className="border px-4 py-2">住所</th>
                        <th className="border px-4 py-2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {museums.map((museum) => (
                        <tr key={museum.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{museum.id}</td>
                            <td className="border px-4 py-2">{museum.name}</td>
                            <td className="border px-4 py-2">{museum.exhibition}</td>
                            <td className="border px-4 py-2">{museum.address}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleApprove(museum.id)} className="text-blue-500 hover:underline mr-2">承認</button>
                                <button onClick={() => handleReject(museum.id)} className="text-red-500 hover:underline">否認</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}