import Link from "next/link";
import ThemeSwitcher from "@/components/my_ui/theme_switcher_button";
import { routes } from "@/constants/routes";
import { getCookie } from "@/lib/cookies";

export default function Navigation() {
    const jwt = getCookie("jwt")
    const username = getCookie("username")
    return (
        <div className="flex items-center justify-center gap-6 text-g1 font-medium">
            <Link href={routes.ROOT} className=" hover:underline text-base">
                Home
            </Link>
            {jwt === undefined &&
                <div className="flex items-center gap-5">
                    <Link href={routes.SIGN_IN} className="hover:underline text-base">
                        Sign In
                    </Link>
                    <Link href={routes.SIGN_UP} className=" hover:underline text-base">
                        Sign Up
                    </Link>
                </div>
            }
            <ThemeSwitcher />
        </div>
    )
}