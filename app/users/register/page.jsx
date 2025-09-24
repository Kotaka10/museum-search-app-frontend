'use client';

import { useState } from "react";
import { useAuth } from '@/app/context/AuthContext';

export default function RegisterUserPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const { refresh } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('パスワードが一致しません');
            return;
        }

        try {
            const res = await fetch("https://museum-research-app-backend.onrender.com/api/users/register", {
                method: 'POST',
                body: JSON.stringify({ email, password, userName }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (!res.ok) {
                const err = await res.json();
                alert(err.message || "登録に失敗しました");
                return;
            }

            const data = await res.json();

            if (data.token){
                await refresh();
                window.location.href = "/";
            } else {
                alert("トークンが返されませんでした");
            }
        } catch (err) {
            alert("API URL:", process.env.NEXT_PUBLIC_API_URL);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-100">
            <form onSubmit={handleRegister} className="max-w-72 sm:max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">会員登録</h1>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="メールアドレス"
                    required
                    className="w-full p-2 border mb-2 focus:ring-2 focus:outline-none focus:ring-orange-500"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="パスワード"
                    required
                    className="w-full p-2 border mb-2 focus:ring-2 focus:outline-none focus:ring-orange-500"
                />
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="パスワード（確認）"
                    required
                    className="w-full p-2 border mb-2 focus:ring-2 focus:outline-none focus:ring-orange-500"
                />
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="ユーザー名"
                    required
                    className="w-full p-2 border mb-2 focus:ring-2 focus:outline-none focus:ring-orange-500"
                />
                <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded">登録</button>
            </form>
        </div>
    );
}
