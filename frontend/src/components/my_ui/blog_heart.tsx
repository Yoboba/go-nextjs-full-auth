"use client";
import url from "@/constants/url";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";

interface BlogHeartProps {
  username: string | undefined;
  blog_id: number;
}

export default function BlogHeart(props: Readonly<BlogHeartProps>) {
  // TODO : hanlde when click, triggered to fetch like count again
  const router = useRouter();
  const { toast } = useToast();
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getLikeCount().then((res) => {
      if (res.data === null) {
        setLikeCount(0);
      } else {
        setLikeCount(res.data.like);
      }
    });
    if (props.username !== undefined) {
      getLikeStatus().then((res) => {
        setLiked(res.data);
      });
    }
  }, []);

  async function getLikeCount() {
    const response = await fetch(url.client.GetLike + props.blog_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
  async function getLikeStatus() {
    const response = await fetch(
      url.client.GetLikeStatus +
        "?username=" +
        props.username +
        "&blogId=" +
        props.blog_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    return data;
  }

  function handleLike() {
    // TODO : handle like
    if (props.username === undefined) {
      router.push(routes.SIGN_IN);
      toast({
        title: "Please Sign In...",
        description: "User need to sign in before being able to like the blog",
      });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLike}>
        {liked ? (
          <IconHeartFilled size={20} className=" text-red-500 cursor-pointer" />
        ) : (
          <IconHeart size={20} className="  cursor-pointer" />
        )}
      </button>
      <p>{likeCount}</p>
    </div>
  );
}
