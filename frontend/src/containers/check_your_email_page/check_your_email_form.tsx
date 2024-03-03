"use client"
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { 
    IconMailFilled, 
    IconArrowBackUp, 
    IconZoomCheckFilled 
} from '@tabler/icons-react';

import { useAnimation } from "../../constants/animation";
import { useCheckYourEmailForm } from "../../hooks/use_check_your_email_form";
import { motion } from 'framer-motion';
import { routes } from "../../constants/route";
import { useEffect, useState } from "react";

export default function CheckYourEmailForm() {
    const [code, setCode] = useState(true);
    const { errorPopUp } = useAnimation();
    const {form, onSubmit} = useCheckYourEmailForm()

    useEffect(() => {
        setCode(!form.formState.errors.code); 
    }, [form.formState.errors.code])
    return (
        <div className="flex w-full h-full rounded-2xl flex-col justify-center items-center gap-4">
            <IconMailFilled size={48} className=" text-[#9C4A8F]"/>
            <div className="flex flex-col gap-1 items-center w-full">
                <h1 className="text-neutral-700 text-[32px] font-semibold">Check your email</h1>
                <p className="text-[#909090] text-xs font-semibold">We have sent a reset code to example@gmail.com</p> 
            </div>
            
            {/* form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                    {/* email input */}
                    <FormField control={form.control} name="code" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative">
                                    <Input placeholder="Enter code here" className="w-full" autoComplete="secret-code" {...field}/>
                                    <IconZoomCheckFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md"/>
                                </div>
                            </FormControl>
                            {!code && (
                                <motion.div variants={errorPopUp} initial={"hidden"} animate={"visible"}>
                                    <FormMessage className="text-red-500 text-[10px]"/>
                                </motion.div>
                            )}
                        </FormItem>
                    )}
                    />
                    
                    
                    {/* gap */}
                    <div className="h-1"/>
                    
                    {/* submit button */}
                    <Button type="submit" className="w-full text-white text-md rounded-lg bg-gradient-to-r from-violet-300 to-pink-300 hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
                        Confirm
                    </Button>

                </form>
            </Form>
            <Link href={`${routes.SIGN_IN}`}>
                <Button variant='ghost' className="w-full inline-flex items-center gap-2 text-[#949494] font-medium hover:bg-transparent">
                    <IconArrowBackUp/>
                    Back to sign in
                </Button>
            </Link>
        </div>
    )
}