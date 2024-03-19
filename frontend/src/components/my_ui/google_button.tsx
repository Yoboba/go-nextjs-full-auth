import { IconBrandGoogleFilled } from "@tabler/icons-react";

export default function GoogleButton() {
    return (
        <div className="w-[171.50px] h-10 relative cursor-pointer hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
            <div className="w-[171.50px] h-10 left-0 top-0 absolute bg-fuchsia-50 rounded-lg" />
            <IconBrandGoogleFilled className="w-[25.57px] h-6 left-[6.50px] top-[8.98px] absolute text-fuchsia-800 " />
            <div className="w-[129px] h-[18px] left-[35.50px] top-[10.98px] absolute text-center"><span className="text-fuchsia-800 text-xs font-medium">continue with </span><span className="text-fuchsia-800 text-xs font-bold">Google</span></div>
        </div>
    )
}