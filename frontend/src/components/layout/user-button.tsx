"use client"

import Link from "next/link";
import {useDataStore} from "@/lib/store";
import {Button, buttonVariants} from "@/components/ui/button";


export function UserButton() {
    const signedIn = useDataStore((state) => state.signedIn);
    const signOut = useDataStore((state) => state.signOut)
    console.log(signedIn)

    if (signedIn) {
        return (
            <div>
                <Button variant={"default"} size={"default"} onClick={async () => {
                    await signOut()
                }}>
                    Sign out
                </Button>
            </div>

        )
    }

    return (
        <div>
            <Link href={"/auth/sign-in"} className={buttonVariants({size: "default", variant: "default"})}>
                Sign in
            </Link>
        </div>
    )
}