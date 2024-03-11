import BackToSignInButton from "@/components/ui/buttons/back_to_sign_in_button";
import FormHeader from "@/components/ui/form_header";
import { IconMailFilled } from "@tabler/icons-react";
import CheckYourEmailForm from "./check_your_email_form";

export default function FormSectionIndex() {
    return (
        <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
            <FormHeader
                title="Check your email"
                description="We have sent a reset code to example@gmail.com"
                icon={<IconMailFilled size={48} className=" text-[#9C4A8F]"/>}
            />
            <CheckYourEmailForm/>
            <BackToSignInButton/>
        </div>
    )
}