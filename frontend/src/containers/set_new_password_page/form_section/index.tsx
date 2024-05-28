import FormHeader from "@/components/ui/form_header";
import { IconArrowBackUp, IconPassword } from "@tabler/icons-react";
import SetNewPasswordForm from "./set_new_password_form";
import BackButton from "@/components/my_ui/back_button";
import { routes } from "@/constants/routes";

export default function FormSection() {
    return (
        <div className="w-[480px] h-[540px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
            <FormHeader 
                title={"Set new password"} 
                description={"Your new password must be different to previously used password."} 
                icon={<IconPassword size={48} className=" text-g3"/>}
            />
            <SetNewPasswordForm/>
            <BackButton icon={<IconArrowBackUp />} text={"Back to Sign In"} route={routes.SIGN_IN}/>
        </div>
    )
}