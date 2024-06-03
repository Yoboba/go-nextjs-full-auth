import BlogAvatar from "./blog_avatar";
import { 
    IconBookmarkPlus,
} from '@tabler/icons-react';
import BlogHeart from "./blog_heart";
import { months } from "@/constants/months";
import { getCookie } from "@/lib/cookies";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import BlogOption from "./blog_option";


interface BlogProps {
    id : number;
    author : string;
    title : string;
    caption : string;
    body : string;
    dateTime : Date;
}

export default async function Blog(props: Readonly<BlogProps>) {
    const username = getCookie("username")
    const token = getCookie("jwt")
    const date = new Date(props.dateTime)
    // TODO :  fetch tag from blog id

    return (
        <div className="flex w-[1000px] h-[250px]  items-center p-8  rounded-xl transition-all border gap-2">
            <div className="flex flex-col justify-between w-full h-full ">
                <BlogAvatar username={props.author}/>
                <main>
                    <Link href={`/blog/${props.id}`} className="text-3xl font-semibold text-g1 hover:text-g3 rounded-xl w-fit transition-all cursor-pointer">{props.title}</Link>
                    <p className=" text-sm">{props.caption}</p>
                </main>
                <div className="flex items-center gap-5 text-sm">
                    <p>{months[date.getMonth()]} {date.getDate()}</p>
                    <div className="flex items-center gap-1">
                        <BlogHeart username={username?.value} blog_id={props.id} token={token?.value}/>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <IconBookmarkPlus size={20} className="cursor-pointer"/>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Coming Soon!</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <BlogOption username={username?.value} author={props.author} token={token?.value} blogId={props.id}/>
                </div>
            </div>
            <Skeleton className="h-[150px] w-[150px] rounded-xl"/>
        </div>
    )
}