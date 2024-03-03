import CheckYourEmailForm from "../../containers/check_your_email_page/check_your_email_form"


export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center '>
            <div className="w-[480px] h-[480px] p-16 bg-white rounded-2xl flex justify-center items-center drop-shadow-xl">
                <CheckYourEmailForm/>
            </div>
        </div>
    )
}