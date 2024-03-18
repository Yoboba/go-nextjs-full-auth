import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import BlogForm from "./blog_form"

interface NewBlogDrawerProps {
    triggerElement : React.ReactNode
}

export default function BlogDrawer(props:Readonly<NewBlogDrawerProps>) {
    return (
        <Drawer>
            <DrawerTrigger>{props.triggerElement}</DrawerTrigger>
            <DrawerContent className="flex flex-col justify-center items-center">
                <DrawerHeader className=" flex flex-col justify-end items-center w-1/2">
                    <DrawerTitle className=" tracking-widest text-3xl">Create a New Blog !</DrawerTitle>
                    <DrawerDescription>Telling your story to the world...</DrawerDescription>
                </DrawerHeader>
                <main className="w-1/2 pb-20">
                    <BlogForm/>
                </main>
            </DrawerContent>
        </Drawer>
    )
}