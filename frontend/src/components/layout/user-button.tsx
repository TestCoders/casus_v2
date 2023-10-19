"use client"

import Link from "next/link";
import {useDataStore} from "@/lib/store";
import {Button, buttonVariants} from "@/components/ui/button";
import {useRouter} from "next/navigation";


export function UserButton() {
    const [signedIn, signOut] = useDataStore((state) => [state.signedIn, state.signOut]);
    const router = useRouter();

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
            <Button onClick={() => router.push("/auth/sign-in")} >
                Sign in
            </Button>
        </div>
    )
}