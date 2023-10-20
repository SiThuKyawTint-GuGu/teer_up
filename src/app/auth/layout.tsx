import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="bg-[#F8F9FB]">
      <div className="w-full max-w-[390px] mx-auto">{children}</div>
    </main>
  );
};

export default AuthLayout;
