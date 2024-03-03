import Link from "next/link";
import ThemeSwitcher from "@/components/ui/theme_switcher";
import { pages } from "@/constants/enum";

export default function Navigation() {
    return (
        <div className="flex items-center justify-center gap-6 text-g2">
            <Link href={pages.SIGN_IN} className=" font-semibold hover:underline">
                Login
            </Link>
            <Link href={pages.ADMIN} className=" font-semibold hover:underline">
                Dashboard
            </Link>
            <ThemeSwitcher />
        </div>
    )
}