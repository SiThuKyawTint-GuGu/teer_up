"use client";

import VerifyEmailModal from "@/components/auth/VerifyEmailModal";
import VerifyPop from "@/components/auth/VerifyPop";
import appAxios from "@/lib/appAxios";
import { useVerifyEmailModal, useVerifyModal } from "@/store/authStore";
import { getToken } from "@/utils/auth";
import { Grid } from "@radix-ui/themes";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: ReactNode;
}
const token = getToken();
const Layout = ({ children }: Props) => {
  const { openVerifyModal, verifyModalOpenHandler } = useVerifyModal();
  const { openVerifyEmailModal, verifyEmailModalOpenHandler } = useVerifyEmailModal();
  useEffect(() => {
    const requestInterceptor = appAxios.interceptors.request.use(
      function (config) {
        token && !config.headers.getAuthorization() && config.headers.setAuthorization("Bearer " + token);
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    const responseInterceptor = appAxios.interceptors.response.use(
      response => {
        if (response.status === 201 || response.status === 204) {
          // showToast("success", "Success");
        }
        return response;
      },
      function (error) {
        if (error.response.status == 401) {
          verifyModalOpenHandler();
        }
        if (error.response.status == 403) {
          verifyEmailModalOpenHandler();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      appAxios.interceptors.request.eject(requestInterceptor);
      appAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  return (
    <>
      <Head>
        <link rel="icon" href="/teeUpLogo.svg" />
      </Head>
      <Grid columns="1">
        {openVerifyModal && <VerifyPop />}
        {openVerifyEmailModal && <VerifyEmailModal />}
        <div className="max-w-[400px] w-full mx-auto h-screen relative bg-layout overflow-hidden">{children}</div>
      </Grid>
    </>
  );
};

export default Layout;
