"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    console.log("Session:", session);
    if (!session) {
        router.push("/sign-in");
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
                <div>
                    {session?.user?.image && (
                        <Image
                            src={session?.user?.image}
                            width={400}
                            height={400}
                            alt="Profile Image"
                        />
                    )}
                </div>
                <div>
                    Name:{" "}
                    <span className="font-bold">{session?.user?.name}</span>
                </div>
                <div>
                    Email:{" "}
                    <span className="font-bold">{session?.user?.email}</span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}
