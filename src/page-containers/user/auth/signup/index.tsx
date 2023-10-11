'use client';
import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { InputText } from '@/components/ui/Inputs';
import { Text } from '@/components/ui/Typo/Text';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';
import { yupResolver } from '@hookform/resolvers/yup';

interface SignUpFormType {
  email: String;
  name: String;
  // country: String;
}

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required!'),
  name: yup.string().required('Name is required!'),
  country: yup.number().required('Country is required!'),
  password: yup.string().required('Password is required!'),
});

const SignUp = () => {
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: SignUpFormType) => {
    console.log('data -> ', data);
  };
  //   console.log(form.formState.errors);
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" />
        <Form {...form}>
          <form
            className="mx-auto flex flex-col justify-center gap-y-3 w-[90%]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your name</FormLabel>
                  <FormControl>
                    <InputText type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your country</FormLabel>
                  <FormControl>
                    <InputText type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <Button type="submit" size="lg">
              Sign Up
            </Button>
          </form>
        </Form>

        <Text as="div" className=" text-black absolute bottom-3 w-[80%] mx-auto">
          By clicking &quot;Sign Up&quot;, I have read, understood, and given my consent and
          accepted the Terms of Use.
        </Text>
      </div>
    </div>
  );
};

export default SignUp;
