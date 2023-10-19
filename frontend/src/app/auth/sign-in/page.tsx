"use client"

import Image from "next/image"
import {SignInForm} from "@/components/forms/auth/sign-in-form";
import {useDataStore} from "@/lib/store";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function SigninPage() {
    const signedIn = useDataStore((state) => state.signedIn)

    return (
        <div className={"flex flex-col items-center justify-center space-y-4"}>
            <Image src={"/imtdb.svg"} alt={"The imtdb logo"} height={76} width={197} />
            {signedIn && (
                <div className={"my-12 space-y-4 text-center"}>
                    <div>Successfully signed in</div>
                    <div className={"flex space-x-2"}>
                        <Link href={"/movies"} className={buttonVariants({variant: "default", size: "default"})}>View movies</Link>
                        <Link href={"/"} className={buttonVariants({variant: "outline", size: "default"})}>Homepage</Link>
                    </div>
                </div>
            )}
            {!signedIn && (
                <SignInForm />
            )}
        </div>
    )
}