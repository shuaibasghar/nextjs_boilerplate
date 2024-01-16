"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export function GoogleSignInButton() {
    const handleClick = () => {
        signIn("google");
        redirect("/profile");
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            <Image
                src={"/google.png"}
                alt="Google Logo"
                width={20}
                height={20}
            />
            <span className="ml-4">Continue with Google</span>
        </button>
    );
}

export function GithubSignInButton() {
    const handleClick = () => {
        signIn("github");
        redirect("/profile");
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            <Image
                src={"/github.png"}
                alt="Github Logo"
                width={20}
                height={20}
            />
            <span className="ml-4">Continue with Github</span>
        </button>
    );
}
