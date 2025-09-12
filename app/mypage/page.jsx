'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext"; 
import Cookies from "js-cookie";
import ConfigSection from "@/app/components/ui/ConfigSection";
import ViewedMuseums from "@/app/components/ui/ViewedMuseums";
import CommentList from "@/app/comments/CommentList";
import RegisterMuseumsList from "@/app/users/register/RegisterMuseumsList";
import Link from "next/link";
import EditDisplayName from "@/app/users/edit/EditDisplayName";
import EditEmail from "@/app/users/edit/EditEmail";
import { FaCog } from 'react-icons/fa';

export default function Mypage() {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const currentUser = user?.email || null;

    useEffect(() => {
        const fetchUserComments = async () => {
            const token = Cookies.get('token');

            if (!token) {
                console.error("トークンが存在しません。ユーザーが未ログインの可能性があります。");
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                } else {
                    console.error('コメントの取得に失敗しました');
                }
            } catch (err) {
                console.error('エラー', err);
            }
        };

        if (user) {
            fetchUserComments();
        }
    }, [user]);

    return (
        <div className="flex flex-col">
            <div className="border-b">
                <div className="flex justify-center items-center w-1/2 mx-auto gap-1 my-6 bg-gray-100 rounded shadow">
                    <FaCog className="w-7 h-7 text-gray-700" />
                    <h2 className="text-xl font-bold p-4">設定</h2>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-center items-center mx-2">
                    <ConfigSection />
                    <div className="ml-6">
                        <EditDisplayName />
                        <EditEmail />
                    </div>
                </div>
            </div>
            <div className="border-b">
                <CommentList comments={comments} setComments={setComments} currentUser={currentUser} />
            </div>
            <div className="flex flex-col items-center w-full pb-6 border-b">
                <RegisterMuseumsList />
                <Link
                    href={'/museums/create'}
                    className="text-orange-600 hover:underline"
                >
                    美術館を登録する
                </Link>
            </div>
            <ViewedMuseums />
        </div>
    )
}