"use client";
import Image from "next/image";
import React from "react";

import { Flex } from "@radix-ui/themes";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh]">
      <div className="bg-[#FFF] h-full flex flex-col justify-center items-center">
        <Image src="/mainLogo.png" width={381} height={166} alt="main logo" />
        <Image src="/loginVector.png" width={200} height={298} alt="login vector" />
      </div>
      <Flex justify="center" height="100%" className="bg-gray-200">
        <LoginForm />
      </Flex>
    </div>
  );
};

export default Login;
