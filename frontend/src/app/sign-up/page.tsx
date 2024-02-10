import { SignUpForm } from "../../components/landing/forms/forms";

export default function SignUp() {
    return (
        <div className='flex h-full justify-center items-center'>
            <div className="w-[480px] h-[640px] p-16 bg-white rounded-2xl flex justify-center items-center">
                <SignUpForm/>
            </div>
        </div>
    )
}