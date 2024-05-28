import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { routes } from "../../constants/routes";

export function useCheckYourEmailForm() {
    const router = useRouter();
    // form schema
    const checkYourEmailFormSchema = z.object({
        code: z.string().min(2, {message : "Code should be at least 2 characters"}).max(10, {message : "Code should be less than 10 characters"}),
    })
    
    // main form config
    const form = useForm<z.infer<typeof checkYourEmailFormSchema>>({
        resolver: zodResolver(checkYourEmailFormSchema),
        defaultValues: {
        code: "",
        },
    })

    // handle Submit
    function onSubmit(values: z.infer<typeof checkYourEmailFormSchema>, ) {
        router.push(routes.SET_NEW_PASSWORD);
        console.log(values)
    }

    return {
        checkYourEmailFormSchema,
        form,
        onSubmit
    }
}