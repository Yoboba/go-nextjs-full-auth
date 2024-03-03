import { IconCubePlus } from "@tabler/icons-react";
import MyTag from "@/components/my_ui/my_tag";

export default function TagList() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <IconCubePlus size={20}  className="rounded-lg text-g2 cursor-pointer hover:bg-g4/25 transition-colors"/>
            <div className=" flex gap-2 flex-wrap">
                <MyTag tag_name="Novel"/>
                <MyTag tag_name="Coding"/>
                <MyTag tag_name="Travel"/>
            </div>
        </div>
    )
}