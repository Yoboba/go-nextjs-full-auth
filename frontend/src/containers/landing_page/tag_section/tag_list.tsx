"use client"
import LoadingSkeleton from "@/components/my_ui/loading_skeleton";
import MyTag from "@/components/my_ui/my_tag";
import url from "@/constants/url";
import useGET from "@/hooks/use_GET";
import { Suspense } from "react";

interface TagsProps {
    id : number;
    name : string;
}

export default function TagList() {
    const tags = useGET(url.baseUrl.V1, url.endPoints.getTag)
    
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <div className=" flex gap-2 flex-wrap">
                <Suspense fallback={<LoadingSkeleton/>}>
                    {tags.map((value:TagsProps) => <MyTag key={value.id} tag_name={value.name}/>)}
                </Suspense>
            </div>
        </div>
    )
}