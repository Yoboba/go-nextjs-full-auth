import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export function useSignUpForm() {    
    // form schema
    const signUpformSchema = z.object({
        fullname: z.string().min(2).max(50),
        email: z.string().min(2).max(50),
        password: z.string().min(2).max(50),
        confirmPassword: z.string().min(2).max(50),
        term: z.boolean().default(false).optional(),
    })
    
    // main form config
    const form = useForm<z.infer<typeof signUpformSchema>>({
        resolver: zodResolver(signUpformSchema),
        defaultValues: {
          fullname: "",
          email : "",
          password: "",
          confirmPassword: "",
          term: false
        },
    })

    // handle Submit
    function onSubmit(values: z.infer<typeof signUpformSchema>) {
        console.log(values)
    }

    return {
        signUpformSchema,
        form,
        onSubmit
    }
}