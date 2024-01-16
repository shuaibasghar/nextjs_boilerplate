import Image from "next/image";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { profile } from "console";

export default async function page() {
    // const session = await getServerSession(authConfig);

    // console.log("Session: ", session);

    // if (session) return redirect("/profile");

    return (
        <div className="bg-[url('/cyan-blur.png')] w-full flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center mt-10 p-10 shadow-md">
                <h1 className="mt-10 mb-4 text-4xl font-bold">WELCOME</h1>
                <p>/sign-in</p>
                <p>/sign-up</p>
                <span className="text-2xl font-semibold text-white text-center mt-8">
                    Or
                </span>
                {/* <CredentialsSignInButton /> */}
                {/* <CredentialsForm /> */}
            </div>
        </div>
    );
}
