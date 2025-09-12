'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { refresh } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ email, password }),
                credentials: 'include',
            });
            
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "ログインに失敗しました");
            }

            const data = await res.json();
            
            if (data){
                await refresh();
                router.push("/");
            } else {
                alert("トークンが返されませんでした");
            }
        } catch (err) {
            alert("ログインに失敗しました" + err.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-100">
            <form onSubmit={handleLogin} className="max-w-72 sm:max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">ログイン</h1>
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
                <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded">ログイン</button>
            </form>
        </div>
    );
}