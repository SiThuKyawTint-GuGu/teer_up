import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="bg-layout">
      <div className="w-full max-w-[400px] mx-auto">{children}</div>
    </main>
  );
};

export default AuthLayout;
