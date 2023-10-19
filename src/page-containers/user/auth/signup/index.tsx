"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserRegister } from "../../../../services/user";
interface SignUpFormType {
  email: string;
  name: string;
  country: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Please enter email address"),
  name: yup.string().required("Please enter  name"),
  country: yup.string().required("Please select country"),
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

  const { isMutating, trigger, error } = useUserRegister();
  const onSubmit = async (data: SignUpFormType) => {
    await trigger(data, {
      onSuccess: response => {
        setUserInfo(response.data.token, response.data.data);
        router.push("/auth/otp");
      },
    });
  };
  return (
    <div className="h-screen flex flex-col relative px-5">
      {error && <div className="text-primary">{error}</div>}
      <div className="flex flex-col  h-full justify-center w-full flex-1">
        <Text as="div" className="mb-[3rem] text-[36px] font-[700]">
          {" "}
          Sign Up
        </Text>
        <Form {...form}>
          <form
            className="mx-auto flex flex-col justify-center gap-y-3 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputText type="text" {...field} placeholder="Enter your name" />
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
                      className="block w-full rounded-[9px]  bg-white text-gray-400  px-[20px] py-[14px] outline-none"
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
            <div className="flex w-full flex-wrap gap-x-1">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-5 h-5 checked:bg-white border-slateGray bg-white dark:ring-white rounded text-white focus:ring-slateGray focus:ring-2"
              />
              <Text as="div">I have read, understood and accept</Text>
              <Text as="span" className="text-primary">
                Terms of Use
              </Text>
            </div>
            <Button type="submit" size="lg" className="mt-5" disabled={isMutating}>
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="flex flex-wrap gap-x-1 mt-3">
          <Text>Already have an account? Log in </Text>
          <button className="text-primary" onClick={() => router.push("/auth/login")}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
