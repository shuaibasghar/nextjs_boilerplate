"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserValidation } from "@/lib/validations/user";
import { GithubSignInButton, GoogleSignInButton } from "../shared/AuthButton";
import Link from "next/link";
import { registerUser } from "@/lib/actions/user.actions";
import { useRouter, redirect, usePathname } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof UserValidation>) {
        const { name, email, password } = values;
        const response = await registerUser({ name, email, password });
        router.push("/sign-in");
    }

    return (
        <Form {...form}>
            <div className="lg:w-[500px] md:w-[400px] w-[350px]  shadow-lg p-5 rounded-lg border-t-4 border-blue-600">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-8"
                >
                    <h1 className=" text-4xl   font-bold ">Sign Up</h1>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="focus:outline-none px-6 py-6  "
                                        type="text"
                                        placeholder="name"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        className=" bg-[#3aaff4] text-white  hover:bg-blue-600 hover:text-white px-3 rounded-md  w-full py-6"
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
                <p className="text-sm text-right mt-3">
                    Already have an account?
                    <Link href={"/sign-in"} className="text-blue-600">
                        Sign in
                    </Link>
                </p>
            </div>
        </Form>
    );
}
