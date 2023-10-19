"use client"

import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {passwordObject} from "@/components/forms/auth/helpers";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters",
    }),
    password: passwordObject,
    confirmPassword: passwordObject,
}).superRefine(({password, confirmPassword}, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords don't match",
        })
    }
});

export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder={"Username"} {...field} autoComplete={"username"} />
                            </FormControl>
                            <FormDescription>
                                This will be your public username
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder={"Password"} {...field} type={"password"} autoComplete={"current-password"} />
                            </FormControl>
                            <FormDescription>
                                Minimum length: 8, at least one upper case, lower case and special character
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input placeholder={"Password"} {...field} type={"password"} autoComplete={"current-password"} />
                            </FormControl>
                            <FormDescription>
                                Should be the same ;)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={"flex items-center justify-between text-sm text-muted-foreground"}>
                    <Button type="submit">Sign up</Button>
                    <div>Already signed up? <Link className={"underline "} href={"/auth/sign-in"}>Click here to sign in</Link></div>
                </div>
            </form>
        </Form>
    )
}
