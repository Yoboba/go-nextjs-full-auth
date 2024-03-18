import {
    IconMessageShare,
    IconCubePlus,
} from "@tabler/icons-react";
import {
    Tabs, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import Line from "@/components/ui/line";
import BlogDrawer from "@/containers/landing_page/blog_section/blog_drawer";

export default function BlogSectionIndex() {
    
    return (
        <section className="flex h-screen w-full flex-col gap-5 bg-white p-8 dark:bg-black">
            <div className="flex justify-between">
                <div className="relative flex h-14 w-40 items-center">
                    <h2 className="relative text-3xl text-g2 font-semibold">My Blogs</h2>
                    <IconMessageShare className="absolute right-0 top-0 text-g2" />
                </div>
                <div className="flex items-center justify-center gap-4">
                    <Tabs defaultValue="ascending">
                        <TabsList className=" bg-g5">
                            <TabsTrigger value="ascending">ASC</TabsTrigger>
                            <TabsTrigger value="descending">DSC</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <BlogDrawer triggerElement={<IconCubePlus size={40} className="rounded-lg text-g2 cursor-pointer hover:bg-g4/25 transition-colors"/>}/>
                </div>
            </div>
            <Line height="h-[2px]" color="bg-g4/25"/>
        </section>
    );
}