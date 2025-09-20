'use client';

import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import Cookies from "js-cookie";
import ChangeProfileImage from "@/app/components/common/ChangeProfileImage";
import { useAuth } from "@/app/context/AuthContext";

export default function CommentList({ comments, setComments, currentUser }) {
    const [editingId, setEditingId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { user } = useAuth();

    const handleDelete = async (commentId) => {
        if (!window.confirm('このコメントを削除しますか？')) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (res.ok) {
            setComments(prev => prev.filter(c => c.id !== commentId));
        } else {
            alert('削除に失敗しました');
        }
    };

    const startEditing = (comment) => {
        setEditingId(comment.id);
        setEditedContent(comment.content);
    };

    const handleUpdate = async (commentId) => {
        if (editedContent.trim() === '') {
            alert('コメントを入力してください');
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ content: editedContent }),
        });

        if (res.ok) {
            const updated = await res.json();
            setComments(prev => prev.map(c => (c.id === commentId ? updated : c)));
            setEditingId(null);
        } else {
            alert('更新に失敗しました');
        }
    };

    useEffect(() => {
        const fetchDisplayName = async () => {

            if (!token) {
                console.error("トークンが存在しません。ユーザーが未ログインの可能性があります。");
                return;
            }
            
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/display-name`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.text();
                    setDisplayName(data);
                } else {
                    console.error('表示名の取得に失敗しました');
                }
            } catch (err) {
                console.error('表示名の取得に失敗しました');
            }
        }
        if (!user) return;
        fetchDisplayName();
    }, [user]);

    const latestComments = [...comments]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);

    return(
        <div className="p-6 border-b md:border-none">
            <div className="flex gap-1 items-center justify-center w-2/3 sm:w-2/5 mx-auto p-4 mb-4 bg-gray-100 rounded">
                <FaComment className="w-7 h-7 text-blue-500" />
                <h2 className="text-xl font-bold">投稿したコメント</h2>
            </div>
            {latestComments.length > 0 ? (
                latestComments.map(comment => (
                    <div key={comment.id} className="w-full overflow-x-auto">
                        <div className="border-2 p-4 rounded shadow-sm bg-white w-full">
                            <div className="relative flex gap-8 items-center w-[30px] h-[30px]">
                                {user && <ChangeProfileImage userId={user.id} />}
                                <p className="font-semibold">{displayName}</p>
                            </div>

                            {comment.museumName && (
                                <p className="text-sm text-gray-600 mb-1">美術館: {comment.museumName}</p>
                            )}

                            {editingId === comment.id ? (
                                <>
                                    <textarea
                                        className="w-full border p-2 rounded mb-2"
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    />
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleUpdate(comment.id)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            保存
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            キャンセル
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-700 mb-2 break-words whitespace-pre-line max-w-full">
                                    {comment.content}
                                </p>
                            )}

                            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>

                            {comment.username === currentUser && editingId !== comment.id && (
                                <div className="mt-2 space-x-2">
                                    <button
                                        onClick={() => startEditing(comment)}
                                        className="bg-blue-500 text-white p-1 hover:underline border rounded"
                                    >
                                        編集
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="bg-red-500 text-white p-1 hover:underline border rounded"
                                    >
                                        削除
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
            ))) : (
                <p className="text-center text-gray-500">投稿されたコメントはまだありません</p>
            )}
        </div>
    );
}