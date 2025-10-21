import { NextResponse } from "next/server";

export function middleware(request) {
    const accessToken = request?.cookies?.get("access_token")?.value;

    if (!accessToken && request?.nextUrl?.pathname?.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request?.url));
    }

    //Allow request to continue
    return NextResponse.next();
}