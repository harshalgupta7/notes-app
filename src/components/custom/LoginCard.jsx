"use client"
import { React, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/lib/zod_schema/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginCard() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const apiCallForLogin = async (data) => {
        try {
            if (loading) return;

            setLoading(true);

            await toast.promise(
                (async () => {
                    const response = await fetch("http://localhost:3000/api/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });

                    setLoading(false);

                    if (response?.status === 404)
                        throw new Error("Login failed. Please try again later.")
                    else {
                        const responseData = await response?.json();

                        if (response?.status === 200)
                            return responseData;
                        else if (response?.status !== 200)
                            throw new Error(responseData?.message);
                    }

                })(),
                {
                    loading: "Signing you in...",
                    success: (data) => {
                        handleRedirect(data?.targetUrl);
                        return `Hello, ${data?.user_details?.name}! 👋`;
                    },
                    error: (err) => (err?.message),
                });

        } catch (e) {
            console.group("apiCallForLogin");
            console.error("message : ", e?.message);
            console.error("cause : ", e?.cause);
            console.error("stack : ", e?.stack);
            console.error("error_obj: ", e);
            console.groupEnd();
        }
    };

    const handleRedirect = (url) => {
        try {
            router.push(url);
        } catch (e) {
            console.group("handleRedirect");
            console.error("message : ", e?.message);
            console.error("cause : ", e?.cause);
            console.error("stack : ", e?.stack);
            console.error("error_obj: ", e);
            console.groupEnd();
        }
    };

    return (
        <Card className="w-[350px]">
            <form onSubmit={handleSubmit(apiCallForLogin)}>
                <CardHeader className="my-4 font-mono">
                    <CardTitle className="font-mono text-[#433575]">BONJOUR</CardTitle>
                    <CardDescription className="font-serif text-[#8667f7]">Enter your credentials.</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid w-full gap-4">

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username" className="text-[#433575]">Username</Label>
                            <Input {...register("userName")} className="font-mono text-[#8667f7]" id="username" placeholder="username" />
                            {errors?.userName && (<p className="text-[12px] text-red-500">{errors?.userName?.message}</p>)}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password" className="text-[#433575]">Password</Label>
                            <Input {...register("password")} className="font-mono text-[#8667f7]" id="password" type="password" placeholder="password" />
                            {errors?.password && (<p className="text-[12px] text-red-500">{errors?.password?.message}</p>)}
                        </div>

                    </div>
                </CardContent>

                <CardFooter className="flex justify-between mt-4">
                    <Button type="submit" className="cursor-pointer text-white" disabled={loading}>
                        SIGN IN
                    </Button>
                    <Link href="/register">
                        <span className="text-sm font-serif text-[#433575]">Register</span>
                    </Link>
                </CardFooter>

            </form>
        </Card>

    )
}
