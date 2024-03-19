import FormHeader from "@/components/ui/form_header";
import { IconArrowBackUp, IconCircleKeyFilled } from "@tabler/icons-react";
import ForgotPasswordForm from "./forgot_password_form";
import BackButton from "@/components/my_ui/back_button";
import { routes } from "@/constants/route";

export default function FormSection() {
    return (
        <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
            <FormHeader
                title="Forgot Password ?"
                description="No worries, we will send you reset instructions."
                icon={<IconCircleKeyFilled size={48} className=" text-g3"/>}
            />
            <ForgotPasswordForm/>
            <BackButton icon={<IconArrowBackUp />} text={"Back to Sign In"} route={routes.SIGN_IN}/>
        </div>
    )
}