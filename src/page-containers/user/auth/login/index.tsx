"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { useUserLogin } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  email: yup.string().email().required("Please enter email address!").default(""),
  // password: yup.string().required("Password is required!").default(""),
});

interface LoginData {
  email: string;
  // password: string;
}

const Login = () => {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { isMutating, trigger } = useUserLogin();

  const loginHandler = async (data: LoginData) => {
    await trigger(data, {
      onSuccess: response => {
        setUserInfo(response.data.token, response.data.data);
        router.push("/auth/otp");
      },
    });
  };

  return (
    <div className="h-screen flex   relative px-5">
      <div className="flex flex-col justify-center  h-full items-center w-full ">
        <div className="flex justify-start w-full flex-col mb-[32px] flex-wrap gap-y-3">
          <div className="font-700 text-[36px]">Login</div>
          <div className="text-[16px] font-[300]">An OTP code will be send to your email</div>
        </div>
        <Form {...form}>
          <form
            className="mx-auto flex flex-col flex-wrap justify-center gap-y-5 w-full"
            onSubmit={form.handleSubmit(loginHandler)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputText type="text" {...field} placeholder="Enter your emailaddress" />
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
              Login
            </Button>
          </form>
        </Form>
        <div className="flex flex-wrap gap-x-1 mt-3">
          <Text>Don’t have an account? </Text>
          <button className="text-primary" onClick={() => router.push("/auth/signup")}>
            Sign up now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
