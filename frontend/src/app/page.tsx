import NavbarSectionIndex from "@/containers/landing_page/navbar_section";
import TagSectionIndex from "../containers/landing_page/tag_section";
import GlobalBlogSection from "@/containers/landing_page/global_blog_section";

export default function LandingPage() {

  return (
    <div>
      <NavbarSectionIndex/>
      <main className="flex justify-center">
        <GlobalBlogSection/>
        <TagSectionIndex/>
      </main>
    </div>
  )
}

