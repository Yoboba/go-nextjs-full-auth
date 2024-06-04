import SearchBar from "@/containers/username_page/functional_section/searchbar";
import Logo from "./logo";
import Profile from "./profile";
import ThemeSwitcher from "@/components/my_ui/theme_switcher_button";

export default function NavbarSection() {
    return (
        <nav className="top-0 z-10 flex h-16 items-center justify-between bg-white pl-5 pr-5 dark:bg-black border-b-[1px] border-gray-200">
            <div className="flex gap-5 items-center">
                <Logo/>
                <SearchBar/>
            </div>
            <Profile/>
        </nav>
    )
}