import { zodResolver } from "@hookform/resolvers/zod"
import url from "../../constants/url"
import { useForm } from "react-hook-form"
import * as z from "zod"

export function useSignInForm() {
    // form schema
    const signInFormSchema = z.object({
        email: z.string().email({ message : "Invalid Email"}),
        password: z.string().min(2, {message: "Password should be at least 2 characters"}).max(15, {message: "Password should be less than 15 characters"}),
    })
    
    // main form config
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
        email: "",
        password: ""
        },
    })

    // handle Submit
    async function onSubmit(values: z.infer<typeof signInFormSchema>, ) {
        const response = await fetch(url.signIn, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        })
        const data = await response.json()
        console.log(data)
    }

    return {
        signInFormSchema,
        form,
        onSubmit
    }
}