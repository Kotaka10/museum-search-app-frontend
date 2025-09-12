'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminGuard({ children })　{
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {        
            if (!user) {
                router.replace('/');
            } else if (!user.roles.includes('ADMIN')) {
                router.replace('/');
            }
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return null;
    }

    if (!user || !user.roles.includes('ADMIN')) {
        return null;
    }

    return <>{children}</>;
}