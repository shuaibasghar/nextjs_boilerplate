import SignIn from "@/components/forms/SignIn";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
    const session = await getServerSession(authConfig);

    if (session) redirect("/profile");
    return (
        <div className="p-5 bg-[url('/cyan-blur.png')] bg-no-repeat bg-cover  min-h-screen flex items-center justify-center">
            <SignIn />
        </div>
    );
}

export default page;
