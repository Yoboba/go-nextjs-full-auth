import Logo from "./logo";
import Navigation from "./navigation";
import Profile from "./profile";

export default function NavbarSectionIndex() {
    return (
        <nav className="top-0 z-10 flex h-16 items-center justify-between bg-white pl-5 pr-5 drop-shadow-sm dark:bg-black">
            <Logo/>
            <Profile/>
            <Navigation/>
        </nav>
    )
}