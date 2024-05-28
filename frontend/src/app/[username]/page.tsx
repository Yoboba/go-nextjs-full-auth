import NavbarSectionIndex from "@/containers/landing_page/navbar_section"
import BlogSectionIndex from "@/containers/username_page/blog_section"
export default function UsernamePage({params}:Readonly<{params: {username:string}}>) {
    return (
        <div>
            <NavbarSectionIndex/>
            <BlogSectionIndex/>
        </div>
    )
}