import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BlogForm from "./blog_form";
import { getCookie } from "@/lib/cookies";

interface BlogDrawerProps {
  triggerElement: React.ReactNode;
}

export default function BlogDrawer(props: Readonly<BlogDrawerProps>) {
  const token = getCookie("jwt");

  return (
    <Drawer>
      <DrawerTrigger>{props.triggerElement}</DrawerTrigger>
      <DrawerContent className="flex flex-col justify-center items-center">
        <DrawerHeader className=" flex flex-col justify-end items-center w-1/2">
          <DrawerTitle className=" tracking-widest text-3xl">
            Create Your New Blog !
          </DrawerTitle>
          <DrawerDescription>
            Telling your story to the world...
          </DrawerDescription>
        </DrawerHeader>
        <main className="w-1/2 pb-20">
          <BlogForm token={token?.value} />
        </main>
      </DrawerContent>
    </Drawer>
  );
}
