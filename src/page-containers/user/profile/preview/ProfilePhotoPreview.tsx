/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById, useUploadProfile } from "@/services/user";
import { UserProfileResponse } from "@/types/Profile";
import { getLocalStorage, removeLocalStorage } from "@/utils";
import { getUserInfo } from "@/utils/auth";
import { Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePhotoRreview: React.FC = () => {
  const router = useRouter();
  const user = getUserInfo();
  const { data, mutate: mutateUser } = useGetUserById<UserProfileResponse>(user?.id);
  const { trigger: uploadProfileTrigger } = useUploadProfile();

  const getProfilePhoto = getLocalStorage("profilePhoto");
  const handleUploadImage = async () => {
    let blob = await fetch(getProfilePhoto).then(r => r.blob());
    if (blob) {
      try {
        await uploadProfileTrigger({ file: blob });
        await mutateUser();

        removeLocalStorage("profilePhoto");
        // router.push("/profile");
        console.log("back");
        router.back();
      } catch (error) {
        console.error("Upload failed =>", error);
      }
    }
  };
  return (
    <Grid columns="1">
      <Flex justify="between" align="center" className="bg-white" p="3">
        <Link className="block" href={"/profile"}>
          <div className="cursor-pointer">
            <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
          </div>
        </Link>
        <Text size="3" className="font-[600] text-[16px] ">
          Preview profile picture
        </Text>
        <Icons.plus className="text-primary w-[23px] h-[23px] opacity-0" />
      </Flex>
      <div className="">
        <div className="w-[280px] h-[280px] mx-auto mt-[50px]">
          <img
            src={
              getProfilePhoto ??
              "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
            }
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="w-full">
        <Button onClick={handleUploadImage} className=" w-full mt-[50px] text-[18px] ">
          Save
        </Button>
      </div>
    </Grid>
  );
};

export default ProfilePhotoRreview;
