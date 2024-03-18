import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { routes } from "../../constants/route";

export function useForgotPasswordForm() {
    const router = useRouter();
    // form schema
    const forgotPasswordFormSchema = z.object({
        email: z.string().email({message : "Invalid Email"}),
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
        router.push(routes.CHECK_YOUR_EMAIL);
        console.log(values);
    }

    return {
        forgotPasswordFormSchema,
        form,
        onSubmit
    }
}