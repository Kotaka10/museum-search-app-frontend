'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    fetchUsers()
  }, [page])

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/search?keyword=${keyword}&page=${page}&size=10`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await res.json()
    setUsers(data.content)
    setTotalPages(data.totalPages)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    fetchUsers()
  }

  const deleteUser = async (id) => {
    if (!confirm('このユーザーを削除しますか？')) return
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
    if (res.ok) {
      fetchUsers()
    } else {
      alert('削除に失敗しました')
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">ユーザー管理</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="表示名またはメールで検索"
          className="border px-3 py-1 rounded"
        />
        <button type="submit" className="bg-orange-500 text-white px-3 py-1 rounded">検索</button>
      </form>

      <table className="w-full border text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">表示名</th>
            <th className="p-2 border">メール</th>
            <th className="p-2 border">ロール</th>
            <th className="p-2 border">操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.displayName}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.roles}</td>
              <td className="p-2 border flex gap-2">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deleteUser(user.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          前へ
        </button>
        <span>ページ {page + 1} / {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          次へ
        </button>
      </div>
    </main>
  )
}