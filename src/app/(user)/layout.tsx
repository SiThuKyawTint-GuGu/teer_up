import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto p-3">
      <header>Header</header>
      <div>{children}</div>
      <header>Footer</header>
    </div>
  );
};

export default UserLayout;
