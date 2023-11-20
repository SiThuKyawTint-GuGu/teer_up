"use client";
import { Button } from "@/components/ui/Button";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById, useUploadCover } from "@/services/user";
import { UserProfileResponse } from "@/types/Profile";
import { getLocalStorage, removeLocalStorage } from "@/utils";
import { getUserInfo } from "@/utils/auth";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CoverPhotoPreview: React.FC = () => {
  const router = useRouter();
  const user = getUserInfo();
  const { data, mutate: mutateUser } = useGetUserById<UserProfileResponse>(user?.id);
  const { trigger: uploadCoverTrigger } = useUploadCover();
  const getCoverPhoto = getLocalStorage("coverPhoto");

  const getProfilePhoto = getLocalStorage("profilePhoto");
  const handleUploadImage = async () => {
    let blob = await fetch(getCoverPhoto).then(r => r.blob());
    if (blob) {
      try {
        await uploadCoverTrigger({ file: blob });
        await mutateUser();
        removeLocalStorage("coverPhoto");
        removeLocalStorage("profilePhoto");
        router.push("/profile");
      } catch (error) {
        console.error("Upload failed =>", error);
      }
    }
  };

  return (
    <Grid columns="1">
      <Box className="pb-[55px]">
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link className="block" href={"/profile"}>
            <div className="cursor-pointer">
              <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
            </div>
          </Link>
          <Text size="3" className="font-[600] text-[16px] ">
            Preview cover photo
          </Text>
          <Icons.plus className="text-primary w-[23px] h-[23px] opacity-0" />
        </Flex>

        <Box className="mb-[0px] rounded-none">
          <Section p="0">
            {getCoverPhoto ? (
              <img src={getCoverPhoto} alt="cover" className="w-full h-[130px] object-cover center" />
            ) : (
              <Flex className="h-[130px] bg-cover relative" justify="center" align="center"></Flex>
            )}
          </Section>
          <Section className=" pt-[70px]" pb="0" px="3" position="relative">
            <div className="absolute -top-[30%]">
              {getProfilePhoto ? (
                <Flex
                  justify="center"
                  align="center"
                  position="relative"
                  className="w-[96px] h-[96px] rounded-full bg-primary bg-opacity-70 ring-4 ring-white"
                  style={{
                    background: `url(${getProfilePhoto}) center / cover`,
                  }}
                ></Flex>
              ) : (
                <Flex
                  justify="center"
                  align="center"
                  position="relative"
                  className="w-[96px] h-[96px] rounded-full ring-4 ring-white bg-gradient-to-b from-white to-red-500 "
                >
                  <Image className="" width={61} height={65} src="/uploads/icons/user-profile.svg" alt="user profile" />
                </Flex>
              )}
            </div>
          </Section>
        </Box>
        <div className="w-full">
          <Button className=" w-full mt-[50px] text-[18px] " onClick={handleUploadImage}>
            Save
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default CoverPhotoPreview;
