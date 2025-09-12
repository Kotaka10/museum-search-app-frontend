'use client';

import { useEffect, useState } from "react";

export default function DeleteMuseum() {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        const fetchMuseums = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/all`, {
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setMuseums(data);
            } else {
                alert('美術館一覧の取得に失敗しました');
            }
        };

        fetchMuseums();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = confirm('本当にこの美術館を削除しますか？');
        if (!confirmed) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (res.status === 204) {
            alert('削除に失敗しました');
            setMuseums((prev) => prev.filter((museum) => museum.id !== id));
        } else {
            const error = await res.text();
            alert('削除に失敗しました: ' + error);
        }
    };

    return (
        <>
            {museums.length !== 0 && (
                <div>
                    {museums.map((museum) => {
                        <div key={museum.id}>
                            <button
                                onClick={() => handleDelete(museum.id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                                削除
                            </button>
                        </div>
                    })}
                </div>
            )}
        </>
    );
}