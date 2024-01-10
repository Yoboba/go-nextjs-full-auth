import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Landing from '@/components/sign-in/landing'
export default function Home() {

  return (
    <div className='flex h-full justify-center items-center'>
      <div className="w-[480px] h-[480px] m-16 bg-white rounded-2xl flex justify-center items-center">
        <Landing/>
      </div>
    </div>
  )
}
