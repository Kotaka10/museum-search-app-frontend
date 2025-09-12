'use client';

import { useEffect, useState } from "react";

export default function ApprovedMuseumsPage() {
    const [approvedMuseums, setApprovedMuseums] = useState([]);

    useEffect(() => {
         const getApprovedMuseums = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/museums/approved`, {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setApprovedMuseums(data);
                }
            } catch (err) {
                console.error('承認済み美術館の取得にしっぱしました');
            }
         }

         getApprovedMuseums();
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {approvedMuseums.map((museum) => (
                        <tr key={museum.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{museum.id}</td>
                            <td className="border px-4 py-2">{museum.name}</td>
                            <td className="border px-4 py-2">{museum.exhibition}</td>
                            <td className="border px-4 py-2">{museum.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}