"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons, Image } from "@/components/ui/Images";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Typo/Text";
import { useGetOtp, useOtpVerified } from "@/services/user";
import { setLocalStorage } from "@/utils";
import { AUTH_TYPE, getToken, JWT_DECODE, setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import jwt_decode from "jwt-decode";
import OtpInput from "react-otp-input";

const validationSchema = yup.object({
  verificationCode: yup.string().required("Enter verification code"),
});

interface OtpFormData {
  verificationCode: string;
}

const Otp = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const token = getToken();
  const formRef = useRef<any>();
  const [isPending, startTransition] = useTransition();
  const [showResend, setShowResend] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(20);

  const { isMutating: verifiedLoading, trigger: verified } = useOtpVerified();
  const { isMutating, trigger: getOtpCode } = useGetOtp();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const otpValue = useWatch({ control: form?.control, name: "verificationCode" });
  const jwtDecode = token && (jwt_decode(token) as JWT_DECODE);
  const [message, setMessage] = useState<{ isError: boolean; messageValue: string }>({
    isError: false,
    messageValue: "",
  });

  const getOtp = async () => {
    setSeconds(20);
    await getOtpCode(null, {
      onSuccess: (res: any) => {
        setMessage(prev => ({ ...prev, isError: false, messageValue: res.data.message }));
      },
      onError: (res: any) => {
        setMessage(prev => ({ ...prev, isError: true, messageValue: res.response.data.message }));
      },
    });
  };

  const onSubmit = useCallback(async (data: OtpFormData) => {
    await verified(data, {
      onSuccess: res => {
        setUserInfo(res.data.token, res.data.data);
        startTransition(() => {
          router.refresh();
          if (jwtDecode.action === AUTH_TYPE.SIGNIN) {
            router.push("/home");
            return;
          }
          setLocalStorage("content", 0);
          router.push("/industry");
        });
      },
      onError: (res: any) => {
        setMessage(prev => ({ ...prev, isError: true, messageValue: res.response.data.message }));
      },
    });
  }, []);

  useEffect(() => {
    const coundSeconds = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    if (seconds === 0) {
      setShowResend(() => true);
      clearInterval(coundSeconds);
    }
    return () => {
      clearInterval(coundSeconds);
      setShowResend(() => false);
    };
  }, [seconds]);

  useEffect(() => {
    if (otpValue && otpValue.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  }, [form, otpValue, onSubmit]);

  return (
    <Dialog>
      <Grid columns="1">
        <Box className="h-[100dvh-96px]" px="4">
          <Flex direction="column" position="relative" height="100%">
            <Flex justify="between" align="center">
              <Button onClick={() => router.back()} className="p-0" variant="ghost">
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </Button>
              {jwtDecode?.action === AUTH_TYPE.SIGNUP && (
                <Button className="text-primary p-0" variant="ghost" onClick={() => setModalOpen(true)}>
                  Skip for now
                </Button>
              )}
            </Flex>
            {message.messageValue && (
              <Flex
                gap="2"
                className={`${
                  message.isError ? "bg-red-100" : "bg-green-100"
                } text-start font-[400] text-[16px]  p-[16px] w-full `}
              >
                <Image
                  src={message.isError ? "/auth/error.svg" : "/personalize/ActiveIcon.svg"}
                  width={24}
                  height={24}
                  alt="error OTP"
                />
                {message.messageValue}
              </Flex>
            )}
            <Flex direction="column" justify="start" align="center" wrap="wrap" mt="6">
              <Flex justify="center" align="center" mb="6">
                <Image src={"/uploads/icons/auth/otp.svg"} width={180} height={180} alt="login" />
              </Flex>
              <div className="flex justify-start w-full flex-col mb-[32px] flex-wrap gap-y-1">
                <Heading as="h3" size="6">
                  {jwtDecode?.action === AUTH_TYPE.SIGNUP ? "Verify email" : "Enter OTP"}
                </Heading>
                <Text size="3" weight="light">
                  Check your inbox and enter the received OTP
                </Text>
              </div>

              <Form {...form}>
                <form
                  className="w-full flex flex-col justify-center flex-wrap gap-y-3 hide-number-spin "
                  onSubmit={form.handleSubmit(onSubmit)}
                  ref={formRef}
                >
                  <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <div className="flex align-middle justify-center">
                              <OtpInput
                                numInputs={6}
                                inputType="number"
                                inputStyle={{
                                  width: "16%",
                                  height: 64,
                                  background: "#ffffff",
                                  boxShadow: "0px 26px 30px 0px rgba(0, 0, 0, 0.05)",
                                  borderRadius: 8,
                                  margin: 5,
                                  outline: 0,
                                }}
                                {...field}
                                renderInput={props => <input {...props} />}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <Flex align="center">
                    {showResend ? (
                      <>
                        <Text>Didn&apos;t get it? </Text>
                        <Button
                          variant="link"
                          className="text-primary text-[16px]"
                          onClick={getOtp}
                          loading={isMutating}
                          disabled={isMutating}
                        >
                          Resend
                        </Button>
                      </>
                    ) : (
                      <Text as="div">Resend code in {seconds}s</Text>
                    )}
                  </Flex>

                  <Button type="submit" loading={isPending} disabled={isPending || verifiedLoading} className="mt-5">
                    Login
                  </Button>
                  {jwtDecode?.action === AUTH_TYPE.SIGNUP && <Button variant="link">Change email</Button>}
                </form>
              </Form>
            </Flex>
            {modalOpen && (
              <Modal onClose={() => setModalOpen(false)}>
                <div className="p-4">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="text-center w-full py-[16px] text-[20px] font-[600]">Verfiy Email</div>
                    <div className="bg-[#EEE] w-full px-[24px] py-[32px] flex flex-col flex-wrap gap-y-3">
                      <Text className="text-center font-[400]">
                        Are you sure to continue without verification? We will not be able to save your progress if you
                        do not verify email.
                      </Text>

                      <Button className="w-full" onClick={() => setModalOpen(false)}>
                        Verify now
                      </Button>
                      <Button variant="ghost" onClick={() => router.push("/industry")}>
                        Verify Later
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </Flex>
        </Box>
      </Grid>
    </Dialog>
  );
};

export default Otp;
