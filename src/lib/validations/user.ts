import * as z from "zod";

export const UserValidation = z.object({
    name: z
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(30, { message: "Maximum 30 characters." }),

    email: z.string().email({ message: "Invalid email format." }),

    password: z
        .string()
        .min(6, { message: "Minimum 6 characters." })
        .max(30, { message: "Maximum 30 characters." })
        .regex(/[a-zA-Z0-9]{6,}/, {
            message:
                "Password must contain at least 6 alphanumeric characters.",
        }),
});

export const UserLoginValidation = z.object({
    email: z.string().email({ message: "Invalid email format." }),
    password: z.string(),
});
