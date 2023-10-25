"use client";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById, useUploadCover, useUploadProfile } from "@/services/user";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const profileTrigger = {
  [PROFILE_TRIGGER.COVER]: "See cover picture",
  [PROFILE_TRIGGER.PROFILE]: "See profile picture",
};

const profileTriggerIcon = {
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/select-profile.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/see-profile.svg",
};

const ProfileEdit: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<PROFILE_TRIGGER>();
  const { id } = useParams();
  const router = useRouter();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { trigger: uploadProfileTrigger } = useUploadProfile();
  const { trigger: uploadCoverTrigger } = useUploadCover();
  const userProfile = profileData?.data;

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = await getFileFromEvent(event);

    if (file) {
      const triggerFunction =
        triggerType === PROFILE_TRIGGER.PROFILE
          ? uploadProfileTrigger({ file })
          : uploadCoverTrigger({ file });

      try {
        await triggerFunction;
        router.push("/profile");
      } catch (error) {
        console.error("Upload failed =>", error);
      }
    }
  };

  const getFileFromEvent = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement?.files;
    return files ? files[0] : null;
  };

  console.log("userProfile => ", userProfile);

  return (
    <>
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <Grid columns="1">
          <Box className="pb-[55px]">
            <Flex justify="center" className="bg-white" p="3">
              <Text size="3" weight="medium">
                Edit Profile
              </Text>
            </Flex>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <div>
                  <Flex justify="between" align="center" mb="4">
                    <Heading as="h6" size="4" align="left">
                      Cover photo
                    </Heading>
                    <DialogTrigger onClick={() => setTriggerType(PROFILE_TRIGGER.COVER)}>
                      <Text className="text-primary">Edit</Text>
                    </DialogTrigger>
                  </Flex>
                  <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                    {userProfile?.cover_url ? (
                      <div
                        style={{
                          background: `url(${userProfile?.cover_url}) center / cover`,
                          height: "130px",
                        }}
                      />
                    ) : (
                      <Flex className="h-[130px] bg-[#D9D9D9]" justify="center" align="center" />
                    )}
                  </div>
                </div>
                <div>
                  <Flex justify="between" align="center" mb="4">
                    <Heading as="h6" size="4" align="left">
                      Profile picture
                    </Heading>
                    <DialogTrigger onClick={() => setTriggerType(PROFILE_TRIGGER.PROFILE)}>
                      <Text className="text-primary">Edit</Text>
                    </DialogTrigger>
                  </Flex>
                  <div className="pb-[10px] mb-[10px]">
                    {userProfile?.profile_url ? (
                      <div
                        className="w-[120px] h-[120px] rounded-full  ring-4 ring-white"
                        style={{
                          background: `url(${userProfile?.profile_url}) center / cover`,
                        }}
                      />
                    ) : (
                      <Flex
                        justify="center"
                        align="center"
                        position="relative"
                        className="w-[120px] h-[120px] rounded-full bg-[#D9D9D9] ring-4 ring-white"
                      >
                        <Image
                          className="mt-[30px]"
                          width={90}
                          height={90}
                          src="/uploads/icons/user-profile.svg"
                          alt="user profile"
                        />
                      </Flex>
                    )}
                  </div>
                </div>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Brief bio
                  </Heading>
                  <Link href={`/profile/${id}/bio`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
                <Text>{userProfile?.bio}</Text>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Personal information
                  </Heading>
                  <Link href={`/profile/${id}/personal-info`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Gender
                    </Text>
                    <Text>Male</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Birthday
                    </Text>
                    <Text>
                      {userProfile?.personal_info?.birthday
                        ? dayjs(userProfile?.personal_info?.birthday).format("MMMM D, YYYY")
                        : "-"}
                    </Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Email
                    </Text>
                    <Text>{userProfile?.email}</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Education
                  </Heading>
                  <Link href={`/profile/${id}/education`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      MUFL
                    </Text>
                    <Text>Post Graduate Diploma</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      MUFL
                    </Text>
                    <Text>Post Graduate Diploma</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      MUFL
                    </Text>
                    <Text>Post Graduate Diploma</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Career interests
                  </Heading>
                  <Link href={`/profile/${id}/career-interests`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
                <Flex wrap="wrap" gap="2">
                  <Button className="bg-[#d1d5d8] text-black">Human Resources</Button>
                  <Button className="bg-[#d1d5d8] text-black">Design</Button>
                  <Button className="bg-[#d1d5d8] text-black">Engineering</Button>
                  <Button className="bg-[#d1d5d8] text-black">Tourism and hospitality</Button>
                </Flex>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Preferences
                  </Heading>
                  <Text className="text-primary">Edit</Text>
                </Flex>
                <Flex wrap="wrap" gap="2">
                  <Button className="bg-[#d1d5d8] text-black">Animation</Button>
                  <Button className="bg-[#d1d5d8] text-black">Art</Button>
                  <Button className="bg-[#d1d5d8] text-black">Reading</Button>
                  <Button className="bg-[#d1d5d8] text-black">Dance</Button>
                </Flex>
              </Section>
            </Box>
          </Box>
        </Grid>
        <DialogContent className="bg-white top-[initial] bottom-0 px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
          <Box className="space-y-[40px]">
            <Flex
              justify="start"
              align="center"
              position="relative"
              className="pb-[20px] mb-[20px] border-b border-b-[#BDC7D5] gap-[10px]"
            >
              <input
                type="file"
                onChange={handleUploadImage}
                className="absolute top-0 left-0 w-full h-full opacity-0 z-50"
              />
              <Image
                src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                width={20}
                height={20}
                alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
              />
              <Text>{profileTrigger[triggerType as PROFILE_TRIGGER]}</Text>
            </Flex>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileEdit;
