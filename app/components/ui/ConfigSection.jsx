'use client';

import ChangeProfileImage from '@/app/components/common/ChangeProfileImage';
import Link from 'next/link';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function ConfigSection() {
    const router = useRouter();
    const { refresh } = useAuth();
    const { user, token } = useAuth();

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("本当に退会しますか？この操作は取り消せません");
        if (!confirmed) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
                },
                
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || '退会に失敗しました');
            }

            router.push('/');
            refresh();
            alert('退会が完了しました');
        } catch (err) {
            alert('退会に失敗しました: ' + err.message);
        }
    };

    return (
        <div className="my-6">
            <div className="flex items-center gap-8 max-w-xl mx-auto mt-10">
                <div className="flex flex-col items-center">
                    <div className="relative w-[90px] h-[90px] md:w-[100px] md:h-[100px]">
                        {user && 
                            <ChangeProfileImage userId={user.id} />
                        }
                    </div>
                    <p className="mt-2 text-gray-900">画像をクリックして変更する</p>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={() => logout(refresh)} className="text-left text-orange-400 hover:underline">
                        ログアウト
                    </button>
                    <button onClick={handleDeleteAccount} className="text-left text-red-600 hover:underline">
                        退会
                    </button>
                    <Link href={'/change-password'}>
                        <button className="text-left text-blue-600 hover:underline">
                            パスワード変更
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}