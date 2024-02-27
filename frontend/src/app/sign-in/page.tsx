import SignInForm from '@/app/sign-in/sign_in_form'


export default function SignInPage() {

  return (
    <div className='flex h-full justify-center items-center'>
      <div className=" w-[480px] h-[500px] p-16 bg-white rounded-2xl flex justify-center items-center drop-shadow-xl">
        <SignInForm/>
      </div>
    </div>
  )
}

