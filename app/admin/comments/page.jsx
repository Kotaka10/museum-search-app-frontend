'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function AdminCommentPage() {
    const [comments, setComments] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useAuth();

    const fetchComments = async () => {
        if (!token) {
            console.error("認証トークンがありません");
            return;
        }

        const url = keyword
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/comments/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=10`
            : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/comments?page=0&size=10`

        try {
            const res = await fetch(url, { 
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                console.error('コメント取得失敗', res.status)
                return
            }

            const data = await res.json()
            setComments(data.content)
            setTotalPages(data.totalPages)
        } catch (err) {
            console.error("APIエラー: ", err);
        }
    }


  useEffect(() => {
    fetchComments()
  }, [page, keyword]);

  const handleDelete = async (id) => {
        if (!confirm('本当に削除しますか？')) return

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/comments/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })

            if (res.ok) {
                fetchComments()
            }
        } catch (err) {
            console.error("削除時エラー: ", err);
        }
    }


  return (
    <div className="p-6">
        <h1 className="text-xl font-bold mb-4">コメント管理（管理者）</h1>

        <div className="mb-4">
            <input
                type="text"
                placeholder="キーワード検索"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border rounded px-3 py-1 mr-2"
            />
            <button
                onClick={() => {
                    setPage(0)
                    fetchComments
                }}
                className="bg-blue-500 text-white px-4 py-1 rounded"
            >
                検索
            </button>
        </div>

        <table className="w-full border">
            <thead className="bg-gray-100">
                <tr>
                <th className="border px-2 py-1 text-left">ID</th>
                <th className="border px-2 py-1 text-left">ユーザー</th>
                <th className="border px-2 py-1 text-left">美術館</th>
                <th className="border px-2 py-1 text-left">コメント内容</th>
                <th className="border px-2 py-1 text-left">投稿日</th>
                <th className="border px-2 py-1">操作</th>
                </tr>
            </thead>
            <tbody>
                {comments.map((c) => (
                    <tr key={c.id} className="border-t">
                        <td className="px-2 py-1">{c.id}</td>
                        <td className="px-2 py-1">{c.username}</td>
                        <td className="px-2 py-1">{c.museumName}</td>
                        <td className="px-2 py-1">{c.content}</td>
                        <td className="px-2 py-1">{new Date(c.createdAt).toLocaleString()}</td>
                        <td className="px-2 py-1 flex gap-2 justify-center">
                        <button onClick={() => handleDelete(c.id)} className="text-red-500 focus:underline">削除</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="mt-4 flex justify-center gap-4">
            <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                前へ
            </button>
            <span>ページ {page + 1} / {totalPages}</span>
            <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                次へ
            </button>
        </div>
    </div>
  )
}