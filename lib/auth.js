import { useAuth } from "@/app/context/AuthContext";

export async function logout(refresh) {
    const { token } = useAuth();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (typeof refresh === "function") {
        refresh();
    }
    window.location.href = '/';
}