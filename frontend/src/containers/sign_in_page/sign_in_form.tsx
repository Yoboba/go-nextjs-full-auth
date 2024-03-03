"use client"
import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
    Form,
} from "@/components/ui/form"
import { 
    IconMailFilled,
    IconLockSquareRoundedFilled, 
} from '@tabler/icons-react';
import { useSignInForm } from "./_hooks/use_sign_in_form";
import { routes } from "../../constants/route";
import MyFormField from "@/components/my_ui/my_form_field";


export default function SignInForm() {
    const {form, onSubmit} = useSignInForm();

    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                    {/* email input */}
                    <MyFormField 
                        form={form} 
                        value="email" 
                        placeholder="Email" 
                        icon={<IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />}
                    />
                    {/* password input */}
                    <MyFormField 
                        form={form} 
                        value="password" 
                        placeholder="Password" 
                        icon={<IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />}
                    />
                    {/* forgot password and register */}
                    <div className=" flex justify-between item-center w-full h-fit">
                        <Link href={routes.FORGOT_PASSWORD} className=" text-blue-500 text-xs font-medium hover:underline">forgot password ?</Link>
                        <div className="text-neutral-400 text-xs font-medium">don’t have an account ? <Link href={`${routes.SIGN_UP}`} className="text-blue-500 text-xs font-medium hover:underline">Sign up</Link></div>
                    </div>
                    <div className="h-1"/>
                    <Button type="submit" className="w-full text-white text-md rounded-lg bg-gradient-to-r from-violet-300 to-pink-300 hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">Sign in</Button>
                </form>
            </Form>
    )
}