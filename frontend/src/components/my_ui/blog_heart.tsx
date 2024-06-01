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
  token: string | undefined;
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
    if (props.username !== undefined && props.token !== undefined) {
      getLikeStatus().then((res) => {
        setLiked(res.data);
      });
    }
  }, [liked]);

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
        "username=" +
        props.username +
        "&blogId=" +
        props.blog_id,
      {
        method: "GET",
        headers: {
          "Authorization" : `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    return data;
  }

  async function deleteLike() {
    const response = await fetch(url.client.DeleteLike + props.blog_id, {
      method : "DELETE",
      headers : {
        "Authorization" : `Bearer ${props.token}`,
        "Content-Type" : "application/json"
      }
    })
    const data = await response.json()
    return data
  }
  
  async function createLike() {
    const response = await fetch(url.client.CreateLike + props.blog_id, {
      method : "POST",
      headers : {
        "Authorization" : `Bearer ${props.token}`,
        "Content-Type" : "application/json"
      }
    })
    const data = await response.json()
    return data
  }

  async function handleLike() {
    if (props.username === undefined && props.token === undefined) {
      router.push(routes.SIGN_IN);
      toast({
        title: "Please Sign In...",
        description: "User need to sign in before being able to like the blog",
      });
    } else {
      if (liked === true ) {
        const res = await deleteLike()
        if (res.status === 401) { 
          router.replace(routes.SIGN_IN)
        }
      } else {
        const res = await createLike()
        if (res.status === 401) { 
          router.replace(routes.SIGN_IN)
        }
      }
      setLiked(!liked)
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
