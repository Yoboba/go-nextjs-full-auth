import SetNewPasswordForm from "./set_new_password_form"


export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center '>
            <div className="w-[480px] h-[540px] p-16 bg-white rounded-2xl flex justify-center items-center drop-shadow-xl">
                <SetNewPasswordForm/>
            </div>
        </div>
    )
}