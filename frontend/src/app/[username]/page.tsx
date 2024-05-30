import NavbarSectionIndex from "@/containers/landing_page/navbar_section"
import FunctionalSectionIndex from "@/containers/username_page/functional_section"
import UserBlogsSection from "@/containers/username_page/user_blogs_section"
export default function UsernamePage({params}:Readonly<{params: {username:string}}>) {
    return (
        <div>
            <NavbarSectionIndex/>
            <FunctionalSectionIndex/>
            <div className="h-full w-full overflow-scroll">
                <UserBlogsSection/>
            </div>
        </div>
    )
}