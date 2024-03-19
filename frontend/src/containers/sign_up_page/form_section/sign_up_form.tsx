"use client"
import { Button } from "../../../components/ui/button";
import {
    Form,
} from "@/components/ui/form"
import {
    IconUserFilled, 
    IconMailFilled, 
    IconLockSquareRoundedFilled, 
} from '@tabler/icons-react';
import { useSignUpForm } from "../../../hooks/forms/use_sign_up_form";
import MyFormField from "@/components/my_ui/my_form_field";
import MyFormCheckBox from "@/components/my_ui/my_form_checkbox";
import MyButton from "@/components/my_ui/my_button";

export default function SignUpForm() {
    const { form, onSubmit } = useSignUpForm()
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                {/* fullname */}
                <MyFormField
                    form={form}
                    value="fullname"
                    placeholder="Full name"
                    icon={<IconUserFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md]"/>}
                />
                {/* email */}
                <MyFormField
                    form={form}
                    value="email"
                    placeholder="Email"
                    icon={<IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md"/>}
                />
                {/* password */}
                <MyFormField
                    form={form}
                    value="password"
                    placeholder="Password"
                    type="password"
                    icon={<IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md"/>}
                />
                {/* confirm password */}
                <MyFormField
                    form={form}
                    value="confirmPassword"
                    placeholder="Confirm your password"
                    type="password"
                    icon={<IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md"/>}
                />
                {/* checkbox */}
                <MyFormCheckBox
                    form={form}
                    value="term"
                    text="Accept terms and conditions"
                    description="You agree to our Terms of Service and Privacy Policy."
                />
                {/* gap */}
                <div className="h-1"/>
                {/* submit button */}
                <MyButton text="Sign up"/>
            </form>
        </Form>
    )
}