'use client';
import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import loginVector from '@/configs/img/auth/loginVector.png';
import mainLogo from '@/configs/img/auth/mainLogo.png';

const Login = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh]">
      <div className="bg-[#FFF] h-full flex flex-col justify-center items-center">
        <Image src={mainLogo} className="w-[381px] h-[166px]" alt="main logo" />
        <Image src={loginVector} className="w-[100%] h-[292px]" alt="login vector" />
      </div>
      <div className="bg-gray-200 h-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    // <form className="flex flex-col justify-start">
    //   <div className="text-primary font-sans text-[30px] font-[600] tracking-[0.6px]">Sign in</div>
    // </form>
    <>
      <div className="flex flex-col h-screen justify-center">
        <h2 className="text-3xl mb-10 font-medium" style={{ color: '#da291c' }}>
          Sign In
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit(data => onSubmit(data))}>
          <p className="justify-start mb-1 text-sm">Email Address</p>
          <input
            className="p-2 rounded-lg border border-gray-300 "
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-sm mt-1 text-red-500">Email Address is required.</p>}
          <div className="mb-5"></div>

          <p className="justify-start text-sm mb-1">Password</p>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type={'password'}
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-sm mt-1 text-red-500">Password is required.</p>}
          <p
            className="mt-3 mb-5 text-sm font-weight-400 flex flex-row-reverse text-red-600"
            style={{ cursor: 'pointer' }}
          >
            Forgot password?
          </p>

          <button
            className="p-2 mt-5 rounded-md"
            style={{ background: '#e60808', color: '#fff' }}
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};
