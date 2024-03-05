"use client"
import { Button } from "../../../components/ui/buttons/button";
import {
    Form,
} from "@/components/ui/form"
import { 
    IconLockSquareRoundedFilled, 
} from '@tabler/icons-react';

import { useSetNewPasswordForm } from "../../../hooks/use_set_new_password_form";
import MyFormField from "@/components/my_ui/my_form_field";

export default function SetNewPasswordForm() {
    const {form, onSubmit} = useSetNewPasswordForm()
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                {/* new password */}
                <MyFormField
                    form={form}
                    value="password"
                    placeholder="New Password"
                    type="password"
                    icon={<IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md]"/>}
                />
                {/* new confirm password */}
                <MyFormField
                    form={form}
                    value="confirmPassword"
                    placeholder="Confirm your new password"
                    type="password"
                    icon={<IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md"/>}
                />
                
                {/* gap */}
                <div className="h-1"/>
                
                {/* submit button */}
                <Button type="submit" className="w-full text-white text-md rounded-lg bg-gradient-to-r from-violet-300 to-pink-300 hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
                    Confirm
                </Button>
            </form>
        </Form>
    )
}