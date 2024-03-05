import BackToSignInButton from "@/components/ui/buttons/back_to_sign_in_button";
import FormHeader from "@/components/ui/form_header";
import { IconCircleKeyFilled } from "@tabler/icons-react";
import ForgotPasswordForm from "./forgot_password_form";

export default function FormSectionIndex() {
    return (
        <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
            <FormHeader
                title="Forgot Password ?"
                description="No worries, we will send you reset instructions."
                icon={<IconCircleKeyFilled size={48} className=" text-[#9C4A8F]"/>}
            />
            <ForgotPasswordForm/>
            <BackToSignInButton/>
        </div>
    )
}