"use client"
import { Form } from "@/components/ui/form"
import MyFormField from "@/components/my_ui/my_form_field"
import { IconMailFilled } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import MyFormTextArea from "@/components/my_ui/my_form_textarea"
import TagFormField from "./tag_form_field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import * as z from "zod"
import url from "@/constants/url"
import { useRouter } from "next/navigation"
interface BlogFormProps {
    token : string | undefined
}

export default function BlogForm(props:Readonly<BlogFormProps>) {
    const router = useRouter()
    const { toast } = useToast()
    const blogFormSchema = z.object({
        title: z.string().min(1,"Title cannot be empty"),
        caption: z.string().min(1, "Caption cannot be empty"),
        body: z.string().min(1, "Body cannot be empty"),
        tags: z.array(z.object({ name: z.string() })).nonempty({message: "Must have at least one tag per blog"}),
    })
    const form = useForm<z.infer<typeof blogFormSchema>>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            title: "",
            caption: "",
            body: "",
            tags: [],
        },
    })
    const { reset } = form;

    async function onSubmit(values: z.infer<typeof blogFormSchema>, ) {
        if (props.token === undefined) {
            toast({
                variant : "destructive",
                title : "Token undefined"
            })
        } else {
            const response = await fetch(url.client.CreateBlog, {
                method : "POST",
                headers: {
                    "Authorization": `Bearer ${props.token}`,
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(values)
            })
            const res = await response.json()
            if (res.status === 200) {
                toast({
                    title : "Successfully created the blog"
                })
                reset()
                router.refresh()
            } else {
                toast({
                    variant : "destructive",
                    title : "Fail to create the blog"
                })
            }
        }
    }
    
    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                    {/* title */}
                    <MyFormField
                        form={form} 
                        value="title" 
                        placeholder="Title"
                        icon={<IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />}
                    />
                    {/* caption */}
                    <MyFormField
                        form={form} 
                        value="caption" 
                        placeholder="captions"
                        icon={<IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />}
                    />
                    {/* body */}
                    <MyFormTextArea
                        form={form}
                        value="body" 
                        placeholder={"Your Story"} 
                    />
                    {/* tag */}
                    <TagFormField
                        form={form}
                        value="tags"
                        placeholder="tags"
                    />
                    {/* submit button */}
                    <Button type="submit" className="w-full cursor-pointer text-white text-md rounded-lg bg-gradient-to-r  from-g3 to-g2 ">
                        Create
                    </Button>
                </form>
            </Form>
    )
}
