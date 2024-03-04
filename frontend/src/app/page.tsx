import Logo from "../pages/landing_page/navbar_section/logo"
import Navigation from "../pages/landing_page/navbar_section/navigation"
import Profile from "../pages/landing_page/navbar_section/profile"
import BlogSection from "../pages/landing_page/blog_section/blog_section";
import TagSection from "../pages/landing_page/tag_section/tag_section";

export default function LandingPage() {

  return (
    <div>
      <nav className="top-0 z-10 flex h-16 items-center justify-between bg-white pl-5 pr-5 drop-shadow-sm dark:bg-black">
        <Logo/>
        <Profile/>
        <Navigation/>
      </nav>
      <main className="flex justify-center">
        <BlogSection/>
        <TagSection/>
      </main>
    </div>
  )
}

