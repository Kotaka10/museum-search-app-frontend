export async function logoutAPI(token, logout, refresh) {
    if (!token) return;

    logout();

    if (typeof refresh === "function") {
        refresh();
    }
    window.location.href = '/';
}