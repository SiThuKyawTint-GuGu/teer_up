import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-[500px] p-3">
      <header>Header</header>
      <div className="w-full">{children}</div>
      <header>Footer</header>
    </div>
  );
};

export default UserLayout;
