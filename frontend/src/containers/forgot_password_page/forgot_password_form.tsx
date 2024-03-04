"use client"
import { Button } from "../../components/ui/buttons/button";
import {
    Form,
} from "@/components/ui/form"
import { IconMailFilled } from '@tabler/icons-react';
import { useForgotPasswordForm } from "../../hooks/use_forgot_password_form";
import MyFormField from "@/components/my_ui/my_form_field";

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
                <Button type="submit" className="w-full text-white text-md rounded-lg bg-gradient-to-r from-violet-300 to-pink-300 hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
                    Send
                </Button>
            </form>
        </Form>
    )
}