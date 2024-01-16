"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserLoginValidation, UserValidation } from "@/lib/validations/user";
import { GithubSignInButton, GoogleSignInButton } from "../shared/AuthButton";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default function SignIn() {
    const router = useRouter();
    const form = useForm<z.infer<typeof UserLoginValidation>>({
        resolver: zodResolver(UserLoginValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof UserLoginValidation>) {
        try {
            const { email, password } = values;

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            console.log("Sign in response", res);
            if (res?.error) {
                form.setError("email", {
                    type: "manual",
                    message: "Invalid email or password",
                });
                return;
            }
            router.replace("/profile");
        } catch (error) {}
    }

    return (
        <Form {...form}>
            <div className="lg:w-[500px] md:w-[400px] w-[350px]  shadow-lg p-5 rounded-lg border-t-4 border-blue-600">
                <h1 className="text-4xl   font-semibold  ">Sign In</h1>

                <GithubSignInButton />
                <GoogleSignInButton />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-8 mt-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="focus:outline-none px-6 py-6  "
                                        type="email"
                                        placeholder="email"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="focus:outline-none px-6 py-6  "
                                        type="password"
                                        placeholder="password"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="bg-[#3aaff4] text-white hover:text-white px-3 hover:bg-blue-600  w-full py-6"
                        type="submit"
                    >
                        Sign In
                    </Button>
                </form>
                <p className="text-sm text-right mt-5">
                    Don't have an account?
                    <Link href={"/sign-up"} className="text-blue-600">
                        Sign Up
                    </Link>
                </p>
            </div>
        </Form>
    );
}
