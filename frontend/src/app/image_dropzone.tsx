"use client"
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { IconUpload } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export default function ImageDropzone() {
    const onDrop = useCallback((acceptedFiles: any) => {
        // TODO: Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className="flex flex-col gap-3 items-center justify-center bg-gray-100 h-[200px] rounded-xl border-2 border-gray-400 border-dashed">
            <input {...getInputProps()}/>
            <IconUpload size={60} className="text-gray-400"/>
            {
                isDragActive ?
                    <p className='font-medium text-sm'>Drop the files here ...</p> :
                    <div className="flex flex-col items-center gap-1">
                        <p className=' text-xs font-semibold'>Drop your profile image here</p>
                        <p className=" text-xs font-medium text-gray-500">or</p>
                        <Button variant="outline" className='rounded-2xl'>Upload File</Button>
                    </div>
            }
        </div>
    )
}