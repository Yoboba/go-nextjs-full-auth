import BlogAvatar from "./blog_avatar";
import { 
    IconDots,
    IconBookmarkPlus,
} from '@tabler/icons-react';
import BlogHeart from "./blog_heart";
import { months } from "@/constants/months";
import { getCookie } from "@/lib/cookies";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface BlogProps {
    id : number;
    author : string;
    title : string;
    caption : string;
    body : string;
    dateTime : Date;
}

export default function Blog(props: Readonly<BlogProps>) {
    const username = getCookie("username")
    const token = getCookie("jwt")
    const date = new Date(props.dateTime)
    // TODO :  fetch tag from blog id

    return (
        <div className="flex w-1/2 h-1/2  items-center p-8  rounded-xl transition-all border gap-1">
            <div className="flex flex-col justify-between w-full h-full space-y-6 ">
                <BlogAvatar username={props.author}/>
                <main>
                    <Link href={`/blog/${props.id}`} className="text-3xl font-semibold text-g1 hover:text-g3 rounded-xl w-fit transition-all cursor-pointer">{props.title}</Link>
                    <p className=" text-sm">{props.caption}</p>
                </main>
                <div className="flex items-center gap-5 text-sm">
                    <p>{months[date.getMonth()-1]} {date.getDate()}</p>
                    <div className="flex items-center gap-1">
                        <BlogHeart username={username?.value} blog_id={props.id} token={token?.value}/>
                    </div>
                    <IconBookmarkPlus size={20} className="cursor-pointer"/>
                    <IconDots size={20} className="cursor-pointer"/>
                </div>
            </div>
            <Skeleton className="h-[150px] w-[200px] bg-gray-200 rounded-xl"/>
        </div>
    )
}