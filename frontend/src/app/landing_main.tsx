"use client"
import { Button } from '@/components/ui/button';
import { IconMessageShare, IconCubePlus, IconSortAscending, IconTag } from '@tabler/icons-react';

export default function LandingMain() {
    return (
        <main className="flex m-4 justify-center gap-4">
            <section className="w-1/2 p-8 flex flex-col gap-5 h-screen bg-white rounded-lg drop-shadow-xl">
                <div className="flex justify-between">
                    <div className="relative w-40 h-14 flex items-center">
                        <h2 className="relative font-semibold text-3xl">My Blogs</h2>
                        <IconMessageShare className='absolute top-0 right-0'/>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <p className=' text-sm text-gray-300 translate-x-1'>None</p>
                        <Button variant="ghost" className=' px-1'><IconSortAscending size={30}/></Button>
                        <Button variant="ghost" className=' px-1'><IconCubePlus size={30}/></Button>
                    </div>
                </div>
                <div className="h-[2px] bg-gray-400/20 rounded-full"/>
            </section>
            <section className={" w-1/6 p-4 h-screen bg-[#9F76A8] rounded-lg drop-shadow-xl"}>
                <div className='flex justify-center gap-2'>
                    <h2 className='font-semibold text-xl text-white'>Tags</h2>
                    <IconTag size={30} className='text-white'/>
                </div>
            </section>
        </main>
    )
}