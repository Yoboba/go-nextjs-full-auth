import ForgotPasswordForm from "../../containers/forgot_password_page/forgot_password_form";

export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center '>
            <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex justify-center items-center drop-shadow-xl">
                <ForgotPasswordForm/>
            </div>
        </div>
    )
}