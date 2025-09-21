'use client';

import { useEffect, useState } from 'react';

export default function EditUserName() {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/display-name`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    const name = ((await res.text()).trim());
                    setUserName(name);
                } else {
                    setMessage('表示名の取得に失敗しました');
                }
            } catch (err) {
                setMessage('エラー: ' + err.message);
            }
        }

        fetchUserName();
    }, []);

    const handleUpdate = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/display-name`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName })
            });
            if (res.ok) {
                setMessage("表示名を更新しました");
            } else {
                setMessage("更新に失敗しました");
            }
        } catch (err) {
            setMessage("エラー: " + err.message);
        }
    };

    return (
        <div className="my-4">
            <label className="block font-bold mb-1">ユーザー名の変更</label>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">更新</button>
            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        </div>
    );
}
