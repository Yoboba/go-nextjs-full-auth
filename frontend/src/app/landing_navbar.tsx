import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pages } from "@/constants/enum";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IconSquareForbid2 } from "@tabler/icons-react";

import ImageDropzone from "./image_dropzone";
import ThemeSwitcher from "@/components/ui/theme_switcher";

export default function LandingNavBar() {
  return (
    <nav className="top-0 z-10 flex h-16 items-center justify-between bg-white pl-5 pr-5 drop-shadow-sm dark:bg-black">
      <div className="flex justify-end items-end gap-1">
        <IconSquareForbid2 size={50} className="text-g2"/>
        <h2 className=" font-bold text-2xl text-g2">L O C K</h2>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Dialog>
          <DialogTrigger>
            <Avatar className=" bg-g4 drop-shadow-md">
              <AvatarImage />
            </Avatar>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className=" text-xl font-semibold">
                Change your profile image
              </DialogTitle>
              <DialogDescription className=" text-sm font-medium">
                Update your image here..
              </DialogDescription>
            </DialogHeader>
            <ImageDropzone />
          </DialogContent>
        </Dialog>
        <div className=" flex flex-col items-start justify-center">
          <h2 className=" text-g1 text-2xl font-bold">Yoboba</h2>
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
