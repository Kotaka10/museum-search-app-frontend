export async function logoutAPI(logout) {
    logout();

    window.location.href = '/';
}