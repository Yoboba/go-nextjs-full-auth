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
    if (res.status !== 200) {
        console.error("Error Fetching Blog Info : ", res.error)
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-8 gap-5">
            <h1 className="w-2/3 text-5xl text-center text-g2 font-bold border-b-2 border-gray-100 pb-6 leading-relaxed">{res.data.title}</h1>
            <h2 className="w-2/3 text-xl text-center text-g3 font-medium border-b-2 border-gray-100 pb-6">{res.data.caption}</h2>
            <div className="w-2/3 h-full text-center text-wrap flex flex-wrap justify-center">
                <p className="text-base text-g1 font-normal ">{res.data.body}</p> 
            </div>
            <BackButton icon={<IconArrowBackUp />} text={"Back to home"} route={routes.ROOT}/>
        </div>
    )
}