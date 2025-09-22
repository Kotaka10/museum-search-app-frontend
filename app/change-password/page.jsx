'use client';

import { useState } from "react";

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("新しいパスワードと確認用パスワードが一致しません");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                }),
                credentials: 'include',
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(error || 'パスワードの変更に失敗しました');
            }

            setMessage("パスワードが正常に変更されました");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setMessage('エラー: ' + err.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center  bg-gradient-to-br from-amber-100 via-orange-100 to-red-100">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-center p-4">パスワード変更</h1>
                <input
                    type="password"
                    placeholder="現在のパスワード"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 border focus:ring-2 focus:ring-orange-500 focus:outline-none rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="新しいパスワード"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border focus:ring-2 focus:ring-orange-500 focus:outline-none rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="新しいパスワード（確認）"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border focus:ring-2 focus:ring-orange-500 focus:outline-none rounded mb-4"
                    required
                />
                <button onClick={handleSubmit} type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
                    変更する
                </button>

                {message && <p className="text-center text-sky-300 mt-4">{message}</p>}
            </form>
        </div>
    );
}