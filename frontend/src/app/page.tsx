import NavbarSectionIndex from "@/containers/landing_page/navbar_section";
import TagSectionIndex from "../containers/landing_page/tag_section";
import GlobalBlogSection from "@/containers/landing_page/global_blog_section";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {

  return (
    <div>
      <NavbarSectionIndex/>
      <main className="flex justify-center">
        <GlobalBlogSection/>
        <div className=" w-[1px] bg-gray-300 h-screen"/>
        <TagSectionIndex/>
      </main>
    </div>
  )
}

