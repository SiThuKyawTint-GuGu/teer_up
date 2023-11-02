"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons, Image } from "@/components/ui/Images";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Typo/Text";
import { useGetOtp, useOtpVerified } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import OtpInput from "react-otp-input";

const validationSchema = yup.object({
  verificationCode: yup.string().required("Enter verification code"),
});
interface OtpFormData {
  verificationCode: string;
}
const Otp = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
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
          router.push("/industry");
        });
      },
    });
  };

  return (
    <Grid columns="1">
      <Box className="h-screen" px="4">
        <Flex direction="column" position="relative" height="100%">
          <Flex justify="between" align="center">
            <Button onClick={() => router.back()} className="p-0" variant="ghost">
              <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
            </Button>
            <Button className="text-primary p-0" variant="ghost" onClick={() => setModalOpen(true)}>
              Skip for now
            </Button>
          </Flex>
          <Flex direction="column" justify="start" align="center" wrap="wrap" mt="9">
            <div>{error && <div className="text-primary">{error.response.data.message}</div>}</div>
            <Flex justify="center" align="center" mb="6">
              <Image src="/uploads/icons/auth/otp.svg" width={180} height={180} alt="login" />
            </Flex>
            <div className="flex justify-start w-full flex-col mb-[32px] flex-wrap gap-y-3">
              <Heading as="h3" size="6">
                Enter OTP
              </Heading>
              <Text size="3" weight="light">
                Check your inbox and enter the received OTP
              </Text>
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
                        {/* <InputText type="text" className="bg-white shadow-md" {...field} placeholder="Enter a otp" /> */}
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          inputType="number"
                          inputStyle={{
                            width: 53,
                            height: 64,
                            background: "#ffffff",
                            boxShadow: "0px 26px 30px 0px rgba(0, 0, 0, 0.05)",
                            borderRadius: 8,
                            marginRight: 5,
                          }}
                          renderInput={props => <input {...props} />}
                        />
                        {/* <OtpInput /> */}
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isPending || verifiedLoading}>
                  Login
                </Button>
              </form>
              {/* <Button onClick={getOtp} disabled={isMutating}>
            Resend Varification
          </Button> */}
            </Form>
          </Flex>
          {modalOpen && (
            <Modal onClose={() => setModalOpen(false)}>
              <div className="bg-white w-[398px]">
                <div className="text-center w-full py-[16px] text-[20px] font-[600]">Verfiy Email</div>
                <div className="bg-[#EEE] w-full px-[24px] py-[32px] flex flex-col flex-wrap gap-y-3">
                  <Text className="text-center font-[400]">
                    Are you sure to continue without verification? We will not be able to save your progress if you do
                    not verify email.
                  </Text>

                  <Button size="lg" className="w-full" onClick={() => setModalOpen(false)}>
                    Verify now
                  </Button>
                  <button onClick={() => router.push("/industry")}>Verify Later</button>
                </div>
              </div>
            </Modal>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default Otp;
