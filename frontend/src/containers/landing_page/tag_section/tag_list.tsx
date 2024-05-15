"use client";
import MyTag from "@/components/my_ui/my_tag";
import { Skeleton } from "@/components/ui/skeleton";
import url from "@/constants/url";
import { useState, useEffect } from "react";

interface TagsProps {
    id: number;
    name: string;
}

export default function TagList() {
    const [tags, setTags] = useState<TagsProps[]>([]);

    useEffect(() => {
        fetch(url.getTag, { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                setTags(data.data);
            })
            .catch((error) => {
                console.error("Error fetching tags:", error);
            });
    }, []);

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 flex-wrap">
                {tags.length === 0 ? (
                    <Skeleton/>
                ) : (
                    tags.map((tag) => <MyTag key={tag.id} tag_name={tag.name} />)
                )}
            </div>
        </div>
    );
}
