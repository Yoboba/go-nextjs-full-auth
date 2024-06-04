"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import url from "@/constants/url"
import { IconDots } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { messages } from "@/constants/messages"

interface BlogOptionProps {
    username : string | undefined
    author : string
    token : string | undefined
    blogId : number
}
export default function BlogOption(props:BlogOptionProps) {
    const router = useRouter()
    const { toast } = useToast()
    async function deleteBlog() {
        const response = await fetch(url.server.DeleteBlogById + props.blogId, {
            method : "DELETE",
            headers : {
                "Authorization" : `Bearer ${props.token}`,
                "Content-type" : "application/json"
            }
        })
        const data = await response.json()
        return data
    }

    async function handleDelete() {
        const res = await deleteBlog()
        if (res.status !== 200) {
            toast({
                variant : "destructive",
                title : messages.errorMessage,
                description : messages.deleteBlogFailedDescription
            })
        } else {
            toast({
                title : messages.deleteBlogSucceedTitle,
                description : messages.deleteBlogSucceedDescription
            })
        }
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <IconDots size={20} className="cursor-pointer"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Follow Author</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Mute Author</DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">Report Story...</DropdownMenuItem>
                { props.username === props.author && 
                    <div>
                        <DropdownMenuSeparator/>
                        <Link href={`/blog/${props.blogId}`}>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                    </div>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}