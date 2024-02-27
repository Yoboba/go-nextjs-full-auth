import SignUpForm from "./sign_up_form";

export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center'>
            <div className="w-[480px] h-[730px] p-16 bg-white rounded-2xl flex justify-center items-center drop-shadow-xl">
                <SignUpForm/>
            </div>
        </div>
    )
}