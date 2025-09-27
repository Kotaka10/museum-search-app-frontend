'use client';

import { createContext, useEffect, useState, useContext, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) {
            setToken(savedToken);
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
        setIsLoading(false);
    }, []);

    const refresh = useCallback(async () => {
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }
            
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/mypage`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("認証情報が無効です");
            }

            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error("ユーザー情報の取得に失敗しました:", err);
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        refresh();
    }, [refresh, token]);

    const login = (token, userData) => {
        setToken(token);
        localStorage.setItem("token", token);
        setUser(userData);
        refresh();
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}