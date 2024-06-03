"use client"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { 
    Avatar, 
    AvatarImage, 
    AvatarFallback 
} from "@/components/ui/avatar";
import ImageDropzone from "./image_dropzone";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { routes } from "@/constants/routes";
import { 
    IconPhotoEdit, 
    IconLogin2, 
    IconSettings,
    IconHearts,
    IconBooks
} from '@tabler/icons-react';

interface MyAvatarProps {
    username : string | undefined;
}

export default function MyAvatar(props: MyAvatarProps) {
    const [profileImage, setProfileImage] = useState(null)
    
    function profileImageOnChange(acceptedFiles: any) {
        setProfileImage(acceptedFiles);
    }

    function preventDefault(e : React.MouseEvent) {
        e.preventDefault();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className=" bg-g5 drop-shadow-md">
                    <AvatarImage src={profileImage ? URL.createObjectURL(profileImage) : ""} alt="Profile Image"/>
                    <AvatarFallback className=" bg-transparent">G</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
                            <ImageDropzone onImageSubmit = {profileImageOnChange} />
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
                { props.username ? 
                    <div>
                        <Link href={`/${props.username}`}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <IconBooks size={20}/>
                                My Blogs
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <IconSettings size={20}/>
                            Setting
                        </DropdownMenuItem>
                        <Link href={`/${props.username}/hearted`}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <IconHearts size={20}/> 
                                Hearted
                            </DropdownMenuItem>
                        </Link>
                    </div>
                :
                    <Link href={routes.SIGN_IN}>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <IconLogin2 size={20}/>
                            Sign In
                        </DropdownMenuItem>
                    </Link>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
