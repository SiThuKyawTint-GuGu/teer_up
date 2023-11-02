"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Image } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { useState, useTransition } from "react";
import { useUserRegister } from "../../../../services/user";
interface SignUpFormType {
  email: string;
  name: string;
  // country: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  name: yup.string().required("Name is required!"),
});

const SignUp = () => {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [checked, setChecked] = useState<boolean>(false);

  const { trigger, error, isMutating } = useUserRegister();
  const onSubmit = async (data: SignUpFormType) => {
    await trigger(data, {
      onSuccess: response => {
        setUserInfo(response.data.token, response.data.data);
        startTransition(() => router.push("/auth/otp"));
      },
    });
  };
  return (
    <Grid columns="1">
      <Box className="h-screen" px="4">
        <Flex direction="column" position="relative">
          <Flex justify="center" align="center" mb="6">
            <Image src="/uploads/icons/auth/login.svg" width={180} height={180} alt="login" />
          </Flex>
          <Flex justify="center" width="100%" direction="column" wrap="wrap" mb="4">
            <Heading as="h4" size="7" weight="bold" mb="3">
              Login
            </Heading>
            <Text weight="light">An OTP code will be send to your email</Text>
          </Flex>
          {error && <div className="text-primary">{error.response.data.message}</div>}
          <div className="flex flex-col  h-full justify-center   w-full flex-1">
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
                          className="bg-white shadow-md"
                          {...field}
                          placeholder="Enter your email address"
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
                          className="bg-white shadow-md"
                          {...field}
                          placeholder="Enter your name"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Flex direction="row" gap="2" align="start">
                  <Checkbox onCheckedChange={(val: boolean) => setChecked(val)} />
                  <Text as="div">
                    I have read, understood and accept{" "}
                    <Text as="span" className="text-primary">
                      Terms of Use
                    </Text>
                  </Text>
                </Flex>
                <Button type="submit" size="lg" className="mt-5" disabled={isPending || isMutating || !checked}>
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </Flex>
      </Box>
    </Grid>
  );
};

export default SignUp;
