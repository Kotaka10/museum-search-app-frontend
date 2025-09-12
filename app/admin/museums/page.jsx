'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminMuseumPage() {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/all`, {
                    credentials: 'include',
                })

                if (res.ok) {
                    const data = await res.json();
                    setMuseums(data);
                }
            } catch (err) {
                console.error('美術館情報の取得に失敗しました');
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('本当に削除しますか？')) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (res.ok) {
            setMuseums(museums.filter(m => m.id != id))
        } else {
            alert('削除に失敗しました')
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">美術館一覧(管理者用)</h2>
            <table className="w-full border-collapse bg-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">美術館名</th>
                        <th className="border px-4 py-2">展覧会名</th>
                        <th className="border px-4 py-2">開催期間</th>
                        <th className="border px-4 py-2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {museums.map((museum) => (
                        <tr key={museum.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{museum.id}</td>
                            <td className="border px-4 py-2">{museum.name}</td>
                            <td className="border px-4 py-2">{museum.exhibition}</td>
                            <td className="border px-4 py-2">{museum.schedule}</td>
                            <td className="border px-4 py-2">
                                <Link href={`/museums/${museum.id}/edit`} className="text-blue-500 hover:underline mr-2">編集</Link>
                                <button onClick={() => handleDelete(museum.id)} className="text-red-500 hover:underline">削除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}