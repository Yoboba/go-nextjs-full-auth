import GithubButton from "@/components/my_ui/github_button";
import GoogleButton from "@/components/my_ui/google_button";
import Line from "@/components/ui/line";
import SignInForm from "./sign_in_form";
import BackButton from "@/components/my_ui/back_button";
import { IconArrowBackUp } from "@tabler/icons-react";
import { routes } from "@/constants/routes";
import { getCookie } from "@/lib/cookies";

export default function FormSection() {
    const username = getCookie("username")
    
    return (
        <div className="flex flex-col gap-4  w-[480px] h-[550px] p-16 bg-white rounded-2xl justify-center items-center drop-shadow-xl ">
            <header className="text-neutral-700 text-[32px] font-semibold">Sign in</header>
            <SignInForm username={username?.value}/>
            <Line height="h-[2px]" color="bg-gray-200"/>
            <section className="justify-center items-start gap-5 inline-flex">
                <GoogleButton/>
                <GithubButton/>
            </section>
            <BackButton icon={<IconArrowBackUp />} text={"Back to Home"} route={routes.ROOT}/>
        </div>
    )
}