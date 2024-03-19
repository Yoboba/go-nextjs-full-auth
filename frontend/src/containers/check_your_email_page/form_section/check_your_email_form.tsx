"use client"
import { Button } from "../../../components/ui/button";
import {
    Form,
} from "@/components/ui/form"
import { 
    IconZoomCheckFilled 
} from '@tabler/icons-react';
import { useCheckYourEmailForm } from "../../../hooks/forms/use_check_your_email_form";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";

export default function CheckYourEmailForm() {
    const {form, onSubmit} = useCheckYourEmailForm()
    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                    {/* code input */}
                    <MyFormField
                        form={form}
                        value="code"
                        placeholder="Enter code here"
                        icon={<IconZoomCheckFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md"/>}
                    />
                    {/* gap */}
                    <div className="h-1"/>
                    {/* submit button */}
                    <MyButton text="Confirm"/>
                </form>
            </Form>
    )
}