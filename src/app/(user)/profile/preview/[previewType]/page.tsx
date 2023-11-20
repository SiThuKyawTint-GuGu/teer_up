"use client";
import CoverPhotoPreview from "@/page-containers/user/profile/preview/CoverPhotoPreview";
import ProfilePhotoRreview from "@/page-containers/user/profile/preview/ProfilePhotoPreview";
import { useParams } from "next/navigation";

const page = () => {
  const { previewType } = useParams();
  if (previewType === "cover-photo") {
    return <CoverPhotoPreview />;
  }
  return <ProfilePhotoRreview />;
};

export default page;
