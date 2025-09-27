'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

export default function ChangeProfileImage({ userId }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [loadingImage, setLoadingImage] = useState(true);
    const fileInputRef = useRef(null);
    const { token } = useAuth();

    const defaultImage = '/images/profile/profile.jpg';
    const blurImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHUlEQVQYV2NkYGBg+M+ABMRg0CDAwMDwPAAADDAAGs0xwVAAAAAElFTkSuQmCC';

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (!userId) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile-image`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
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
                setImageUrl(defaultImage);
            })
            .finally (() => {
                setLoadingImage(false);
            });
    }, [userId, token]);
    
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
                headers: {
                    "Authorization": `Bearer ${token}`
                },
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
        <div>
            {loadingImage ? (
                <Image
                    src={blurImage}
                    alt="プロフィール画像読み込み中"
                    fill
                    className="rounded-full border object-cover"
                    placeholder="blur"
                    blurDataURL={blurImage}
                />
            ) : (
                <Image
                    src={imageUrl || defaultImage}
                    alt="プロフィール画像"
                    fill
                    className="rounded-full border cursor-pointer object-cover"
                    onClick={handleImageClick}
                    placeholder="blur"
                    blurDataURL={blurImage}
                />
            )}
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