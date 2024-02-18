"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

import { SignInForm } from "../components/landing/forms/forms";


export default function SignInPage() {

  return (
    <div className='flex h-full justify-center items-center'>
      <div className=" w-[480px] h-[500px] p-16 bg-white rounded-2xl flex justify-center items-center">
        <SignInForm/>
      </div>
    </div>
  )
}

