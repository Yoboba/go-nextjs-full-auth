"use client";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import {
  IconUserFilled,
  IconMailFilled,
  IconLockSquareRoundedFilled,
} from "@tabler/icons-react";
import MyFormField from "@/components/my_ui/my_form_field";
import MyFormCheckBox from "@/components/my_ui/my_form_checkbox";
import MyButton from "@/components/my_ui/my_button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import url from "@/constants/url";
import { routes } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";
import { toastMessages } from "@/constants/messages";

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const signUpformSchema = z
    .object({
      username: z
        .string()
        .min(5, { message: "Fullname should be at least 5 characters" })
        .max(50, { message: "Fullname should be less than 50 characters" }),
      email: z.string().email({ message: "Invalid Email" }),
      password: z
        .string()
        .min(2, { message: "Password should be at least 2 characters" })
        .max(15, { message: "Password should be less than 15 characters" }),
      confirmPassword: z.string(),
      term: z
        .boolean()
        .default(false)
        .refine((data) => data === true, {
          message: "Please accept terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      term: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpformSchema>) {
    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
      role_id: 1,
    };
    const response = await fetch(url.client.SignUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await response.json();

    if (res.status !== 200) {
      toast({
        variant: "destructive",
        title: toastMessages.errorMessage,
        description: toastMessages.signUpFailedDescription,
      });
    } else {
      toast({
        title: toastMessages.signUpSucceedTitle,
        description: toastMessages.signUpSucceedDescription,
      });
      router.push(routes.SIGN_IN);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        {/* fullname */}
        <MyFormField
          form={form}
          value="username"
          placeholder="Username"
          icon={
            <IconUserFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md]" />
          }
        />
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
        {/* confirm password */}
        <MyFormField
          form={form}
          value="confirmPassword"
          placeholder="Confirm your password"
          type="password"
          icon={
            <IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />
          }
        />
        {/* checkbox */}
        <MyFormCheckBox
          form={form}
          value="term"
          text="Accept terms and conditions"
          description="You agree to our Terms of Service and Privacy Policy."
        />
        {/* gap */}
        <div className="h-1" />
        {/* submit button */}
        <MyButton text="Sign up" />
      </form>
    </Form>
  );
}
