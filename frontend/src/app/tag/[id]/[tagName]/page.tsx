import NavbarSection from "@/containers/landing_page/navbar_section";
import BlogsSection from "@/containers/tag_page/blogs_section";
import HeaderSection from "@/containers/tag_page/header_section";

export default function TagBlogPage({params}:Readonly<{params: {id : number, tagName : string}}>) {
    return (
        <div>
        <NavbarSection/>
            <div className="w-full h-full flex flex-col items-center ">
                <HeaderSection tagName={params.tagName}/>
                <BlogsSection id={params.id}/>
            </div>
        </div>
    )
}