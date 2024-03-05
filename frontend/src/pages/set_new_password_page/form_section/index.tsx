import BackToSignInButton from "@/components/ui/buttons/back_to_sign_in_button";
import FormHeader from "@/components/ui/form_header";
import { IconPassword } from "@tabler/icons-react";
import SetNewPasswordForm from "./set_new_password_form";

export default function FormSectionIndex() {
    return (
        <div className="w-[480px] h-[540px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
            <FormHeader 
                title={"Set new password"} 
                description={"Your new password must be different to previously used password."} 
                icon={<IconPassword size={48} className=" text-[#9C4A8F]"/>}
            />
            <SetNewPasswordForm/>
            <BackToSignInButton/>
        </div>
    )
}