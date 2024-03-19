import Link from "next/link";
import ThemeSwitcher from "@/components/my_ui/theme_switcher_button";
import { routes } from "@/constants/route";

export default function Navigation() {
    return (
        <div className="flex items-center justify-center gap-6 text-g2">
            <Link href={routes.SIGN_IN} className=" font-semibold hover:underline">
                Login
            </Link>
            <Link href={routes.ADMIN} className=" font-semibold hover:underline">
                Dashboard
            </Link>
            <ThemeSwitcher />
        </div>
    )
}