import Header from '@/components/Layout/Header';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <main className="bg-gray-100 h-screen p-[40px]">{children}</main>
    </>
  );
};

export default AdminLayout;
