"use client";
import { Form } from "@/components/ui/form";
import { IconLockSquareRoundedFilled } from "@tabler/icons-react";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SetNewPasswordForm() {
  const setNewPasswordFormSchema = z
    .object({
      password: z
        .string()
        .min(2, { message: "Password should be at least 2 characters" })
        .max(15, { message: "Password should be less than 50 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof setNewPasswordFormSchema>>({
    resolver: zodResolver(setNewPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof setNewPasswordFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        {/* new password */}
        <MyFormField
          form={form}
          value="password"
          placeholder="New Password"
          type="password"
          icon={
            <IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md]" />
          }
        />
        {/* new confirm password */}
        <MyFormField
          form={form}
          value="confirmPassword"
          placeholder="Confirm your new password"
          type="password"
          icon={
            <IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />
          }
        />

        {/* gap */}
        <div className="h-1" />

        {/* submit button */}
        <MyButton text="Confirm" />
      </form>
    </Form>
  );
}
