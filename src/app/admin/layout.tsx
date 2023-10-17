import { ReactNode } from "react";

import PageLayout from "@/components/layout";
import ThemeRegistry from "./ThemeRegistry";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <PageLayout>
        <main className="bg-gray-100 h-full p-[40px]">{children}</main>
      </PageLayout>
    </ThemeRegistry>
  );
};

export default AdminLayout;
