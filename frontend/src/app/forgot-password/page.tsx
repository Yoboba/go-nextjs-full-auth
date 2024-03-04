import BackToSignInButton from "@/components/ui/buttons/back_button";
import ForgotPasswordForm from "../../containers/forgot_password_page/forgot_password_form";
import FormHeader from "@/components/ui/form_header";
import { IconCircleKeyFilled } from '@tabler/icons-react';

export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center '>
            <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
                <FormHeader
                    title="Forgot Password ?"
                    description="No worries, we will send you reset instructions."
                    icon={<IconCircleKeyFilled size={48} className=" text-[#9C4A8F]"/>}
                />
                <ForgotPasswordForm/>
                <BackToSignInButton/>
            </div>
        </div>
    )
}