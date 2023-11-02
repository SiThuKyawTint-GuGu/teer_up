"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons, Image } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { setUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
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
      <Box>
        <Flex justify="between" align="center">
          <Button onClick={() => router.back()} className="p-0" variant="ghost">
            <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
          </Button>
          <Button className="text-primary p-0 opacity-0" variant="ghost">
            Skip for now
          </Button>
        </Flex>
      </Box>
      <Box className="h-screen" px="4" mt="6">
        <Flex direction="column" position="relative">
          <Flex justify="center" align="center" mb="6">
            <Image src="/uploads/icons/auth/login.svg" width={180} height={180} alt="login" />
          </Flex>
          <Flex justify="center" width="100%" direction="column" wrap="wrap" mb="4">
            <Heading as="h4" size="7" weight="bold" mb="3">
              Sign Up
            </Heading>
          </Flex>
          {error && <div className="text-primary">{error.response.data.message}</div>}
          <div className="space-y-[10px]">
            <Form {...form}>
              <form
                className="w-full flex flex-col justify-center flex-wrap space-y-[25px]"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          className={cn(
                            "bg-white shadow-md",
                            form.formState.errors.email && "border-2 border-primary focus:outline-0"
                          )}
                          placeholder="Enter your email address"
                          type="text"
                          {...field}
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
                          className={cn(
                            "bg-white shadow-md",
                            form.formState.errors.name && "border-2 border-primary focus:outline-0"
                          )}
                          placeholder="Enter your name"
                          type="text"
                          {...field}
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
                          className={cn(
                            "bg-white shadow-md",
                            form.formState.errors.name && "border-2 border-primary focus:outline-0"
                          )}
                          placeholder="Enter your name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Flex width="100%" gap="1" my="5">
                  <Checkbox onCheckedChange={(val: boolean) => setChecked(val)} />
                  <Text className="space-x-[5px]" as="div" weight="light" size="2">
                    <Text as="span">By clicking &#34;Next&#34;, I have read, understood, and given my</Text>
                    <Button className="p-0 h-auto" variant="link">
                      consent
                    </Button>
                    <Text as="span">and accepted the</Text>
                    <Button className="p-0 h-auto" variant="link">
                      Terms of Use
                    </Button>
                  </Text>
                </Flex>

                <Button type="submit" loading={isPending || isMutating} disabled={isPending || isMutating || !checked}>
                  Sign up
                </Button>
              </form>
            </Form>
            <Flex justify="center" wrap="wrap" width="100%" gap="2">
              <Text weight="light">Already have an account?</Text>
              <button onClick={() => router.push("/auth/login")} className="text-primary">
                Log in
              </button>
            </Flex>
          </div>
        </Flex>
      </Box>
    </Grid>
  );
};

export default SignUp;
