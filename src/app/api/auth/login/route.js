import { db } from "@/lib/primsa_singleton/db";
import { loginSchema } from "@/lib/zod_schema/register";
import { NextResponse } from "next/server";
import { compare } from 'bcryptjs';

export async function POST(req) {
    try {
        const contentLength = req.headers.get('content-length');

        if (contentLength && parseInt(contentLength) === 0) return NextResponse.json(
            { message: "no body content in request" },
            { status: 400 }
        );

        const body = await req.json();
        const safeBody = loginSchema?.safeParse(body);

        if (!safeBody?.success) {
            return NextResponse.json(
                { message: 'Invalid Input', errors: safeBody?.error?.flatten() },
                { status: 400 }
            );
        }

        const { userName, password } = safeBody.data;

        const user = await db.user.findUnique({ where: { userName } });

        if (!user) return Response.json(
            { message: `${userName} does not exist` },
            { status: 422 });

        const passwordCheck = await compare(password, user.password);

        if (!passwordCheck) return NextResponse.json({ message: "Incorrect Password" }, { status: 401 });

        return NextResponse.json(
            {
                message: "Welcome to Notes App, You've successfully logged in",
                user_details: {
                    name: user.name,
                    user_name: user.userName,
                    email: user.email
                },
                role: user.role,
                last_login_dateTime: user.lastLogin,
                targetUrl: `${process.env.BASE_URL}dashboard`
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error -- LoginApiPOST",
                error_info: {
                    message: error?.message,
                    cause: error?.cause,
                    stack: error?.stack,
                    error_obj: error
                }
            },
            { status: 500 }
        );
    }
};