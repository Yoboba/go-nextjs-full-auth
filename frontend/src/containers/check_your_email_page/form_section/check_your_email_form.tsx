"use client";
import { Form } from "@/components/ui/form";
import { IconZoomCheckFilled } from "@tabler/icons-react";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import url from "@/constants/url";
import { useToast } from "@/hooks/use-toast";
import { messages } from "@/constants/messages";

export default function CheckYourEmailForm() {
  const router = useRouter();
  const { toast } = useToast();
  const checkYourEmailFormSchema = z.object({
    code: z
      .string()
      .min(2, { message: "Code should be at least 2 characters" })
      .max(15, { message: "Code should be less than 15 characters" }),
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
      body: JSON.stringify(values),
    });
    const res = await response.json();
    if (res.status !== 200) {
      toast({
        variant: "destructive",
        title: messages.errorMessage,
        description: messages.tokenCheckFailedDescription,
      });
    } else {
      router.push(`/set-new-password/${values.code}/${res.data}`);
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
