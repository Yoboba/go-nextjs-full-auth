"use client"
import { Form } from "@/components/ui/form"
import { useBlogForm } from "@/hooks/forms/use_blog_form"
import MyFormField from "@/components/my_ui/my_form_field"
import { IconMailFilled } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import MyFormTextArea from "@/components/my_ui/my_form_textarea"
import TagFormField from "./tag_form_field"

export default function BlogForm() {
    const { onSubmit, form } = useBlogForm()
    
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
                        placeholder="Put captions here"
                        icon={<IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />}
                    />
                    {/* body */}
                    <MyFormTextArea
                        form={form}
                        value="body" 
                        placeholder={"Your Story here"} 
                    />
                    {/* tag */}
                    <TagFormField
                        form={form}
                        value="tags"
                        placeholder="add tags here"
                    />
                    {/* submit button */}
                    <Button type="submit" className="w-full cursor-pointer text-white text-md rounded-lg bg-gradient-to-r  from-g3 to-g2 ">
                        Create
                    </Button>
                </form>
            </Form>
    )
}