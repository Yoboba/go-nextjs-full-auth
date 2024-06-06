import FormSection from "@/containers/set_new_password_page/form_section";

export default function SetNewPasswordPage({
  params,
}: {
  params: { token: string; userId: string };
}) {
  return (
    <div className="flex h-full justify-center items-center ">
      <FormSection userId={params.userId} token={params.token} />
    </div>
  );
}
