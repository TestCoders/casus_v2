"use client"

import {useDataStore} from "@/lib/store";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


export function UserButton() {
    const [signedIn, signOut] = useDataStore((state) => [state.signedIn, state.signOut]);
    const router = useRouter();

    if (signedIn) {
        return (
            <Button variant={"default"} size={"default"} onClick={async () => {
                await signOut()
            }}
                    suppressHydrationWarning
            >
                Sign out
            </Button>

        )
    }

    return (
        <Button onClick={() => router.push("/auth/sign-in")} suppressHydrationWarning>
            Sign in
        </Button>
    )
}