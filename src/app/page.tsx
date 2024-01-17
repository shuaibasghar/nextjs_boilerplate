import Image from "next/image";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { profile } from "console";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page() {
    // const session = await getServerSession(authConfig);

    // console.log("Session: ", session);

    // if (session) return redirect("/profile");

    return (
        <div className="bg-[url('/cyan-blur.png')] w-full flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center mt-10 p-10 shadow-md">
                <h1 className="mt-10 mb-4 text-4xl font-bold">WELCOME</h1>

                <Link
                    className="bg-blue-600 text-white px-6 py-5 text-center font-semibold rounded-xl mt-10 w-full  "
                    href={"/sign-in"}
                >
                    Login
                </Link>
                <span className="text-2xl font-semibold text-white text-center mt-8">
                    Or
                </span>
                {/* <CredentialsSignInButton /> */}
                {/* <CredentialsForm /> */}
            </div>
        </div>
    );
}
