import { cookies } from "next/headers";

export function getCookie(name: string) {
    const cookiestore = cookies()
    const cookie = cookiestore.get(name);
    return cookie;
}

export function getAllCookies() {
    const cookiestore = cookies()
    return cookiestore;
}