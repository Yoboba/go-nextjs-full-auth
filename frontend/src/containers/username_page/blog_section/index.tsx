import {
    IconMessageShare,
    IconCubePlus,
} from "@tabler/icons-react";
import Line from "@/components/ui/line";
import BlogDrawer from "@/containers/username_page/blog_section/blog_drawer";
import SearchBar from "./searchbar";
import Filter from "./filter";

export default function BlogSectionIndex() {
    
    return (
        <section className="flex h-screen w-full flex-col gap-5 bg-white p-8 dark:bg-black">
            <div className="flex justify-between">
                <div className="flex items-center gap-5">
                    <div className="relative flex h-14 w-40 items-center">
                        <h2 className="relative text-3xl text-g2 font-semibold">My Blogs</h2>
                        <IconMessageShare className="absolute right-0 top-0 text-g2" />
                    </div>
                    <SearchBar/>
                    <Filter/>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <BlogDrawer triggerElement={<IconCubePlus size={40} className="rounded-lg text-g2 cursor-pointer hover:bg-g4/25 transition-colors"/>}/>
                </div>
            </div>
            <Line height="h-[2px]" color="bg-g4/25"/>
        </section>
    );
}