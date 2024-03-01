import {
  IconMessageShare,
  IconCubePlus,
  IconTag,
} from "@tabler/icons-react";
import {
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import TagList from "./tag_list";



export default function LandingMain() {
  return (
    <main className="flex justify-center">
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
            <IconCubePlus size={40} className="rounded-lg text-g2 cursor-pointer hover:bg-g4/25 transition-colors"/>
          </div>
        </div>
        <div className="h-[3px] rounded-full bg-g4/25" />
      </section>
      <section className={"flex flex-col gap-2 h-screen w-1/4 bg-white p-4 border-l-2 border-gray-100"}>
        <div className="flex gap-2 items-center">
          <h2 className="text-xl font-semibold text-g2">Tags</h2>
          <IconTag size={20} className="text-g2" />
        </div>
        <div className="h-[3px] rounded-full bg-g4/25" />
        <TagList/>
      </section>
    </main>
  );
}
