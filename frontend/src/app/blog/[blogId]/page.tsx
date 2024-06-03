import url from "@/constants/url";
import DynamicSection from "@/containers/blog_page/dynamic_section";
import StaticSection from "@/containers/blog_page/static_section";
import { getCookie } from "@/lib/cookies";

export default async function BlogPage({params}:Readonly<{params: {blogId : number}}>) {
    const token = getCookie("jwt")
    const username = getCookie("username")
    async function getBlogById() {
        const response = await fetch(url.server.GetBlogById + params.blogId, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await response.json()
        return data
    }
    const res = await getBlogById()
    if (token === undefined || res.data.username !== username?.value) {
        return <StaticSection blogId={params.blogId}/>
    } else {
        return <DynamicSection username={username!.value} blogId={params.blogId} token={token.value}/>
    }
}