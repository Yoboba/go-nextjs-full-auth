import SignInForm from '@/containers/sign_in_page/sign_in_form'
import GoogleButton from '@/components/ui/buttons/google_button'
import GithubButton from '@/components/ui/buttons/github_button'
import Line from '@/components/ui/line'

export default function SignInPage() {
  return (
    <div className='flex h-full justify-center items-center'>
      <div className="flex flex-col gap-4  w-[480px] h-[500px] p-16 bg-white rounded-2xl justify-center items-center drop-shadow-xl">
        <header className="text-neutral-700 text-[32px] font-semibold">Sign in</header>
        <SignInForm/>
        <Line height={1} color={'bg-slate-500'}/>
        <section className="justify-center items-start gap-5 inline-flex">
          <GoogleButton/>
          <GithubButton/>
        </section>
      </div>
    </div>
  )
}

