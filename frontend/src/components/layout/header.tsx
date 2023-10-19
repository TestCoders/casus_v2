

import Image from "next/image";
import Link from "next/link";
import {UserButton} from "@/components/layout/user-button";

export function Header() {
    return (
        <header data-testid={"header"} className={"sticky top-0 z-50 w-full bg-gray-800"}>
            <nav className={"mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-2 lg:px-4"}>
                <Link href={"/"}>
                    <Image src={"/imtdb.svg"} alt={"The imtdb logo"} height={30} width={70} />
                </Link>
                <div className={"flex space-x-8"}>
                    <Link href={"/movies"} className={"text-white leading-6"}>Movies</Link>
                </div>
                <UserButton />
            </nav>
        </header>
    )
}