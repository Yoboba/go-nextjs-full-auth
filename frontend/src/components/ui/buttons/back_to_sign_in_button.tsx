import Link from "next/link";
import { routes } from "@/constants/route";
import { Button } from "./button";
import { IconArrowBackUp } from "@tabler/icons-react";

export default function BackToSignInButton() {
    return (
        <Link href={routes.SIGN_IN}>
                <Button variant='ghost' className="inline-flex items-center gap-2 text-[#949494] font-medium hover:bg-transparent">
                    <IconArrowBackUp/>
                    Back to sign in
                </Button>
            </Link>
    )
}