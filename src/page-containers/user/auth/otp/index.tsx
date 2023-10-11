'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { InputText } from '@/components/ui/Inputs';
import { Text } from '@/components/ui/Typo/Text';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';
import { useGet } from '@/hooks/useGet';
import { usePost } from '@/hooks/usePost';
import { AuthResponse, OtpResponse } from '@/types/type';
import { getToken, setUserInfo } from '@/utils/auth';
import { yupResolver } from '@hookform/resolvers/yup';
const token: string = getToken();
const validationSchema = yup.object({
  verificationCode: yup.string().required('verificationCode!'),
});
interface OtpFormData {
  verificationCode: string;
}
const Otp = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const getOtp = async () => {
    useGet<OtpResponse>('/user/requestotp', token)
      .then(data => {
        setMessage(data.message);
        setError(null);
      })
      .catch(error => {
        setMessage(null);
        setError(error.message);
      });
  };
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: OtpFormData) => {
    usePost<AuthResponse>('/user/verifyotp', data, token)
      .then(response => {
        setError(null);
        setUserInfo(response.token);
        router.push('/otp');
        console.log(response);
      })
      .catch(error => {
        setError(error.message);
        setMessage(null);
      });
  };
  useEffect(() => {
    getOtp();
  }, []);
  console.log(message);

  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" />
        {/* {token && <div className="text-green-800">token</div>} */}
        {/* to check is token or not */}
        <div>
          {/* <Text>Verifying for email:</Text>
          <Text className="text-primary" as="span">
            abcde@1234.com
          </Text> */}
          {message && <div className="text-green-800">{message}</div>}
          {error && <div className="text-primary">{error}</div>}
        </div>
        <Form {...form}>
          <form
            className="mx-auto flex flex-col justify-center gap-y-3 w-[90%]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your verificationCode</FormLabel>
                  <FormControl>
                    <InputText type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" size="lg">
              Verify
            </Button>
          </form>
          <Button size="lg" onClick={getOtp}>
            Resend Varification
          </Button>
        </Form>
      </div>
      <div className="absolute bottom-2 flex justify-between w-[85%] mx-auto">
        <Text className="text-primary">Change email</Text>
        <Text className="text-primary">Verify Later</Text>
      </div>
    </div>
  );
};

export default Otp;
