'use client';

import Link from "next/link";
import { useState } from "react";

export default function CommentForm({ museumId, onCommentAdded, currentUser }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (content.trim() === '') {
            alert('コメントを入力してください')
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,                
                },
                body: JSON.stringify({ museumId, content }),
            });

            if (res.ok) {
                const newComment = await res.json();
                onCommentAdded(newComment);
                setContent('');
            } else {
                alert('コメント投稿に失敗しました');
            }
        } catch (err) {
            console.error('投稿エラー', err);
            alert('エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
    return (
      <div className="mb-6 p-4 bg-gray-100 rounded text-center">
        <p className="text-gray-700">コメントを投稿するにはログインが必要です</p>
        <Link href="/users/login" className="text-blue-600 hover:underline mt-2 inline-block">
          ログインページへ
        </Link>
      </div>
    );
  }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <textarea
                className="w-full border p-2 rounded mb-2"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="コメントを入力してください"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                コメントを投稿
            </button>
        </form>
    );
}