'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';

export default function EditEmail() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const { refresh } = useAuth();

    useEffect(() => {
        const fetchEmail = async () => {
            const token = Cookies.get('token');
            if (!token) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/email`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.text();
                    setEmail(data);
                } else {
                    console.error('メールアドレスの取得に失敗しました');
                }
            } catch (err) {
                console.error('メールアドレスの取得に失敗しました');
            }
        }

        fetchEmail();
    }, []);

    const handleUpdate = async () => {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/email`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
                credentials: 'include',
            });
            if (res.ok) {
                refresh();
                router.push("/users/login");
                alert('再ログインしてください');
            } else {
                setMessage("更新に失敗しました");
            }
        } catch (err) {
            setMessage("エラー: " + err.message);
        }
    };

    return (
        <div className="my-4">
            <label className="block font-bold mb-1">メールアドレスの変更</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">更新</button>
            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        </div>
    );
}