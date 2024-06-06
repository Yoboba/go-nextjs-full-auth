"use client";
import { useRouter } from "next/navigation";
import BackButton from "@/components/my_ui/back_button";
import { Button } from "@/components/ui/button";
import url from "@/constants/url";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { toastMessages } from "@/constants/messages";

interface DynamicSectionProps {
  blogId: number;
  username: string;
  token: string;
}

export default function DynamicSection(props: DynamicSectionProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    caption: "",
    body: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  async function getBlogById() {
    const response = await fetch(url.client.GetBlogById + props.blogId, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  async function updateBlogbyId() {
    const response = await fetch(url.client.UpdateBlog + props.blogId, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(blogInfo),
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getBlogById()
      .then((res: any) =>
        setBlogInfo({
          title: res.data.title,
          caption: res.data.caption,
          body: res.data.body,
        }),
      )
      .catch((err) => {
        console.error("Error fetching Blog info : ", err);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogInfo({
      ...blogInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateBlogbyId();
    if (res.status !== 200) {
      toast({
        variant: "destructive",
        title: toastMessages.errorMessage,
        description: toastMessages.updateBlogFailedDescription,
      });
    } else {
      toast({
        title: toastMessages.updateBlogSucceedTitle,
        description: toastMessages.updateBlogSucceedDescription,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-5">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-4"
        >
          <Input
            type="text"
            name="title"
            value={blogInfo.title}
            onChange={handleChange}
            className="text-5xl text-g2 font-bold border-none shadow-none pt-12 pl-5 pb-12"
          />
          <div className="w-full h-[2px] bg-gray-200 rounded-md" />
          <Input
            type="text"
            name="caption"
            value={blogInfo.caption}
            onChange={handleChange}
            className="text-xl text-g3 font-medium border-none shadow-none"
          />
          <div className="w-full h-[2px] bg-gray-200 rounded-md " />
          <Textarea
            name="body"
            value={blogInfo.body}
            onChange={handleChange}
            className="w-full h-full text-wrap flex flex-wrap break-all justify-center text-base text-g1 font-normal border-none shadow-none"
          />
          <Button
            type="submit"
            className="bottom-0 bg-g3 hover:bg-g4 text-white font-semibold py-2 px-4 rounded"
          >
            Save
          </Button>
        </form>
      ) : (
        <>
          <h1 className="w-2/3 text-5xl text-center text-g2 font-bold border-b-2 border-gray-100 pb-6 leading-relaxed">
            {blogInfo.title}
          </h1>
          <h2 className="w-2/3 text-xl text-center text-g3 font-medium border-b-2 border-gray-100 pb-6">
            {blogInfo.caption}
          </h2>
          <div className="w-2/3 h-full text-center text-wrap flex flex-wrap break-all justify-center">
            <p className="text-base text-g1 font-normal">{blogInfo.body}</p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-g3 text-white font-semibold py-2 px-4 rounded-xl hover:bg-g4"
          >
            Edit
          </Button>
        </>
      )}
      <BackButton
        icon={<IconArrowBackUp />}
        text={"Back to previous page"}
        route={""}
        onClick={() => {
          router.back();
        }}
      />
    </div>
  );
}
