import NavbarSectionIndex from "@/containers/landing_page/navbar_section";
import BlogSectionIndex from "../containers/landing_page/blog_section";
import TagSectionIndex from "../containers/landing_page/tag_section";

export default function LandingPage() {

  return (
    <div>
      <NavbarSectionIndex/>
      <main className="flex justify-center">
        <BlogSectionIndex/>
        <TagSectionIndex/>
      </main>
    </div>
  )
}

