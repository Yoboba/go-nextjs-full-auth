"use client"
import { Button } from "../ui/button";
import { Input } from "../ui/input"
import { IconMailFilled,IconLockSquareRoundedFilled, IconBrandGoogleFilled, IconBrandGithubFilled } from '@tabler/icons-react';

export default function Landing() {
    return (
        <div>
            <div className="w-full h-full rounded-2xl flex-col justify-start items-center gap-5 flex">
                <div className="text-neutral-700 text-[32px] font-semibold">Sign in</div>
                
                {/* info */}
                <div className="w-full h-[124px] relative">
                    <div className="w-full h-[46px] left-0 top-0 absolute">
                        <div className="relative">
                            <Input placeholder="Email" className="absolute w-full"/>
                            <IconMailFilled className="absolute right-3 top-3 text-[#9F9F9F]"/>
                        </div>
                    </div>
                    <div className="w-full h-[46px] left-0 top-[55px] absolute">
                        <div className="relative">
                            <Input placeholder="Password" className="absolute"/>
                            <IconLockSquareRoundedFilled className="absolute right-3 top-3 text-[#9F9F9F]"/>
                        </div>
                    </div>
                    <div className="left-[1.50px] top-[106px] absolute flex item-center w-full h-fit">
                        <a href="www.google.com" className="left-0 top-0 absolute text-blue-500 text-xs font-medium hover:underline">forgot password ?</a>
                        <div className="left-[154px] top-0 absolute text-neutral-400 text-xs font-medium">don’t have an account ? <a href="www.google.com" className="text-blue-500 text-xs font-medium hover:underline">Sign up</a></div>
                    </div>
                </div>

                {/* Button */}
                <Button onClick={() => console.log("SIGN IN")} className="w-full text-white rounded-lg bg-gradient-to-r from-[#838FB9] via-[#9982B9] to-pink-400 hover:translate-y-[-1px] transition-all  duration-100">Sign in</Button>

                {/* line */}
                <div className="w-full h-[1px] rounded-sm  bg-slate-500"></div>

                {/* google , github */}
                <div className="justify-center items-start gap-5 inline-flex">
                    <div className="w-[171.50px] h-10 relative cursor-pointer hover:translate-y-[-1px] transition-all  duration-100">
                        <div className="w-[171.50px] h-10 left-0 top-0 absolute bg-fuchsia-50 rounded-lg" />
                        <IconBrandGoogleFilled className="w-[25.57px] h-6 left-[6.50px] top-[8.98px] absolute text-fuchsia-800 " />
                        <div className="w-[129px] h-[18px] left-[35.50px] top-[10.98px] absolute text-center"><span className="text-fuchsia-800 text-xs font-medium">continue with </span><span className="text-fuchsia-800 text-xs font-bold">Google</span></div>
                    </div>
                    <div className="w-[171.50px] h-10 relative cursor-pointer hover:translate-y-[-1px] transition-all  duration-100">
                        <div className="w-[171.50px] h-10 left-0 top-0 absolute bg-zinc-100 rounded-lg" />
                        <div className="w-[131px] h-[18px] left-[34px] top-[10.98px] absolute text-center"><span className="text-black text-xs font-medium ">continue with </span><span className="text-black text-xs font-bold">Github</span></div>
                        <IconBrandGithubFilled className="w-6 h-[24.07px] left-[7px] top-[7.98px] absolute" />
                    </div>
                </div>
            </div>
        </div>
    )
}