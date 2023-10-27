import VerifyPop from "@/components/auth/VerifyPop";
import { Grid } from "@radix-ui/themes";
import Head from "next/head";
import { ReactNode } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  console.log(props);
  return (
    <>
      <Head>
        <title>TeeUp</title>
        <link rel="icon" href="/teeup.svg" />
      </Head>
      <Grid columns="1">
        <VerifyPop />
        <div className="max-w-[400px] w-full mx-auto py-[50px] pt-[36px] h-full relative bg-layout">
          {props.children}
        </div>
      </Grid>
    </>
  );
};

export default Layout;
