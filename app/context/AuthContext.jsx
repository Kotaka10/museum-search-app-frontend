'use client';

import { createContext, useEffect, useState, useContext, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const refresh = useCallback(async () => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/mypage`, {
                method: 'GET',
                credentials: 'include',
            });
            console.log("mypage status:", res.status);

            if (!res.ok) {
                throw new Error("認証情報が無効です");
            }

            const data = await res.json();
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <AuthContext.Provider value={{ user, isLoading, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}