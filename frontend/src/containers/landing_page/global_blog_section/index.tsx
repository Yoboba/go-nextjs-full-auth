import Blog from "@/components/my_ui/blog";
import url from "@/constants/url";

export default async function GlobalBlogSection() {
    async function getBlogs() {
        const response = await fetch(url.server.getBlog + "?userId=&tagId=", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        return data
    }
    const res = await getBlogs()
    return (
        <section className="flex flex-col items-center h-full w-full gap-5  dark:bg-black overflow-scroll pt-12 pb-12 border-r-2 border-gray-100">
            {res.data.map((blog:any) => (
                <Blog key={blog.id} id={blog.id} author={blog.username} title={blog.title} caption={blog.caption} body={blog.body} dateTime={blog.created_at}/>
            ))}
        </section>
    )
}
