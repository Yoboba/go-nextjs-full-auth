import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export function useBlogForm() {
    // form schema
    const blogFormSchema = z.object({
        title: z.string().min(1,"Title cannot be empty"),
        caption: z.string().min(1, "Caption cannot be empty"),
        body: z.string().min(1, "Body cannot be empty"),
        tags: z.string().array().nonempty({message: "Must have at least one tag per blog"}),
    })
    
    // main form config
    const form = useForm<z.infer<typeof blogFormSchema>>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            title: "",
            caption: "",
            body: "",
            tags: [],
        },
    })

    // handle Submit
    function onSubmit(values: z.infer<typeof blogFormSchema>, ) {
        // router.push(routes.SET_NEW_PASSWORD);
        console.log(values)
    }

    return {
        blogFormSchema,
        form,
        onSubmit
    }
}