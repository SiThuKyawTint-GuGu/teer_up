'use client';
import React from 'react';
import Image from 'next/Image';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { InputText } from '@/components/ui/Inputs';
import { Text } from '@/components/ui/Typo/Text';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';
import { usePost } from '@/hooks/usePost';
import { LoginResponse } from '@/types/type';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required!').default(''),
  password: yup.string().required('Password is required!').default(''),
});

type loginBody = {
  email: string;
  password: string;
};
const Login = () => {
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [error, setError] = React.useState<string | null>(null);

  const loginHandler = async (data: loginBody) => {
    usePost<{ responseKey: LoginResponse }>('/api/v1/user/login', data)
      .then(response => {
        setError(null);
        console.log(response);
      })
      .catch(error => setError(error.message));
  };
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" />
        {Error && <div className="text-primary">{error}</div>}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your Password</FormLabel>
                  <FormControl>
                    <InputText type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" size="lg">
              Sign In
            </Button>
          </form>
        </Form>

        <Text as="div" className=" text-black absolute bottom-3 w-[80%]">
          By clicking &quot;Log In&quot;, I have read, understood, and given my consent and accepted
          the Terms of Use.
        </Text>
      </div>
    </div>
  );
};

export default Login;
