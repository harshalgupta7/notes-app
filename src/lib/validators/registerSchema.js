import { db } from "../primsa_singleton/db";

export async function isEmailTaken(email) {
    try {
        if (!email || email?.trim() === "") return false;

        return await db.user.findFirst({ where: { email } }) !== null;

    } catch (error) {
        console.group("Fn() - isEmailTaken");
        console.error("message : ", error?.message);
        console.error("cause : ", error?.cause);
        console.error("stack : ", error?.stack);
        console.error("error_obj: ", error);
        console.groupEnd();
    }
};

export async function isUserNameTaken(userName) {
    try {
        if (!userName || userName?.trim() === "") return false;

        return await db.user.findFirst({ where: { userName } }) !== null;

    } catch (error) {
        console.group("Fn() - isUserNameTaken");
        console.error("message : ", error?.message);
        console.error("cause : ", error?.cause);
        console.error("stack : ", error?.stack);
        console.error("error_obj: ", error);
        console.groupEnd();
    }
};