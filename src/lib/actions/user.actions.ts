"use server";
import bcrypt from "bcryptjs";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { RegisterUser } from "@/lib/types/types";

export async function registerUser({
    name,
    email,
    password,
}: RegisterUser): Promise<{ status: string; message: string }> {
    try {
        connectToDB();
        const userExist = await User.findOne({ email });
        if (userExist) throw new Error("User already exists");
        const user = await User.create({ name, email, password });
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword:", hashedPassword);
        user.password = hashedPassword;
        await user.save();
        console.log(user);
        return { status: "OK", message: "User created successfully" };
    } catch (error: any) {
        // throw new Error(`Failed to create register user:${error?.message}`);
        return {
            status: "ERROR",
            message: ` ${error.message}`,
        };
    }
}
