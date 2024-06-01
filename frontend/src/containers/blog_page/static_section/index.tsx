import { IconArrowBackUp } from "@tabler/icons-react"
import BackButton from "@/components/my_ui/back_button"
import { routes } from "@/constants/routes"
import url from "@/constants/url"

interface StaticSectionProps {
    blogId : number
}
export default async function StaticSection(props:StaticSectionProps) {
    async function getBlogById() {
        const response = await fetch(url.server.GetBlogById + props.blogId, {
            method : "GET",
            headers : {
                "Content-type" : "application/json"
            }
        })
        const data = await response.json()
        return data
    }
    const res = await getBlogById()

    return (
        <div className="w-full h-full flex flex-col items-center p-8 gap-5">
            <h1 className="text-5xl text-g2 font-bold">{res.data.title}</h1>
            <div className="w-full h-[3px] bg-gray-200 rounded-md"/>
            <h2 className="text-xl text-g3 font-medium">{res.data.caption}</h2>
            <div className="w-full h-[3px] bg-gray-200 rounded-md"/>
            <div className="w-full h-full text-wrap flex flex-wrap break-all justify-center">
                <p className="text-base text-g1 font-normal ">{res.data.body}</p> 
            </div>
            <BackButton icon={<IconArrowBackUp/>} text={"Back to home"} route={routes.ROOT}/>
        </div>
    )
}