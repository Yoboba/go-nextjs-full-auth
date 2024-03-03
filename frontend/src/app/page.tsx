import Logo from "./_components/logo"
import Navigation from "./_components/navigation"
import Profile from "./_components/profile"
import BlogSection from "./_components/blog_section";
import TagSection from "./_components/tag_section";

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

