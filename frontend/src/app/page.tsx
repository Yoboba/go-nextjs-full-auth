import Image from 'next/image'
import { Button } from '@/components/ui/button'
import SignIn from '@/components/sign-in/pages/sign_in'
export default function Home() {

  return (
    <div className='flex h-full justify-center items-center'>
      <div className="w-[480px] h-[480px] m-8 bg-white rounded-2xl flex justify-center items-center">
        <SignIn/>
      </div>
    </div>
  )
}
