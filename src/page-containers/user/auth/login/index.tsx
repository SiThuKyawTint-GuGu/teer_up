"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { useUserLogin } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required!").default(""),
  // password: yup.string().required("Password is required!").default(""),
});

interface Login {
  email: string;
  // password: string;
}

const Login = () => {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { isMutating, trigger, error } = useUserLogin();

  const loginHandler = async (data: Login) => {
    await trigger(data, {
      onSuccess: res => {
        setUserInfo(res.data.token, res.data.data);
        router.push("/auth/otp");
      },
    });
  };

  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-center h-full items-center w-full flex-wrap gap-y-5">
        <div className="flex justify-start w-full flex-col mb-[32px] flex-wrap gap-y-3">
          <div className="font-700 text-[36px]">Login</div>
          <div className="text-[16px] font-[300]">An OTP code will be send to your email</div>
        </div>
        {error && <div className="text-primary">{error.response.data.message}</div>}
        <Form {...form}>
          <form
            className="mx-auto flex flex-col justify-center gap-y-3 w-full"
            onSubmit={form.handleSubmit(loginHandler)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email address</FormLabel>
                  <FormControl>
                    <InputText type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex w-full flex-wrap gap-x-1">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-5 h-5  border-slateGray bg-white rounded  focus:ring-slateGray  focus:ring-2 "
              />
              <Text as="div">I have read, understood and accept</Text>
              <Text as="span" className="text-primary">
                Terms of Use
              </Text>
            </div>

            <Button type="submit" size="lg" disabled={isMutating}>
              Send OTP
            </Button>
          </form>
        </Form>
        <div className="flex w-full flex-wrap gap-x-1 justify-center">
          <Text as="div">Don’t have an account? </Text>
          <button onClick={() => router.push("/auth/signup")} className="text-primary">
            Sign up now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
