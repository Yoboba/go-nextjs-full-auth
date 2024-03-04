import Line from "@/components/ui/line";
import SignUpForm from "../../containers/sign_up_page/sign_up_form";
import GoogleButton from "@/components/ui/buttons/google_button";
import GithubButton from "@/components/ui/buttons/github_button";
import BackToSignInButton from "@/components/ui/buttons/back_button";

export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center'>
            <div className="flex flex-col gap-4 w-[480px] h-[730px] p-16 bg-white rounded-2xl justify-center items-center drop-shadow-xl">
                <header className="text-neutral-700 text-[32px] font-semibold">Sign Up</header>
                <SignUpForm/>
                <Line height={1} color={"bg-slate-500"}/>
                <section className="justify-center items-start gap-5 flex">
                    <GoogleButton/>
                    <GithubButton/>
                </section>
                <BackToSignInButton/>
            </div>
        </div>
    )
}