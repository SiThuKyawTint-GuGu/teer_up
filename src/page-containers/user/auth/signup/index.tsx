"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex } from "@radix-ui/themes";
import { useTransition } from "react";
import { useUserRegister } from "../../../../services/user";
interface SignUpFormType {
  email: string;
  name: string;
  country: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  name: yup.string().required("Name is required!"),
  country: yup.string().required("Country is required!"),
  // password: yup
  //   .string()
  //   .min(
  //     8,
  //     'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
  //   )
  //   .required('Password is required!'),
});

const SignUp = () => {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [ispending, startTransition] = useTransition();

  const { isMutating, trigger, error } = useUserRegister();
  const onSubmit = async (data: SignUpFormType) => {
    await trigger(data, {
      onSuccess: response => {
        setUserInfo(response.data.token, response.data.data);
        startTransition(() => router.push("/auth/otp"));
      },
    });
  };
  return (
    <div className="h-screen flex flex-col relative px-5">
      {error && <div className="text-primary">{error.response.data.message}</div>}
      <div className="flex flex-col  h-full justify-center w-full flex-1">
        <Text as="div" className="mb-[3rem] text-[36px] font-[700]">
          {" "}
          Sign Up
        </Text>
        <Form {...form}>
          <form
            className="mx-auto flex flex-col h-full justify-center flex-wrap gap-y-[30px] w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputText
                      type="text"
                      {...field}
                      placeholder="Enter your email address"
                      className="py-[30px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputText
                      type="text"
                      {...field}
                      placeholder="Enter your name"
                      className="py-[30px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <InputText type="text" {...field} placeholder="Select a country" /> */}
                    <select
                      data-te-select-init
                      aria-invalid="true"
                      aria-describedby="name-error"
                      autoComplete="off"
                      placeholder="Select a country"
                      className="block w-full rounded-[9px]  bg-white text-gray-400  px-[5px] py-[30px] outline-none"
                      {...field}
                    >
                      <option value="">Select a country</option>
                      <option value="1">Country 1</option>
                      <option value="2">Country 2</option>
                      <option value="3">Country 3</option>
                      <option value="4">Country 4</option>
                      <option value="5">Country 5</option>
                      <option value="6">Country 6</option>
                      <option value="7">Country 7</option>
                      <option value="8">Country 8</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Flex direction="row" gap="2" align="start">
              <Checkbox />
              <Text as="div">
                I have read, understood and accept{" "}
                <Text as="span" className="text-primary">
                  Terms of Use
                </Text>
              </Text>
            </Flex>
            <Button type="submit" size="lg" className="mt-5" disabled={ispending}>
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
