'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { InputText } from '@/components/ui/Inputs';
import { Text } from '@/components/ui/Typo/Text';
import { postMethod } from '@/hooks/postMethod';
import { AuthResponse } from '@/types/User';
import { setUserInfo } from '@/utils/auth';
import { yupResolver } from '@hookform/resolvers/yup';
interface SignUpFormType {
  email: String;
  name: String;
  country: number;
  password: String;
}

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required!'),
  name: yup.string().required('Name is required!'),
  country: yup.number().required('Country is required!'),
  password: yup
    .string()
    .min(
      8,
      'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
    )
    .required('Password is required!'),
});

const SignUp = () => {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [studentRegister, setStudentRegister] = useState<Boolean>(true);
  const endPoint = studentRegister ? '/user/register' : '/user/mentor/register';
  const onSubmit = (data: SignUpFormType) => {
    postMethod<AuthResponse>(endPoint, data)
      .then(response => {
        setError(null);
        setUserInfo(response.token, response.data);
        router.push('/auth/otp');
        console.log(response);
      })
      .catch(error => setError(error.message));
  };
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex justify-center py-5">
        {studentRegister ? (
          <Button onClick={() => setStudentRegister(false)}>To Mentor Register Form</Button>
        ) : (
          <Button onClick={() => setStudentRegister(true)}>To Student Register</Button>
        )}
      </div>
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src="/auth/teeUpLogo.png" width={130} height={31} alt="teeUpLogo" />
        {error && <div className="text-primary">{error}</div>}
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

            <FormField
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
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your password</FormLabel>
                  <FormControl>
                    <InputText type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="lg">
              Sign Up
            </Button>
          </form>
        </Form>
        <Button onClick={() => router.push('/login')}>Login</Button>
        <Text as="div" className="absolute bottom-3 w-[80%] mx-auto">
          By clicking &quot;Sign Up&quot;, I have read, understood, and given my consent and
          accepted the Terms of Use.
        </Text>
      </div>
    </div>
  );
};

export default SignUp;
