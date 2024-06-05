import Blog from "@/components/my_ui/blog";
import url from "@/constants/url";
import { getCookie } from "@/lib/cookies";

export default async function BlogSection() {
  const token = getCookie("jwt");
  async function getBlogByLike() {
    const response = await fetch(url.server.GetBlogByLike, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
  const res = await getBlogByLike();
  if (res.data === null) {
    return (
      <section className="h-full w-full bg-white flex flex-col items-center justify-center overflow-y-auto gap-5 pl-8 pr-8 pb-8 pt-8">
        <p className=" text-g3 font-light text-2xl">
          Error or No blog found...
        </p>
      </section>
    );
  } else {
    return (
      <section className="h-full w-full bg-white flex flex-col items-center justify-center overflow-auto gap-5 pl-8 pr-8 pb-8 pt-8">
        {res.data.map((blog: any) => (
          <Blog
            key={blog.id}
            id={blog.id}
            title={blog.title}
            caption={blog.caption}
            body={blog.body}
            dateTime={blog.updated_at}
            author={blog.username}
          />
        ))}
      </section>
    );
  }
}
