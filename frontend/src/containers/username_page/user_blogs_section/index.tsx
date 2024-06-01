import Blog from "@/components/my_ui/blog"
import url from "@/constants/url"
import { getCookie } from "@/lib/cookies"

export default async function UserBlogsSection() {
    const username = getCookie("username")
    async function getUserBlogs() {
        const response = await fetch(url.server.getUserBlogs + `?username=${username?.value}` + "&tagId=", {
            method : "GET",
            headers : {
                "Content-type" : "application/json",
            }
        })
        const data = await response.json()
        return data
    }
    const res = await getUserBlogs()

    return (
        <div className="h-full w-full bg-white flex flex-col items-center justify-center overflow-scroll gap-5 pb-8">
            {res.data.map((blog:any) => (
                <Blog key={blog.id} id={blog.id} author={blog.username} title={blog.title} caption={blog.caption} body={blog.body} dateTime={blog.created_at}/>
            ))}
        </div>
    )
}