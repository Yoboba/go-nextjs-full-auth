import { IconBrandGithubFilled } from "@tabler/icons-react";

export default function GithubButton() {
    return (
        <div className="w-[171.50px] h-10 relative cursor-pointer hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
            <div className="w-[171.50px] h-10 left-0 top-0 absolute bg-zinc-100 rounded-lg" />
            <div className="w-[131px] h-[18px] left-[34px] top-[10.98px] absolute text-center"><span className="text-black text-xs font-medium ">continue with </span><span className="text-black text-xs font-bold">Github</span></div>
            <IconBrandGithubFilled className="w-6 h-[24.07px] left-[7px] top-[7.98px] absolute" />
        </div>
    )
}