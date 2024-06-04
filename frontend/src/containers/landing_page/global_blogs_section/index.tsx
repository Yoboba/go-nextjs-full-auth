import Blog from "@/components/my_ui/blog";
import url from "@/constants/url";

export default async function GlobalBlogSection() {
    async function getBlogs() {
        const response = await fetch(url.server.getBlog + "userId=&tagId=", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        return data
    }
    const res = await getBlogs()
    if (res.data === null) {
        return (
            <section className="flex flex-col items-center h-full w-full gap-5  dark:bg-black overflow-auto p-8 ">
                <p className=" text-g3 font-thin text-2xl">Error or No blog found...</p>
            </section>
        )
    } else {
        return (
            <section className="flex flex-col items-center h-full w-full gap-5  dark:bg-black overflow-auto p-8">
                {res.data.map((blog:any) => (
                    <Blog key={blog.id} id={blog.id} author={blog.username} title={blog.title} caption={blog.caption} body={blog.body} dateTime={blog.updated_at}/>
                ))}
            </section>
        )
    }
}
