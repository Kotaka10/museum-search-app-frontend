import { useAuth } from "@/app/context/AuthContext";

export async function logoutAPI(refresh) {
    const { token, logout } = useAuth();

    if (!token) return;

    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error("ログアウトに失敗しました", err);
    } finally {
        logout();

        if (typeof refresh === "function") {
            refresh();
        }
        window.location.href = '/';
    }
}