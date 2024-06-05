"use client";
import { Form } from "@/components/ui/form";
import { IconZoomCheckFilled } from "@tabler/icons-react";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { routes } from "@/constants/routes";
import url from "@/constants/url";

export default function CheckYourEmailForm() {
  const router = useRouter();
  const checkYourEmailFormSchema = z.object({
    code: z
      .string()
      .min(2, { message: "Code should be at least 2 characters" })
      .max(10, { message: "Code should be less than 10 characters" }),
  });

  const form = useForm<z.infer<typeof checkYourEmailFormSchema>>({
    resolver: zodResolver(checkYourEmailFormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof checkYourEmailFormSchema>) {
    const response = await fetch(url.client.TokenCheck, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    const res = await response.json();
    if (res.status !== 200) {
      // TODO : handle error
    } else {
      router.push(routes.SET_NEW_PASSWORD);
      console.log(values);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        {/* code input */}
        <MyFormField
          form={form}
          value="code"
          placeholder="Enter code here"
          icon={
            <IconZoomCheckFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />
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
