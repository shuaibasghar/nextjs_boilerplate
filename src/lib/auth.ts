import bcrypt from "bcryptjs";
import { connectToDB } from "./mongoose";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import UserModel from "./models/user.model";

interface Credentials {
    email: string;
    passoword: string;
}
export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials as {
                        email: string;
                        password: string;
                    };
                    await connectToDB();
                    const user = await UserModel.findOne({ email });
                    console.log("user:", user);
                    if (!user) {
                        return null;
                    }
                    console.log(
                        "user.password,",
                        user.password,
                        "password",
                        password
                    );
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    console.log("passwordsMatch:", passwordsMatch);
                    if (!passwordsMatch) {
                        console.log("Passwords do not match");
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),

        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};

// export async function loginIsRequiredServer() {
//     await connectToDB();
//     const session = await getServerSession(authConfig);
//     if (!session) return redirect("/");
// }

// export function loginIsRequiredClient() {
//     if (typeof window !== "undefined") {
//         const session = useSession();
//         const router = useRouter();
//         if (!session) router.push("/sign-in");
//     }
// }
