import {  
    IconTag 
} from "@tabler/icons-react";
import TagList from "./tag_list";
import Line from "@/components/ui/line";


export default function TagSection() {
    return (
        <section className="flex flex-col gap-4 h-screen w-1/4 bg-white p-8 border-l-2 border-gray-100">
            <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                    <h2 className="text-xl font-semibold text-g2">Tags</h2>
                    <IconTag size={20} className="text-g2" />
                </div>
            </div>
            <Line height="h-[2px]" color="bg-g4/25"/>    
            <TagList/>
        </section>
    )
}