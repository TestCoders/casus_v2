"use client"

import Link from "next/link";
import {useForm} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useDataStore} from "@/lib/store";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters",
    }),
    password: z.string(),
});

export function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });
    const signIn = useDataStore((state) => state.signIn);
    const {toast} = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);

        await signIn(formData, toast);
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
                                Did you remember your password?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={"flex items-center justify-between text-sm text-muted-foreground space-x-2"}>
                    <Button type="submit">Sign in</Button>
                    <div>No account yet? <Link className={"underline "} href={"/auth/sign-up"}>Click here to sign up</Link></div>
                </div>
            </form>
        </Form>
    )
}
