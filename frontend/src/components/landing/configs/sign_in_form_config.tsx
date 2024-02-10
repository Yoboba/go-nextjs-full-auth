import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export function useSignInForm() {
    // form schema
    const signInformSchema = z.object({
        email: z.string().min(2).max(50),
        password: z.string().min(2).max(50),
    })
    
    // main form config
    const form = useForm<z.infer<typeof signInformSchema>>({
        resolver: zodResolver(signInformSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    // handle Submit
    function onSubmit(values: z.infer<typeof signInformSchema>, ) {
        console.log(values)
    }

    return {
        signInformSchema,
        form,
        onSubmit
    }
}