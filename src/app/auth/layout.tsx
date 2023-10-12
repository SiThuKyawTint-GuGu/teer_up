import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <main className="max-w-[500px] mx-auto">{children}</main>;
};

export default AuthLayout;
