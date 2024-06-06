"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ImageDropzone from "./image_dropzone";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { routes } from "@/constants/routes";
import {
  IconPhotoEdit,
  IconLogin2,
  IconSettings,
  IconHearts,
  IconBooks,
  IconLogout2,
} from "@tabler/icons-react";
import ThemeSwitcher from "@/components/my_ui/theme_switcher_button";
import url from "@/constants/url";

interface MyAvatarProps {
  username: string | undefined;
}

export default function MyAvatar(props: MyAvatarProps) {
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  async function signOut() {
    const response = await fetch(url.client.SignOut, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    router.push(routes.ROOT);
    router.refresh();
  }

  function profileImageOnChange(acceptedFiles: any) {
    setProfileImage(acceptedFiles);
  }

  function preventDefault(e: React.MouseEvent) {
    e.preventDefault();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className=" bg-g5 drop-shadow-md">
          <AvatarImage
            src={profileImage ? URL.createObjectURL(profileImage) : ""}
            alt="Profile Image"
          />
          <AvatarFallback className=" bg-transparent">G</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" mt-5">
        <DropdownMenuItem onClick={preventDefault}>
          <Dialog>
            <DialogTrigger className="flex items-center gap-2">
              <IconPhotoEdit size={20} />
              Profile Image
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className=" text-xl font-semibold text-g1">
                  Change your profile image
                </DialogTitle>
                <DialogDescription className=" text-sm font-medium">
                  Update your image here..
                </DialogDescription>
              </DialogHeader>
              <ImageDropzone onImageSubmit={profileImageOnChange} />
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        {props.username ? (
          <div>
            <Link href={`/${props.username}`}>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <IconBooks size={20} />
                My Blogs
              </DropdownMenuItem>
            </Link>
            <Link href={`/${props.username}/hearted`}>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <IconHearts size={20} />
                Hearted
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <IconSettings size={20} />
              Setting
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={signOut}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IconLogout2 size={20} />
              Sign Out
            </DropdownMenuItem>
          </div>
        ) : (
          <div>
            <Link href={routes.SIGN_IN}>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <IconLogin2 size={20} />
                Sign In
              </DropdownMenuItem>
            </Link>
            <Link href={routes.SIGN_UP}>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <IconLogin2 size={20} />
                Sign Up
              </DropdownMenuItem>
            </Link>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={preventDefault}>
          <ThemeSwitcher />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
