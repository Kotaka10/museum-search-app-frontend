import Cookies from "js-cookie";

export function logout(refresh) {
    Cookies.remove('token');
    if (typeof refresh === "function") {
        refresh();
    }
    window.location.href = '/';
}