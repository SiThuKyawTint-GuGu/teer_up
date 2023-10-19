"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { postMethod } from "@/hooks/postMethod";
import { useOtpVerified } from "@/services/user";
import { OtpResponse } from "@/types/User";
import { getToken, setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
const token: string = getToken();
const validationSchema = yup.object({
  verificationCode: yup.string().required("Enter verification code"),
});
interface OtpFormData {
  verificationCode: string;
}
const Otp = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isMutating: verifiedLoading, trigger: verified } = useOtpVerified();
  const getOtp = async () => {
    postMethod<OtpResponse>("/user/requestotp", {}, token)
      .then(data => {
        setMessage(data.message);
        setError(null);
      })
      .catch(error => {
        setMessage(null);
        setError(error.message);
      });
  };
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: OtpFormData) => {
    await verified(data, {
      onSuccess: res => {
        setUserInfo(res.data.token, res.data.data);
        router.push("/home");
      },
    });
  };

  return (
    <div className="h-screen flex flex-col relative px-5">
      <button className="flex w-full justify-end text-primary mt-5 font-[600] text-[18px]">
        Skip for now
      </button>
      <div className="flex flex-col justify-center flex-wrap gap-y-5  h-full items-center w-full flex-1">
        <div>
          {message && <div className="text-green-800">{message}</div>}
          {error && <div className="text-primary">{error}</div>}
        </div>
        <div className="flex justify-start w-full flex-col mb-[32px] flex-wrap gap-y-3">
          <div className="font-700 text-[36px]">Verify email</div>
          <div className="text-[16px] font-[300]">Check your inbox and enter the received OTP</div>
        </div>
        <Form {...form}>
          <form
            className="w-full flex flex-col justify-center flex-wrap gap-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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

            <Button type="submit" disabled={verifiedLoading} size="lg">
              Verify
            </Button>
          </form>
          <button className="text-primary">Change email</button>
          <Button size="lg" onClick={getOtp}>
            Resend Varification
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Otp;
