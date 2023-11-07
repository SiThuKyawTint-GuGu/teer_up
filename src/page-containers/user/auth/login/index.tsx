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
import { useUserLogin } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useState, useTransition } from "react";

const validationSchema = yup.object({
  email: yup.string().email().required("Please enter email address").default(""),
  // password: yup.string().required("Password is required!").default(""),
});

interface Login {
  email: string;
  // password: string;
}

const Login: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();
  const { ...form } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { isMutating, trigger, error } = useUserLogin();
  const [isPending, startTransition] = useTransition();

  const loginHandler = async (data: Login) => {
    await trigger(data, {
      onSuccess: res => {
        setUserInfo(res.data.token, res.data.data);
        startTransition(() => {
          router.push("/auth/otp");
        });
      },
    });
  };

  return (
    <Grid columns="1" px="4" className="h-screen bg-layout">
      <Flex direction="column" justify="start" align="center" width="100%" wrap="wrap" height="100%" mt="9">
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
        <div className="space-y-[10px]">
          <Form {...form}>
            <form className="w-full flex flex-col justify-center flex-wrap" onSubmit={form.handleSubmit(loginHandler)}>
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
              {/* <Flex width="100%" wrap="wrap" gap="1" my="5">
                <Checkbox onCheckedChange={(val: boolean) => setChecked(val)} />
                <Text weight="regular" size="2">
                  I have read, understood and accept
                  <Link href="/support/privacy-policy" className="text-primary ml-2">
                    Terms of Use.
                  </Link>
                </Text>
              </Flex> */}
              <Flex width="100%" gap="1" my="5">
                <Checkbox onCheckedChange={(val: boolean) => setChecked(val)} />
                <Text className="space-x-[5px]" as="div" weight="light" size="2">
                  <Text as="span">By clicking &#34;Next&#34;, I have read, understood, and given my</Text>
                  <Button className="p-0 h-auto" variant="link">
                    consent
                  </Button>
                  <Text as="span">and accepted the</Text>
                  <Link href="/support/terms-of-use">
                    <Button className="p-0 h-auto" variant="link">
                      Terms of Use
                    </Button>
                  </Link>
                </Text>
              </Flex>

              <Button type="submit" loading={isPending || isMutating} disabled={isPending || isMutating || !checked}>
                Send OTP code
              </Button>
            </form>
          </Form>
          <Flex justify="center" wrap="wrap" width="100%" gap="2">
            <Text weight="light">Don’t have an account? </Text>
            <Link href="/auth/signup">
              <button className="text-primary">Sign up now</button>
            </Link>
          </Flex>
        </div>
      </Flex>
    </Grid>
  );
};

export default Login;
