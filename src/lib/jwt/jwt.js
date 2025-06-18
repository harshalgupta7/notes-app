import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export function signAccessToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function signRefreshToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function setAuthCookies(accessToken, refreshToken) {
    try {
        const cookie = cookies();

        cookie.set("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 15,
        });

        cookie.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        });

    } catch (e) {
        console.group("setAuthCookies");
        console.error("message : ", e?.message);
        console.error("cause : ", e?.cause);
        console.error("stack : ", e?.stack);
        console.error("error_obj: ", e);
        console.groupEnd();
    }
}