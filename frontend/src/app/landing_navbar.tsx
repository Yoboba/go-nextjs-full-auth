import Link from "next/link";
import { Button } from "@/components/ui/button";

import { pages } from "@/constants/enum";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconMoonFilled } from '@tabler/icons-react';

export default function LandingNavBar() {
    return (
        <nav className="flex top-0 sticky z-10 h-16 bg-white justify-between items-center pl-5 pr-5 drop-shadow-md">
            <h1 className=" font-bold text-4xl text-center">B L O G</h1>

            <div className="flex justify-center items-center gap-3">
                <Avatar className=" bg-purple-400 drop-shadow-md">
                    <AvatarImage/>
                </Avatar>
                <div className=" flex flex-col justify-center items-start">
                    <h2 className=" font-bold text-2xl">Yoboba</h2>
                    <p className=" font-medium text-xs">Thanachot.onl@student.mahidol.ac.th</p>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2">
                <Link href={pages.ADMIN}><Button variant="link" className={`rounded-full font-semibold text-md text-[#775E82]`}>Dashboard</Button></Link>
                <Button variant="outline" className={` px-[8px] border-[#775E82] text-[#775E82] hover:bg-[#775E82] hover:text-white`}><IconMoonFilled size={20}/></Button>
            </div>
        </nav>
    )
}