export async function logout(refresh) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    if (typeof refresh === "function") {
        refresh();
    }
    window.location.href = '/';
}