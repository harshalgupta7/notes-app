import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required').transform((val) => val.trim()),
    userName: z.string().min(1, 'Username is required').transform((val) => val.trim()),
    email: z.string().email('Invalid email address').transform((val) => val.trim().toLowerCase()),
    password: z.string().min(6, 'Password must be at least 6 characters').transform((val) => val.trim()),
    confirmedPassword: z.string().min(1, 'Re-enter your password'),
    acceptTerms: z.literal('on', {
        errorMap: () => ({ message: "Please accept our terms and conditions." })
    }).optional(),
}).refine((data) => data?.password === data?.confirmedPassword, {
    message: "Password do not match",
    path: ["confirmedPassword"],
});

export const loginSchema = z.object({
    userName: z.string().min(1, 'Username is required').transform((val) => val.trim()),
    password: z.string().min(6, 'Password must be at least 6 characters').transform((val) => val.trim())
});