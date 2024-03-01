import Link from "next/link";
import { pages } from "@/constants/enum";
import { IconSquareForbid2 } from "@tabler/icons-react";
import ThemeSwitcher from "@/components/ui/theme_switcher";
import MyAvatar from "@/components/my_ui/my_avatar";

export default function LandingNavBar() {

  return (
    <nav className="top-0 z-10 flex h-16 items-center justify-between bg-white pl-5 pr-5 drop-shadow-sm dark:bg-black">
      {/* Logo */}
      <div className="flex justify-end items-end gap-1">
        <IconSquareForbid2 size={50} className="text-g2"/>
        <h2 className=" font-bold text-2xl text-g2">L O C K</h2>
      </div>
        
      {/* Profile */}
      <div className="flex items-center justify-center gap-3">
        <MyAvatar/>
        <div className=" flex flex-col items-start justify-center">
          <h2 className=" text-g1 text-2xl font-bold">Yobubble</h2>
          <p className=" text-g1 text-xs font-medium">
            Thanachot.onl@student.mahidol.ac.th
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center justify-center gap-6 text-g2">
        <Link href={pages.SIGN_IN} className=" font-semibold hover:underline">
          Login
        </Link>
        <Link href={pages.ADMIN} className=" font-semibold hover:underline">
          Dashboard
        </Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
