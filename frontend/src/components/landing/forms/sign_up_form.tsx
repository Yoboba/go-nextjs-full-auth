"use client"
import { Button } from "../../ui/button";
import { Input } from "../../ui/input"
import { Checkbox } from "../../ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"

import { useSignUpForm } from "../configs/configs";
import { IconUserFilled, IconMailFilled, IconLockSquareRoundedFilled, IconBrandGoogleFilled, IconBrandGithubFilled, IconArrowBackUp } from '@tabler/icons-react';
import Link from "next/link";
import { pages } from "../constants/enum";

export default function SignUpForm() {
    const { form, onSubmit } = useSignUpForm()

    return (
        <div>
            <div className="flex w-full h-full rounded-2xl flex-col justify-start items-center gap-4">
                <div className="text-neutral-700 text-[32px] font-semibold">Sign Up</div>
                
                {/* form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full h-full">
                        {/* fullname input */}
                        <FormField control={form.control} name="fullname" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Full name" className="w-full" autoComplete="fullname" {...field}/>
                                        <IconUserFilled className="absolute right-3 top-3 text-[#9F9F9F]"/>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        {/* email input */}
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Email" className="w-full" autoComplete="email" {...field}/>
                                        <IconMailFilled className="absolute right-3 top-3 text-[#9F9F9F]"/>
                                    </div>
                                </FormControl>
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
                            </FormItem>
                        )}
                        />

                        {/* confirm password input */}
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input type="password" placeholder="Confirm your password" autoComplete="confirmed-password" className="w-full" {...field}/>
                                        <IconLockSquareRoundedFilled className="absolute right-3 top-3 text-[#9F9F9F]"/>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                        />

                        {/* checkbox */}
                        <FormField control={form.control} name="term"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                        className=" border-grey-100"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-xs text-[#6F6F6F] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Accept terms and conditions
                                        </FormLabel>
                                        <FormDescription className="text-[10px] text-muted-foreground underline cursor-pointer">
                                            You agree to our Terms of Service and Privacy Policy.
                                        <Link href="/examples/forms">mobile settings</Link> page.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* gap */}
                        <div className="h-1"/>
                        
                        {/* submit button */}
                        <Button type="submit" className="w-full text-white text-md rounded-lg bg-gradient-to-r from-violet-300 to-pink-300 hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
                            Sign Up
                        </Button>
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

                <Link href={`${pages.SIGN_IN}`}><Button variant='ghost' className="inline-flex items-center gap-2 text-[#949494] font-medium hover:bg-transparent">
                    <IconArrowBackUp/>
                    Back to sign in
                </Button></Link>
            </div>
        </div>
    )
}