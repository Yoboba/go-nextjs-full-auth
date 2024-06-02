import Blog from "@/components/my_ui/blog"
import url from "@/constants/url"
interface BlogsSectionProps {
    id : number
}

export default async function BlogsSection(props:Readonly<BlogsSectionProps>) {
    async function getBlogByTagId() {
        const response = await fetch(url.server.getBlog + `username=&tagId=${props.id}`, {
            method : "GET",
            headers : {
                "Content-type" : "application/json"
            }
        })
        const data = response.json()
        return data
    }
    const res = await getBlogByTagId()
    if (res.data === null) {
        return (
            <main className=" text-xl font-light text-red-200">
                No blog found...
            </main>
        )
    } else {
        return (
            <main className=" text-4xl  text-g1 w-1/2 h-1/2 flex flex-col gap-2 ">
                {res.data.map((blog : any) => (
                    <Blog key={blog.id} id={blog.id} author={blog.username} title={blog.title} caption={blog.caption} body={blog.body} dateTime={blog.updated_at}/>
                ))}
            </main>
        )
    }
}