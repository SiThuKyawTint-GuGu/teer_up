"use client";
import Spinner from "@/components/ui/Spinner";
import React, { useEffect } from "react";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.open("https://www.prudential.com.sg/Privacy-Notice", "_self");
  }, []);
  return <Spinner />;
};

export default PrivacyPolicy;
