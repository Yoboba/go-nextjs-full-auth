import Logo from "./logo";
import Navigation from "./navigation";
import Profile from "./profile";

export default function NavbarSection() {
    return (
        <nav className="top-0 z-10 flex h-16 items-center justify-between bg-white pl-5 pr-5 dark:bg-black border-b-[1px] border-gray-200">
            <Logo/>
            <Profile/>
            <Navigation/>
        </nav>
    )
}