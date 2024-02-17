"use client"
import Link from "next/link";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
  import { IconMailFilled,IconLockSquareRoundedFilled, IconBrandGoogleFilled, IconBrandGithubFilled } from '@tabler/icons-react';

import { useSignInForm } from "../configs/configs";
import { pages } from "../constants/constants";

export default function SignInForm() {
    const {form, onSubmit} = useSignInForm()
    return (
        <>
            <div className="flex w-full h-full rounded-2xl flex-col justify-center items-center gap-4">
                <div className="text-neutral-700 text-[32px] font-semibold">Sign in</div>
                
                {/* form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                        {/* email input */}
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Email" className="w-full" autoComplete="email" {...field}/>
                                        <IconMailFilled className="absolute right-3 top-3 text-[#9F9F9F]"/>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-[10px]"/>
                            </FormItem>

                        )}
                        />
                        {/* password input */}
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input type="password" placeholder="Password" autoComplete="current-password" className="w-full" {...field}/>
                                        <IconLockSquareRoundedFilled className="absolute right-3 top-3 text-[#9F9F9F]"/>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-[10px]"/>
                            </FormItem>

                        )}
                        />
                        
                        {/* forgot password and register */}
                        <div className=" flex justify-between item-center w-full h-fit">
                            <Link href={`${pages.FORGOT_PASSWORD}`} className=" text-blue-500 text-xs font-medium hover:underline">forgot password ?</Link>
                            <div className="text-neutral-400 text-xs font-medium">don’t have an account ? <Link href={`${pages.SIGN_UP}`} className="text-blue-500 text-xs font-medium hover:underline">Sign up</Link></div>
                        </div>
                        
                        {/* gap */}
                        <div className="h-1"/>
                        
                        {/* submit button */}
                        <Button type="submit" className="w-full text-white text-md rounded-lg bg-gradient-to-r from-violet-300 to-pink-300 hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">Sign in</Button>
                    </form>
                </Form>

                {/* line */}
                <div className="w-full h-[1px] rounded-sm  bg-slate-500"></div>

                {/* google , github */}
                <section className="justify-center items-start gap-5 inline-flex">
                    <div className="w-[171.50px] h-10 relative cursor-pointer hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
                        <div className="w-[171.50px] h-10 left-0 top-0 absolute bg-fuchsia-50 rounded-lg" />
                        <IconBrandGoogleFilled className="w-[25.57px] h-6 left-[6.50px] top-[8.98px] absolute text-fuchsia-800 " />
                        <div className="w-[129px] h-[18px] left-[35.50px] top-[10.98px] absolute text-center"><span className="text-fuchsia-800 text-xs font-medium">continue with </span><span className="text-fuchsia-800 text-xs font-bold">Google</span></div>
                    </div>
                    <div className="w-[171.50px] h-10 relative cursor-pointer hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
                        <div className="w-[171.50px] h-10 left-0 top-0 absolute bg-zinc-100 rounded-lg" />
                        <div className="w-[131px] h-[18px] left-[34px] top-[10.98px] absolute text-center"><span className="text-black text-xs font-medium ">continue with </span><span className="text-black text-xs font-bold">Github</span></div>
                        <IconBrandGithubFilled className="w-6 h-[24.07px] left-[7px] top-[7.98px] absolute" />
                    </div>
                </section>
            </div>
        </>
    )
}