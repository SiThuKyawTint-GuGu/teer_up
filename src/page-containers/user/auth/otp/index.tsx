"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Typo/Text";
import { useGetOtp, useOtpVerified } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  verificationCode: yup.string().required("Enter verification code"),
});
interface OtpFormData {
  verificationCode: string;
}
const Otp = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const { isMutating: verifiedLoading, trigger: verified, error } = useOtpVerified();
  const { isMutating, trigger: getOtpCode } = useGetOtp();
  const [isPending, startTransition] = useTransition();
  const getOtp = async () => {
    await getOtpCode();
  };
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: OtpFormData) => {
    await verified(data, {
      onSuccess: res => {
        setUserInfo(res.data.token, res.data.data);
        startTransition(() => {
          router.refresh();
          router.push("/home");
        });
      },
    });
  };

  return (
    <div className="h-screen flex flex-col relative px-5">
      <button
        className="flex w-full justify-end text-primary mt-5 font-[600] text-[18px]"
        onClick={() => setModalOpen(true)}
      >
        Skip for now
      </button>
      <div className="flex flex-col justify-center flex-wrap gap-y-5  h-full items-center w-full flex-1">
        <div>{error && <div className="text-primary">{error.response.data.message}</div>}</div>
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
                    <InputText type="text" className="bg-white shadow-md" {...field} placeholder="Enter a otp" />
                    {/* <OtpInput /> */}
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending || verifiedLoading} size="lg">
              Verify
            </Button>
          </form>
          <button className="text-primary">Change email</button>
          <Button size="lg" onClick={getOtp} disabled={isMutating}>
            Resend Varification
          </Button>
        </Form>
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="bg-white w-[398px]">
            <div className="text-center w-full py-[16px] text-[20px] font-[600]">Verfiy Email</div>
            <div className="bg-[#EEE] w-full px-[24px] py-[32px] flex flex-col flex-wrap gap-y-3">
              <Text className="text-center font-[400]">
                Are you sure to continue without verification? We will not be able to save your progress if you do not
                verify email.
              </Text>

              <Button size="lg" className="w-full" onClick={() => setModalOpen(false)}>
                Verify now
              </Button>
              <button onClick={() => router.push("/home")}>Verify Later</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Otp;
