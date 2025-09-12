'use client';

import Link from "next/link"
import AdminGuard from "@/app/admin/AdminGuard"

export default function AdminPage() {
    return (
        <AdminGuard>
            <div className="flex flex-col jutify-center items-center">
                <h1 className="text-3xl text-center font-bold my-12">管理画面</h1>
                <div className="flex flex-col items-center md:flex-row md:justify-center gap-36 mb-12">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">【美術館管理】</h2>
                        <Link href={'/admin/museums'} className="text-orange-500 hover:underline">美術館管理画面</Link>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">【コメント管理】</h2>
                        <Link href={'/admin/comments'} className="text-yellow-500 hover:underline">コメント管理画面</Link>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">【ユーザー管理】</h2>
                        <Link href={'/admin/users'} className="text-green-500 hover:underline">ユーザー管理画面</Link>
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row md:justify-center gap-36 mb-12">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">【美術館承認済み】</h2>
                        <Link href={'/admin/museums/pending'} className="text-blue-500 hover:underline">美術館承認待ち画面</Link>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">【美術館承認済み】</h2>
                        <Link href={'/admin/museums/approved'} className="text-purple-500 hover:underline">美術館承認済み画面</Link>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}