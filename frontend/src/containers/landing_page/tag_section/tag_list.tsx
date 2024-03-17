"use client"
import MyTag from "@/components/my_ui/my_tag";
import url from "@/constants/url";
import useGetMethod from "@/hooks/rest_api/use_get_method";

interface TagsProps {
    id : number;
    name : string;
}

export default function TagList() {
    const tags = useGetMethod(url.baseUrl.V1, url.endPoints.getTag)
    
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <div className=" flex gap-2 flex-wrap">
                {tags.map((value:TagsProps) => <MyTag key={value.id} tag_name={value.name}/>)}
            </div>
        </div>
    )
}