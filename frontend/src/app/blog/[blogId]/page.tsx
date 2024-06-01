import DynamicSection from "@/containers/blog_page/dynamic_section";
import StaticSection from "@/containers/blog_page/static_section";
import { getCookie } from "@/lib/cookies";

export default function BlogPage({params}:Readonly<{params: {blogId : number}}>) {
    const token = getCookie("jwt")
    const username = getCookie("username")
    if (token === undefined) {
        return <StaticSection blogId={params.blogId}/>
    } else {
        return <DynamicSection username={username!.value} blogId={params.blogId} token={token.value}/>
    }
}