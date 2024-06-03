import NavbarSection from "@/containers/landing_page/navbar_section"
import BlogSection from "@/containers/username_page/hearted_page/blogs_section"

export default function UsernameHeartedPage({params}:{params: {username:string}}) {
    return (
        <div>
            <NavbarSection/>
            <BlogSection/>
        </div>
    )
}