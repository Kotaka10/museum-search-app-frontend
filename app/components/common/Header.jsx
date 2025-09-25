'use client';

import { logoutAPI } from '@/lib/auth';
import { useAuth } from '@/app/context/AuthContext';
import SearchMuseums from '@/app/components/ui/SearchMuseums';
import MobileMenu from '@/app/components/common/MobileMenu';
import Link from 'next/link';

export default function Header() {
    const { user, isLoading, refresh } = useAuth();

    if (isLoading) {
        return (
            <header className="flex items-center justify-between p-2 bg-white shadow">
                <div className="animate-pulse bg-gray-300 h-6 w-40 rounded mb-2"></div>
                <div className="animate-pulse bg-gray-300 h-6 w-32 rounded"></div>
            </header>
        )
    }

    return (
        <header className="flex justify-between items-center p-2 bg-gray-100 shadow">
            <div>
                <Link href="/" className="text-lg sm:text-3xl font-bold">Museum</Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6 text-sm">
                <SearchMuseums />
                <Link href="/nearby" className="text-orange-500 hover:underline">マップ</Link>
                {user ? (
                    <>
                        <Link href="/mypage" className="text-orange-500 hover:underline">マイページ</Link>
                        <button onClick={() => logoutAPI(refresh)} className="text-orange-500 hover:underline">
                            ログアウト
                        </button>
                    </>
                ) : (
                    <>                        
                        <Link href="/users/register" className="text-orange-500 hover:underline">会員登録</Link>
                        <Link href="/users/login" className="text-orange-500 hover:underline">ログイン</Link>
                    </>
                )}
                <MobileMenu />
            </div>
        </header>
    );
}