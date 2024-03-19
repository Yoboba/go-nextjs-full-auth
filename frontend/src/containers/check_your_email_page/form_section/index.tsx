import FormHeader from "@/components/ui/form_header";
import { IconArrowBackUp, IconMailFilled } from "@tabler/icons-react";
import CheckYourEmailForm from "./check_your_email_form";
import BackButton from "@/components/my_ui/back_button";
import { routes } from "@/constants/route";

export default function FormSection() {
    return (
        <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
            <FormHeader
                title="Check your email"
                description="We have sent a reset code to example@gmail.com"
                icon={<IconMailFilled size={48} className=" text-g3"/>}
            />
            <CheckYourEmailForm/>
            <BackButton icon={<IconArrowBackUp />} text={"Back to Sign In"} route={routes.SIGN_IN}/>
        </div>
    )
}