'use client';
import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as Select from '@radix-ui/react-select';

import loginVector from '@/configs/img/auth/loginVector.png';
import mainLogo from '@/configs/img/auth/mainLogo.png';
// import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/Inputs/Select';

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

          <p className="justify-start text-sm mb-1">Select Organization</p>
          {/* <Select {...register('organization')}>
            <SelectTrigger>Select Organization</SelectTrigger>
            <SelectContent>
              <SelectItem value="value1">Option 1</SelectItem>
              <SelectItem value="value2">Option 2</SelectItem>
            </SelectContent>
          </Select> */}
          <div className="relative inline-flex">
            <select
              {...register('organization')}
              className="block appearance-none w-48 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          <button
            className="p-2 mt-[50px] rounded-md"
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
