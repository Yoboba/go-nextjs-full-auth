import NavbarSection from "@/containers/landing_page/navbar_section";
import TagSection from "../containers/landing_page/tag_section";
import GlobalBlogSection from "@/containers/landing_page/global_blogs_section";

export default function LandingPage() {

  return (
    <div>
      <NavbarSection/>
      <main className="flex justify-center">
        <GlobalBlogSection/>
        <div className=" w-[1px] bg-gray-300 h-screen sticky top-0"/>
        <TagSection/>
      </main>
    </div>
  )
}

