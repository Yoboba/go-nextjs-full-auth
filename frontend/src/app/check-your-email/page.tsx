import FormHeader from "@/components/ui/form_header"
import CheckYourEmailForm from "../../containers/check_your_email_page/check_your_email_form"
import { IconMailFilled } from "@tabler/icons-react"
import BackToSignInButton from "@/components/ui/buttons/back_button"


export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center '>
            <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex flex-col gap-4 justify-center items-center drop-shadow-xl">
                <FormHeader
                    title="Check your email"
                    description="We have sent a reset code to example@gmail.com"
                    icon={<IconMailFilled size={48} className=" text-[#9C4A8F]"/>}
                />
                <CheckYourEmailForm/>
                <BackToSignInButton/>
            </div>
        </div>
    )
}