import { 
    IconCubePlus, 
    IconTag 
} from "@tabler/icons-react";
import TagList from "./tag_list";
import Line from "@/components/ui/line";
import LoadingSkeleton from "@/components/my_ui/loading_skeleton";
import { Suspense } from "react";

export default function TagSectionIndex() {
    return (
        <section className="flex flex-col gap-4 h-screen w-1/4 bg-white p-8 border-l-2 border-gray-100">
            <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                    <h2 className="text-xl font-semibold text-g2">Tags</h2>
                    <IconTag size={20} className="text-g2" />
                </div>
                <IconCubePlus size={20}  className="rounded-lg text-g2 cursor-pointer hover:bg-g4/25 transition-colors"/>
            </div>
            <Line height="h-[2px]" color="bg-g4/25"/>
            <Suspense fallback={<LoadingSkeleton/>}>
                <TagList/>
            </Suspense>
        </section>
    )
}