"use client"
import { React, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "../ui/checkbox"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { registerSchema } from "@/lib/zod_schema/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

export function SignUpCard() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    const [loading, setLoading] = useState(false);

    const apiCallForRegistration = async (data) => {
        try {
            if (loading) return;

            setLoading(true);

            await toast.promise(
                (async () => {
                    const response = await fetch("http://localhost:3000/api/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });

                    setLoading(false);

                    if (response.status === 404)
                        throw new Error("Signup failed. Please try again later.")
                    else {
                        const responseData = await response.json();

                        if (response.status === 201)
                            return responseData;
                        else if (response.status !== 201)
                            throw new Error(responseData?.message);
                    }

                })(),
                {
                    loading: "Signing up...",
                    success: (data) => (`Signup complete! Hello, ${data?.user_details?.user_name}! 👋`),
                    error: (err) => (err?.message),
                });

        } catch (e) {
            console.group("apiCallForRegistration");
            console.error("message : ", e?.message);
            console.error("cause : ", e?.cause);
            console.error("stack : ", e?.stack);
            console.error("error_obj: ", e);
            console.groupEnd();
        }
    };

    return (
        <Card className="w-[350px]">
            <form onSubmit={handleSubmit(apiCallForRegistration)}>
                <CardHeader className="my-4 font-mono">
                    <CardTitle className="font-mono">BONJOUR</CardTitle>
                    <CardDescription className="font-serif">Enter your credentials.</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="fullName">Name</Label>
                            <Input {...register("name")} className="font-mono" id="fullName" placeholder="Full Name" />
                            {errors?.name && (<p className="text-[12px] text-red-500">{errors?.name?.message}</p>)}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email")} className="font-mono" id="email" type="email" placeholder="@gmail.com" />
                            {errors?.email && (<p className="text-[12px] text-red-500">{errors?.email?.message}</p>)}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input {...register("userName")} className="font-mono" id="username" placeholder="username" />
                            {errors?.userName && (<p className="text-[12px] text-red-500">{errors?.userName?.message}</p>)}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register("password")} className="font-mono" id="password" type="password" placeholder="password" />
                            {errors?.password && (<p className="text-[12px] text-red-500">{errors?.password?.message}</p>)}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="rePassword">Re-enter Password</Label>
                            <Input {...register("confirmedPassword")} className="font-mono" id="rePassword" type="password" placeholder="password" />
                            {errors?.confirmedPassword && (<p className="text-[12px] text-red-500">{errors?.confirmedPassword?.message}</p>)}
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox  {...register("acceptTerms")} className="cursor-pointer" id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Accept terms and conditions
                                    </label>
                                </div>
                                {errors?.acceptTerms && (<p className="text-[12px] text-red-500">{errors?.acceptTerms?.message}</p>)}
                            </div>

                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between mt-4">
                    <Button type="submit" className="cursor-pointer" disabled={loading}>
                        SIGN UP
                    </Button>
                    <Link href="/">
                        <span className="text-sm underline font-serif text-gray-700">Already Registered?</span>
                    </Link>
                </CardFooter>

            </form>
        </Card>

    )
}
