"use client";
import { Button } from "@/components/ui/button";
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



export default function LandingMain() {
  return (
    <main className="flex justify-center">
      <section className="flex h-screen w-full flex-col gap-5 bg-white p-8 dark:bg-black">
        <div className="flex justify-between">
          <div className="relative flex h-14 w-40 items-center">
            <h2 className="relative text-3xl text-g2 font-semibold">My Blogs</h2>
            <IconMessageShare className="absolute right-0 top-0 text-g2" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Tabs defaultValue="ascending">
              <TabsList className=" bg-g5">
                <TabsTrigger value="ascending">ASC</TabsTrigger>
                <TabsTrigger value="descending">DSC</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="ghost" className="py-6 px-2">
              <IconCubePlus size={40} className=" text-g2"/>
            </Button>
          </div>
        </div>
        <div className="h-[5px] rounded-full bg-gray-100" />
      </section>

      <section className={" h-screen w-1/4 bg-white p-4 border-l-2 border-gray-100"}>
        <div className="flex justify-center gap-2">
          <h2 className="text-xl font-semibold text-g1">Tags</h2>
          <IconTag size={30} className="text-g1" />
        </div>
      </section>
    </main>
  );
}
