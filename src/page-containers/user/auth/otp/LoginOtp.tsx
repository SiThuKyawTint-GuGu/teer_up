"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { useOtpVerified } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTransition } from "react";

const validationSchema = yup.object({
  verificationCode: yup.string().required("Enter verification code"),
});
interface OtpFormData {
  verificationCode: string;
}
const LoginOtp = () => {
  const router = useRouter();
  const { trigger: verified, error, isMutating } = useOtpVerified();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: OtpFormData) => {
    await verified(data, {
      onSuccess: res => {
        setUserInfo(res.data.token, res.data.data);
        {
          startTransition(() => router.push("/home"));
        }
      },
    });
  };

  console.log(error);

  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-center flex-wrap gap-y-5  h-full items-center w-full flex-1">
        <div>{/* {message && <div className="text-green-800">{message}</div>} */}</div>
        <div className="flex justify-start w-full flex-col mb-[32px] flex-wrap gap-y-3">
          <div className="font-[700] text-[36px]">Enter Otp</div>
          <div className="text-[16px] font-[300]">Check your inbox and enter the received OTP</div>
        </div>

        <Form {...form}>
          <form
            className="w-full flex flex-col justify-center flex-wrap gap-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {error && <div className="text-primary">{error.response.data.message}</div>}
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputText type="text" {...field} placeholder="Enter a otp" />
                    {/* <OtpInput /> */}
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending || isMutating} size="lg">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginOtp;
