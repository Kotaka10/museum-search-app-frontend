'use client';

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function ViewedLogger({ museum }) {
    useEffect(() => {
        const saveViewedHistrory = async () => {

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/viewed`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ museumId: museum.id }),
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('閲覧履歴の保存に失敗しました');
                }
            } catch (err) {
                console.error('Error saving viewed history:', err);
            }
        };

        saveViewedHistrory();
    }, [museum]);

    return null;
}