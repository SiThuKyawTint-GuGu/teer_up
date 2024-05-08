"use client";
import CoverPhotoPreview from "@/page-containers/user/profile/preview/CoverPhotoPreview";
import ProfilePhotoRreview from "@/page-containers/user/profile/preview/ProfilePhotoPreview";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const PreviewPage: NextPage = () => {
   const { previewType } = useParams();
  useEffect(()=>{
    console.log(previewType);
  },[])
 
  if (previewType === "cover-photo") {
    return <CoverPhotoPreview />;
  }
  return <ProfilePhotoRreview />;
};

export default PreviewPage;
