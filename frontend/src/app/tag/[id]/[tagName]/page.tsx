import BlogsSection from "@/containers/tag_page/tag_blogs_section";
import HeaderSection from "@/containers/tag_page/header_section";

export default function BlogPage({params}:Readonly<{params: {id : number, tagName : string}}>) {
    return (
        <div className="w-full h-full flex flex-col items-center ">
            <HeaderSection tagName={params.tagName}/>
            <BlogsSection id={params.id}/>
        </div>
    )
}