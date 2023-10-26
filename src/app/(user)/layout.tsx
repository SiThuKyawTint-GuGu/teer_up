import VerfiyPop from "@/components/auth/VerfiyPop";
import { useVerifyModal } from "@/store/authStore";
import { Grid } from "@radix-ui/themes";
import Head from "next/head";
import { ReactNode } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>TeeUp</title>
        <link rel="icon" href="/teeup.svg" />
        {/* Add any other meta tags, styles, or scripts as needed */}
      </Head>
      <Grid columns="1">
        <VerfiyPop />
        <div className="max-w-[400px] w-full mx-auto py-[50px] h-full relative">{children}</div>
      </Grid>
    </>
  );
};

export default Layout;
