'use client';

import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

export default function DeleteMuseum({ id }) {
    const { token } = useAuth();

    const handleDelete = async (id) => {
        const confirmed = confirm('本当にこの美術館を削除しますか？');
        if (!confirmed) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (res.status === 204) {
            alert('削除に成功しました');
        } else {
            const error = await res.text();
            alert('削除に失敗しました: ' + error);
        }
    };

    return (
        <>
            <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
                削除
            </button>
        </>
    );
}