export async function logoutAPI(logout, refresh) {
    logout();

    if (typeof refresh === "function") {
        refresh();
    }
    window.location.href = '/';
}