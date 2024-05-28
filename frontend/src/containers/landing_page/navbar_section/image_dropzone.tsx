"use client"
import {useCallback, useState} from 'react'
import Image from 'next/image';
import { useDropzone } from 'react-dropzone'
import { IconUpload } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { DialogClose } from "@/components/ui/dialog"

export default function ImageDropzone({onImageSubmit}:Readonly<{onImageSubmit: Function}>) {
    const { toast } = useToast()
    const [image, setImage] = useState(null)

    const onDrop = useCallback((acceptedFiles: any) => {
        const image = acceptedFiles[0]
        setImage(image)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const handleSubmit = () => {
        if (image === null) {
            toast({
                variant: "default",
                title: "No image selected",
                description: "Please select an image to upload",
                action: <ToastAction altText="try again">Try Again</ToastAction>
            })
        } else {
            onImageSubmit(image)
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <div {...getRootProps()} className="flex flex-col gap-3 items-center justify-center bg-gray-100 h-[200px] rounded-xl border-2 border-g4 border-dashed">
                <input {...getInputProps()}/>
                { image ? 
                    <Image src={URL.createObjectURL(image)} width={100} height={100} alt="Draft Profile Image" className="w-fit h-40 rounded-lg cursor-pointer"/>
                    : 
                    <div className="flex flex-col gap-2 items-center">
                        <IconUpload size={60} className="text-g3"/>
                        {
                            isDragActive ?
                                <p className='font-medium text-sm text-g2'>Drop the files here ...</p> :
                                <div className="flex flex-col items-center gap-1">
                                    <p className=' text-xs font-semibold text-g2'>Drop your profile image here</p>
                                    <p className=" text-xs font-medium text-g4">or</p>
                                    <Button variant="outline" className='rounded-2xl text-g2'>Upload File</Button>
                                </div>
                        }
                    </div>
                }
            </div>
            <DialogClose asChild>
                <Button variant="outline" onClick={handleSubmit} className=' font-semibold text-g3'>Submit</Button>
            </DialogClose>
        </div>
    )
}