'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function ChangeProfileImage({ userId }) {
    const [imageUrl, setImageUrl] = useState('/images/profile/profile.jpg');
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (!userId) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile-image`, {
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('プロフィール画像取得に失敗しました');
                return res.json();
            })
            .then(data => {
                if (data.imageUrl) {
                    const fullImageUrl = data.imageUrl 
                        ? (data.imageUrl.startsWith('http') ? data.imageUrl : `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`)
                        : '/images/profile/profile.jpg';
                    setImageUrl(fullImageUrl);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [userId]);
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            alert("ファイルサイズが大きすぎます。10MB以内にしてください。");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile-image`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error('プロフィール画像のアップロードに失敗しました' + errorText);
            }

            const data = await res.json();
            if (data.imageUrl) {
                const fullImageUrl = data.imageUrl.startsWith('http')
                    ? data.imageUrl
                    : `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`;
                setImageUrl(fullImageUrl);
            }
        } catch (err) {
            alert('プロフィール画像のアップロードに失敗しました: ' + err.message);
        }
    };

    return (
        <div className="w-24 h-24 relative">
            <Image
                src={imageUrl}
                alt="プロフィール画像"
                fill
                className="rounded-full border cursor-pointer object-cover"
                onClick={handleImageClick}
            />
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    )
}