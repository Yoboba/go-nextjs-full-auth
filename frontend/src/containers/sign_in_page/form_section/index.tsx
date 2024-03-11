import GithubButton from "@/components/ui/buttons/github_button";
import GoogleButton from "@/components/ui/buttons/google_button";
import Line from "@/components/ui/line";
import SignInForm from "./sign_in_form";

export default function FormSectionIndex() {
    return (
        <div className="flex flex-col gap-4  w-[480px] h-[500px] p-16 bg-white rounded-2xl justify-center items-center drop-shadow-xl">
            <header className="text-neutral-700 text-[32px] font-semibold">Sign in</header>
            <SignInForm/>
            <Line height="h-[2px]" color="bg-gray-200"/>
            <section className="justify-center items-start gap-5 inline-flex">
                <GoogleButton/>
                <GithubButton/>
            </section>
        </div>
    )
}