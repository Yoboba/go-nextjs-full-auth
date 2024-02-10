import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export function useForgotPasswordForm() {
    // form schema
    const forgotPasswordFormSchema = z.object({
        email: z.string().min(2).max(50),
    })
    
    // main form config
    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
          email: "",
        },
    })

    // handle Submit
    function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>, ) {
        console.log(values)
    }

    return {
        forgotPasswordFormSchema,
        form,
        onSubmit
    }
}