import BlogAvatar from "./blog_avatar";
import { 
    IconDots,
    IconBookmarkPlus,
} from '@tabler/icons-react';
import BlogHeart from "./blog_heart";
import { months } from "@/constants/months";
import { getCookie } from "@/lib/cookies";

interface BlogProps {
    id : number;
    author : string;
    articleName : string;
    articleDescription : string;
    dateTime : Date;
}

export default function Blog(props: Readonly<BlogProps>) {
    const username = getCookie("username")
    const date = new Date(props.dateTime)
    // TODO :  fetch tag from blog id

    return (
        <div className="flex w-3/5 h-3/8 justify-between items-center p-8 shadow-none hover:shadow-xl rounded-xl transition-all border gap-4">
            <div className="flex flex-col justify-between h-full">
                <BlogAvatar username={props.author}/>
                <main className=" space-y-1">
                    <h2 className="text-3xl font-semibold text-g1">{props.articleName}</h2>
                    <p className=" text-sm">{props.articleDescription}</p>
                </main>
                <div className="flex items-center gap-5 text-sm">
                    <p>{months[date.getMonth()-1]} {date.getDate()}</p>
                    <div className="flex items-center gap-1">
                        <BlogHeart username={username?.value} blog_id={props.id}/>
                    </div>
                    <IconBookmarkPlus size={20} className="cursor-pointer"/>
                    <IconDots size={20}/>
                </div>
            </div>
            <div className="h-[150px] w-[150px] bg-gray-200 rounded-xl"/>
        </div>
    )
}