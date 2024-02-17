import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
export function useSetNewPasswordForm() {

    // form schema
    const setNewPasswordFormSchema = z.object({
        password: z.string().min(2, {message : "Password should be at least 2 characters"}).max(15, {message : "Password should be less than 50 characters"}),
        confirmPassword :  z.string(),
    }).refine((data) => data.password === data.confirmPassword, {message : "Passwords do not match", path : ["confirmPassword"]})
    
    // main form config
    const form = useForm<z.infer<typeof setNewPasswordFormSchema>>({
        resolver: zodResolver(setNewPasswordFormSchema),
        defaultValues: {
          password: "",
          confirmPassword: ""
        },
    })

    // handle Submit
    function onSubmit(values: z.infer<typeof setNewPasswordFormSchema>, ) {
        console.log(values)
    }

    return {
        setNewPasswordFormSchema,
        form,
        onSubmit
    }
}