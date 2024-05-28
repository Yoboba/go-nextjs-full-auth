import {
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "../ui/avatar"

interface BlogAvatarProps {
    username : string;
}

export default function BlogAvatar(props: BlogAvatarProps) {
    return (
        <div className="flex items-center gap-2">
            <Avatar className=" bg-g5 h-7 w-7">
                <AvatarImage src={""} alt="Profile Image"/>
                <AvatarFallback className=" bg-transparent text-xs">G</AvatarFallback>
            </Avatar>
            <p className="text-sm">{props.username}</p>
        </div>
    )
}