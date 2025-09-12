'use client';

import { useAuth } from "@/app/context/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function DeleteAccountButton() {
    const { user } = useAuth();
    const router = useRouter();

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("本当に退会しますか？この操作は取り消せません");
        if (!confirmed) return;

        try {
            const token = Cookies.get('token');

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || '退会に失敗しました');
            }

            Cookies.remove('token');
            router.push('/');
            alert('退会が完了しました');
        } catch (err) {
            alert('退会に失敗しました: ' + err.message);
        }
    };

    if (!user) return null;

    return (
        <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded">
            アカウントを削除する
        </button>
    );
}