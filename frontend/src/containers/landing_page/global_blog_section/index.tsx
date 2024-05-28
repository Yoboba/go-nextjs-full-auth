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
        <section className="flex items-center h-screen w-full flex-col gap-5 bg-white p-8 dark:bg-black">
            {res.data.map((blog:any) => (
                <Blog key={blog.id} id={blog.id} author={blog.username} articleName={blog.title} articleDescription={blog.caption} dateTime={blog.created_at}/>
            ))}
        </section>
    )
}
