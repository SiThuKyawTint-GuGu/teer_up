"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Image } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { useUserLogin } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
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
    <Dialog>
      <Grid columns="1" px="4" className="h-screen bg-layout">
        <Flex direction="column" justify="start" align="center" width="100%" wrap="wrap" height="100%" mt="9">
          <Flex className="mb-[48px]" justify="center" align="center">
            <Image src="/uploads/icons/auth/login.svg" width={180} height={180} alt="login" />
          </Flex>
          <Flex justify="center" width="100%" direction="column" wrap="wrap" className="mb-[32px]">
            <Heading className="text-[36px]" as="h4" weight="bold" mb="3">
              Log in
            </Heading>
            <Text weight="light">An OTP code will be send to your email</Text>
          </Flex>
          {error && <div className="text-primary">{error.response.data.message}</div>}
          <div className="space-y-[10px]">
            <Form {...form}>
              <form
                className="w-full flex flex-col justify-center flex-wrap"
                onSubmit={form.handleSubmit(loginHandler)}
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
                    <DialogTrigger className="p-0 h-auto text-primary font-bold">
                      consent
                      <Button type="button" className="p-0 h-auto" variant="link"></Button>
                    </DialogTrigger>
                    <Text as="span">and accepted the</Text>
                    <Link href="/support/terms-of-use">
                      <Button className="p-0 h-auto font-bold font-medium" variant="link">
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
                <button className="text-primary font-bold">Sign up now</button>
              </Link>
            </Flex>
          </div>
        </Flex>
      </Grid>
      <DialogContent isClose={false} closeStyles="top-8 right-8" className="shadow-none">
        <Box className="bg-white p-6 space-y-4 max-h-[600px] rounded-md overflow-y-scroll">
          <Heading as="h5" className="text-black text-2xl font-semibold">
            Consent
          </Heading>
          <Text className="text-sm">
            By clicking on “Next”, I confirm that I have read, understood and given my consent for Prudential Assurance
            Company Singapore and its related corporations, respective representatives, agents, third party service
            providers, contractors and/or appointed distribution/business partners (collectively referred to as
            “Prudential”), and Small and Medium-sized Enterprises (“SME”) to collect, use, disclose and/or process
            my/our personal data for the purpose(s) of:
          </Text>
          <Text className="text-sm">
            <ul>
              <li>1) Registration for TEE-Up Programme application.</li>
              <li>2) Events and Courses sign ups.</li>
              <li>3) Internship or Job applications.</li>
              <li>4) Educational and promotional purposes.</li>
            </ul>
          </Text>
          <Text className="text-sm">
            I understand that I can refer to Prudential Data Privacy, which is available at{" "}
            <Link href="https://www.prudential.com.sg/Privacy-Notice" target="_blank">
              <Text as="span" className="text-primary">
                Privacy Notice
              </Text>{" "}
            </Link>
            for more information.
          </Text>
          <Text>
            I may contact{" "}
            <Link href="mailto:innovation@prudential.com.sg">
              <Text as="span" className="text-primary">
                innovation@prudential.com.sg
              </Text>{" "}
            </Link>
            on how I may access and correct my personal data or withdraw consent to the collection, use or disclosure of
            my personal data.
          </Text>
          <Flex justify="center">
            <DialogClose>
              <Button className="w-[120px]">Close</Button>
            </DialogClose>
          </Flex>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
