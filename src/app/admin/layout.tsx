import React, { ReactNode } from 'react';

import PageLayout from '@/components/layout';

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <PageLayout>
      <main className="bg-gray-100 h-full p-[40px]">{children}</main>
    </PageLayout>
  );
};

export default AdminLayout;
