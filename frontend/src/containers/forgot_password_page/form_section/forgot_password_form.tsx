"use client"
import { Button } from "../../../components/ui/button";
import {
    Form,
} from "@/components/ui/form"
import { IconMailFilled } from '@tabler/icons-react';
import { useForgotPasswordForm } from "../../../hooks/forms/use_forgot_password_form";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";

export default function ForgotPasswordForm() {
    const {form, onSubmit} = useForgotPasswordForm()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                {/* email input */}
                <MyFormField
                    form={form}
                    value="email"
                    placeholder="Email"
                    icon={<IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md"/>}
                />
                {/* gap */}
                <div className="h-1"/>
                {/* submit button */}
                <MyButton text="Send"/>
            </form>
        </Form>
    )
}