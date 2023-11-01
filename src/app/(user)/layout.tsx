import { Grid } from "@radix-ui/themes";
import Head from "next/head";
import { ReactNode } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: "TeeUp",
  openGraph: {
    title: "Acme",
    description: "Acme is a...",
  },
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        {/* <title>TeeUp</title> */}
        <link rel="icon" href="/teeup.svg" />
      </Head>
      <Grid columns="1">
        <div className="max-w-[400px] w-full mx-auto h-screen relative bg-layout">{children}</div>
      </Grid>
    </>
  );
};

export default Layout;
