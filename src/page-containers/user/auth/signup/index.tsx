"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons, Image } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Autocomplete, Item } from "@/components/ui/Inputs/Autocomplete";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { useGetCountries } from "@/services/country";
import { CountriesResponse } from "@/types/Countries";
import { setUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useUserRegister } from "../../../../services/user";
import GoogleLogin from "../login/GoogleLogin";
interface SignUpFormType {
  email: string;
  name: string;
  country: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  name: yup.string().required("Name is required!"),
  country: yup.string().required("Country is required!"),
});

const SignUp = () => {
  const router = useRouter();
  const comboboxRef = useRef<any>(null);
  const searchParams = useSearchParams();
  const referalCode = searchParams.get("referalCode");
  const [isPending, startTransition] = useTransition();
  const [checked, setChecked] = useState<boolean>(false);
  const { trigger, error, isMutating } = useUserRegister();
  const { data: countries } = useGetCountries<CountriesResponse>();
  const form = useForm<SignUpFormType>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpFormType) => {
    await trigger(
      { ...data, referal_code: referalCode || null },
      {
        onSuccess: response => {
          setUserInfo(response.data.token, response.data.data);
          startTransition(() => router.push("/auth/otp"));
        },
      }
    );
  };

  return (
    <Dialog>
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
        <Box className="h-[calc(100vh-42px)]  overflow-y-scroll no-scrollbar" mb="5" pb="5" px="4" mt="1">
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
                    name="country"
                    render={({ field }) => {
                      const result = field.value
                        ? countries?.data?.filter(item => item.name.toLowerCase().includes(field.value.toLowerCase()))
                        : countries?.data;

                      return (
                        <FormItem>
                          <FormControl>
                            <Autocomplete
                              className={cn(
                                "bg-white shadow-md",
                                form.formState.errors.country && "border-2 border-primary focus:outline-0"
                              )}
                              placeholder="Select your country"
                              {...field}
                            >
                              {result?.length ? (
                                result?.map((each, key) => (
                                  <Item key={key} value={each?.name}>
                                    {each?.name}
                                  </Item>
                                ))
                              ) : (
                                <Item value="">No country found!</Item>
                              )}
                            </Autocomplete>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  <Flex width="100%" gap="1" my="5">
                    <Checkbox onCheckedChange={(val: boolean) => setChecked(val)} />
                    <Text className="space-x-[5px]" as="div" weight="light" size="2">
                      <Text as="span">By clicking &#34;Next&#34;, I have read, understood, and given my</Text>
                      <DialogTrigger className="p-0 h-auto text-primary font-bold">consent</DialogTrigger>
                      <Text as="span">and accepted the</Text>
                      <Link href="/support/terms-of-use">
                        <Button className="p-0 h-auto font-bold" variant="link">
                          Terms of Use
                        </Button>
                      </Link>
                    </Text>
                  </Flex>

                  <Button
                    type="submit"
                    loading={isPending || isMutating}
                    disabled={isPending || isMutating || !checked}
                  >
                    Sign up
                  </Button>
                </form>
              </Form>
              <Text align="center" className="my-1">
                Or
              </Text>
              <GoogleLogin forLogin={false} />
              <Flex justify="center" wrap="wrap" width="100%" gap="2">
                <Text weight="light">Already have an account?</Text>
                <Link href="/auth/login">
                  <button className="text-primary font-bold">Log in</button>
                </Link>
              </Flex>
            </div>
          </Flex>
        </Box>
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
              <Button className="w-[120px]">Next</Button>
            </DialogClose>
          </Flex>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
