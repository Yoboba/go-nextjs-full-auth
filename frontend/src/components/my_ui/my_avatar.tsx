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
import MyImageDropzone from "@/components/my_ui/my_image_dropzone";

export default function MyAvatar() {
    const [profileImage, setProfileImage] = useState(null)
    const profileImageOnChange = (acceptedFiles: any) => {
        setProfileImage(acceptedFiles);
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Avatar className=" bg-g4 drop-shadow-md">
                    <AvatarImage src={profileImage ? URL.createObjectURL(profileImage) : ""} alt="Profile Image"/>
                    <AvatarFallback className=" bg-transparent">G</AvatarFallback>
                </Avatar>
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
                <MyImageDropzone onImageSubmit = {profileImageOnChange} />
            </DialogContent>
        </Dialog>
    )
}
