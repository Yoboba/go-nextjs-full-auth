import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
export function useSetNewPasswordForm() {

    // form schema
    const setNewPasswordFormSchema = z.object({
        password: z.string().min(2).max(50),
        confirmPassword :  z.string().min(2).max(50),
    })
    
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