import { zodResolver } from "@hookform/resolvers/zod"
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
    function onSubmit(values: z.infer<typeof signInFormSchema>, ) {
        console.log(values)
    }

    return {
        signInFormSchema,
        form,
        onSubmit
    }
}