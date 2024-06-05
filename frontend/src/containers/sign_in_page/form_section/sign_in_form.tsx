"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import {
  IconMailFilled,
  IconLockSquareRoundedFilled,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";
import { routes } from "../../../constants/routes";
import url from "../../../constants/url";
import { useToast } from "@/hooks/use-toast";
import { messages } from "@/constants/messages";

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const signInFormSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(2, { message: "Password should be at least 2 characters" })
      .max(15, { message: "Password should be less than 15 characters" }),
  });
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const response = await fetch(url.client.signIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res = await response.json();
    if (res.status !== 200) {
      toast({
        variant: "destructive",
        title: messages.errorMessage,
        description: messages.signInFailedDescription,
      });
    } else {
      toast({
        title: messages.signInSucceedTitle,
        description: messages.signInSucceedDescription,
      });
      router.push(`/${res.data}`);
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        {/* email */}
        <MyFormField
          form={form}
          value="email"
          placeholder="Email"
          icon={
            <IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />
          }
        />
        {/* password */}
        <MyFormField
          form={form}
          value="password"
          placeholder="Password"
          type="password"
          icon={
            <IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />
          }
        />
        {/* forgot password ? */}
        <div className=" flex justify-between item-center w-full h-fit">
          <Link
            href={routes.FORGOT_PASSWORD}
            className=" text-blue-500 text-xs font-medium hover:underline"
          >
            forgot password ?
          </Link>
          <div className="text-neutral-400 text-xs font-medium">
            don’t have an account ?{" "}
            <Link
              href={`${routes.SIGN_UP}`}
              className="text-blue-500 text-xs font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
        {/* gap */}
        <div className="h-1" />
        {/* submit button */}
        <MyButton text="Sign in" />
      </form>
    </Form>
  );
}
