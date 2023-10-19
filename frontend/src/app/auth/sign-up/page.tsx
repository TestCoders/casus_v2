import Image from "next/image"
import {SignUpForm} from "@/components/forms/auth/sign-up-form";

export default function SigninPage() {
    return (
        <div className={"flex flex-col items-center justify-center space-y-4"}>
            <Image src={"/imtdb.svg"} alt={"The imtdb logo"} height={76} width={197} />
            <SignUpForm />
        </div>
    )
}