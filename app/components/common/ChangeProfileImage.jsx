'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AwardIcon } from "lucide-react";

export default function ChangeProfileImage({ userId }) {
    const [imageUrl, setImageUrl] = useState('/images/profile/人物のアイコン素材 その3.png');
    const fileInputRef = useRef(null);
    const storageKey = `profileImageUrl_${userId}`;

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (!userId) return;

        const savedImageUrl = localStorage.getItem(storageKey);
        if (savedImageUrl) {
            setImageUrl(savedImageUrl);
        } else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile-image`, {
                credentials: 'include',
            })
                .then(res => {
                    if (!res.ok) throw new Error('プロフィール画像取得に失敗しました');
                    return res.json();
                })
                .then(data => {
                    if (data.imageUrl) {
                        const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`;
                        setImageUrl(fullImageUrl);
                        localStorage.setItem(storageKey, fullImageUrl);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [userId]);
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            alert("ファイルサイズが大きすぎます。10MB以内にしてください。");
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setImageUrl(previewUrl);

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
                const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`;
                setImageUrl(fullImageUrl);
                localStorage.setItem(storageKey, fullImageUrl);
            }
        } catch (err) {
            alert('プロフィール画像のアップロードに失敗しました: ' + err.message);
        }
    };

    return (
        <div className="relative w-40 h-40">
            <Image
                src={imageUrl}
                alt="プロフィール画像"
                fill
                className="rounded-full cursor-pointer object-cover"
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