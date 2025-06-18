import { db } from "@/lib/primsa_singleton/db";
import { registerSchema } from "@/lib/zod_schema/register";
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs';
import { setAuthCookies, signAccessToken, signRefreshToken } from "@/lib/jwt/jwt";

export async function POST(req) {
    try {
        const contentLength = req.headers.get('content-length');

        if (contentLength && parseInt(contentLength) === 0) return NextResponse.json(
            { message: "no body content in request" },
            { status: 400 }
        );

        const body = await req.json();
        const safeBody = registerSchema?.safeParse(body);

        if (!safeBody?.success) {
            return NextResponse.json(
                { message: 'Invalid Input', errors: safeBody?.error?.flatten() },
                { status: 400 }
            );
        }

        const { name, userName, email, password, confirmedPassword } = body;

        const existingUser = await db.user.findFirst({
            where: { OR: [{ email }, { userName }] }
        });

        if (existingUser) return NextResponse.json(
            { message: "Email or username already taken" },
            { status: 409 }
        );

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name,
                userName,
                email,
                password: hashedPassword,
                lastLogin: new Date()
            }
        });

        const accessToken = signAccessToken({
            userId: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
            role: newUser.role
        });

        const refreshToken = signRefreshToken({ userId: newUser.id });

        await db.user.update({
            where: { id: newUser.id },
            data: { refreshToken }
        });

        setAuthCookies(accessToken, refreshToken);

        return NextResponse.json(
            {
                message: "Welcome to Notes App, You've successfully registered",
                user_details: {
                    name: newUser.name,
                    user_name: newUser.userName,
                    email: newUser.email
                },
                role: newUser.role,
                last_login_dateTime: newUser.lastLogin,
                targetUrl: `${process.env.BASE_URL}dashboard/create`
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error -- RegisterationApiPOST",
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