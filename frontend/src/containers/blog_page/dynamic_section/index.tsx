"use client"
import BackButton from "@/components/my_ui/back_button"
import { routes } from "@/constants/routes"
import url from "@/constants/url"
import { IconArrowBackUp } from "@tabler/icons-react"
import { useEffect, useState } from "react"

interface DynamicSectionProps {
    blogId : number
    username : string
    token : string
}

export default function DynamicSection(props: DynamicSectionProps) {
    const [blogInfo, setBlogInfo] = useState({
        title: "", 
        caption: "",
        body: "",
    })
    const [isEditing, setIsEditing] = useState(false);

    async function getBlogById() {
        const response = await fetch(url.client.GetBlogById + props.blogId, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await response.json()
        return data
    }

    useEffect(() => {
        getBlogById().then((res: any) => setBlogInfo({
            title: res.data.title,
            caption: res.data.caption,
            body: res.data.body
        }))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlogInfo({
            ...blogInfo,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(url.client.UpdateBlog + props.blogId, {
            method: "PUT",
            headers: {
                "Authorization" : `Bearer ${props.token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(blogInfo)
        });
        if (response.ok) {
            setIsEditing(false);
        } else {
            // Handle error
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-8 gap-5">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <input 
                        type="text" 
                        name="title" 
                        value={blogInfo.title} 
                        onChange={handleChange} 
                        className="text-5xl text-g2 font-bold" 
                    />
                    <div className="w-full h-[3px] bg-gray-200 rounded-md"/>
                    <input 
                        type="text" 
                        name="caption" 
                        value={blogInfo.caption} 
                        onChange={handleChange} 
                        className="text-xl text-g3 font-medium" 
                    />
                    <div className="w-full h-[3px] bg-gray-200 rounded-md"/>
                    <textarea 
                        name="body" 
                        value={blogInfo.body} 
                        onChange={handleChange} 
                        className="w-full h-full text-wrap flex flex-wrap break-all justify-center text-base text-g1 font-normal" 
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
                </form>
            ) : (
                <>
                    <h1 className="text-5xl text-g2 font-bold">{blogInfo.title}</h1>
                    <div className="w-full h-[3px] bg-gray-200 rounded-md"/>
                    <h2 className="text-xl text-g3 font-medium">{blogInfo.caption}</h2>
                    <div className="w-full h-[3px] bg-gray-200 rounded-md"/>
                    <div className="w-full h-full text-wrap flex flex-wrap break-all justify-center">
                        <p className="text-base text-g1 font-normal">{blogInfo.body}</p> 
                    </div>
                    <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white py-2 px-4 rounded">Edit</button>
                </>
            )}
            <BackButton icon={<IconArrowBackUp/>} text={"Back to home"} route={routes.ROOT}/>
        </div>
    )
}
