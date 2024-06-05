"use client";
import { Form } from "@/components/ui/form";
import { IconMailFilled } from "@tabler/icons-react";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { routes } from "@/constants/routes";
import url from "@/constants/url";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const forgotPasswordFormSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
  });

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    const response = await fetch(url.client.ForgotPassword, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    const res = await response.json();
    if (res.status !== 200) {
      // TODO : handle error
    } else {
      router.push(routes.CHECK_YOUR_EMAIL);
      console.log(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        {/* email input */}
        <MyFormField
          form={form}
          value="email"
          placeholder="Email"
          icon={
            <IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />
          }
        />
        {/* gap */}
        <div className="h-1" />
        {/* submit button */}
        <MyButton text="Send" />
      </form>
    </Form>
  );
}
