"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { postMethod } from "@/hooks/postMethod";
import { AuthResponse } from "@/types/User";
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

  const [error, setError] = useState<string | null>(null);

  const loginHandler = async (data: Login) => {
    await trigger(data, {
      onSuccess: res => {
        setUserInfo(res.data.token, res.data.data);
        router.push("/auth/login/otp");
      },
    });
  };

  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Form {...form}>
          <form
            className="mx-auto flex flex-col justify-center gap-y-3 w-[90%]"
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
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your Password</FormLabel>
                  <FormControl>
                    <InputText type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            <Button type="submit" size="lg">
              Login
            </Button>
          </form>
        </Form>
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
        <Button onClick={() => router.push("/signup")}>Sign Up</Button>
      </div>
    </div>
  );
};

export default Login;
