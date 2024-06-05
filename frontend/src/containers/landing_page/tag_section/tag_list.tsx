"use client";
import { useState, useEffect } from "react";
import MyTag from "@/components/my_ui/my_tag";
import url from "@/constants/url";
interface TagsProps {
  id: number;
  name: string;
}

export default function TagList() {
  const [tags, setTags] = useState<TagsProps[]>([]);

  async function getTag() {
    const response = await fetch(url.client.GetTag, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getTag()
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        return (
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 flex-wrap">Error or No tag found...</div>
          </div>
        );
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <MyTag key={tag.id} name={tag.name} id={tag.id} />
        ))}
      </div>
    </div>
  );
}
