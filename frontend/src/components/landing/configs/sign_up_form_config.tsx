import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export function useSignUpForm() {    
    // form schema
    const signUpformSchema = z.object({
        fullname: z.string().min(5, {message : "Fullname should be at least 5 characters"}).max(50, {message : "Fullname should be less than 50 characters"}),
        email: z.string().email({message : "Invalid Email"}),
        password: z.string().min(2, {message : "Password should be at least 2 characters"}).max(15, {message : "Password should be less than 15 characters"}),
        confirmPassword: z.string(),
        term: z.boolean().default(false).refine((data) => data === true, {message : "Please accept terms and conditions"}),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
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