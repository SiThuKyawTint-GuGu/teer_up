"use client";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById } from "@/services/user";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { getUserInfo } from "@/utils/auth";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const profileTrigger = {
  [PROFILE_TRIGGER.COVER]: "See cover picture",
  [PROFILE_TRIGGER.PROFILE]: "See profile picture",
};

const profileTriggerIcon = {
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/select-profile.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/see-profile.svg",
};

const Profile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<PROFILE_TRIGGER>();
  const user = getUserInfo();
  const { data: profileData } = useGetUserById<UserProfileResponse>(user?.id);
  const userProfile = profileData?.data;

  console.log("user profile => ", userProfile);

  return (
    <>
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <Grid columns="1">
          <Box className="pb-[55px]">
            <Flex justify="center" className="bg-white" p="3">
              <Text size="3" weight="medium">
                Profile
              </Text>
            </Flex>
            <Box className="pb-[7px]">
              <Section p="0">
                <DialogTrigger
                  onClick={() => setTriggerType(PROFILE_TRIGGER.COVER)}
                  className="w-full"
                >
                  {userProfile?.cover_url ? (
                    <div
                      style={{
                        background: `url(${userProfile?.cover_url}) center / cover`,
                        height: "130px",
                      }}
                    />
                  ) : (
                    <Flex className="h-[130px] bg-[#D9D9D9]" justify="center" align="center">
                      <Icons.profileCamera className="w-[24px] h-[24px]" />
                    </Flex>
                  )}
                </DialogTrigger>
              </Section>
              <Section className="bg-white pt-[70px]" pb="4" px="3" position="relative">
                <DialogTrigger
                  onClick={() => setTriggerType(PROFILE_TRIGGER.PROFILE)}
                  className="w-full"
                >
                  <div className="absolute -top-[36%]">
                    {userProfile?.profile_url ? (
                      <Flex
                        justify="center"
                        align="center"
                        position="relative"
                        className="w-[120px] h-[120px] rounded-full bg-[#D9D9D9] ring-4 ring-white"
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
                        <Flex
                          justify="center"
                          align="center"
                          className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-[#D9D9D9] ring-2 ring-white"
                        >
                          <Icons.profileCamera className="w-[15] h-[15]" />
                        </Flex>
                      </Flex>
                    )}
                  </div>
                </DialogTrigger>
                <div className="absolute top-2 right-2">
                  <Link href={`/profile/${user?.id}`}>
                    <Button
                      variant="outline"
                      className="border-2 border-[#F4153D] rounded-[30px] space-x-[5px]"
                    >
                      <Image src="/uploads/icons/pencil.svg" width={20} height={20} alt="pencil" />
                      <Text className="text-primary">Edit Profile</Text>
                    </Button>
                  </Link>
                </div>
                <Heading as="h4" size="5" mb="4">
                  {userProfile?.name}
                </Heading>
                <Text>{userProfile?.bio}</Text>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  Personal information
                </Heading>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Gender
                    </Text>
                    <Text>{userProfile?.personal_info?.gender?.type}</Text>
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
                <Heading as="h6" size="4" align="left" mb="4">
                  Education
                </Heading>
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
                <Heading as="h6" size="4" align="left" mb="4">
                  Career interests
                </Heading>
                <Flex wrap="wrap" gap="2">
                  {userProfile?.industries?.map((each, key) => (
                    <Button key={key} className="bg-[#d1d5d8] text-black">
                      {each.industry.name}
                    </Button>
                  ))}
                </Flex>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  Preferences
                </Heading>
                <Flex wrap="wrap" gap="2">
                  {userProfile?.preferences?.map((each, key) => (
                    <Button key={key} className="bg-[#d1d5d8] text-black">
                      {each.preference.name}
                    </Button>
                  ))}
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
              className="pb-[20px] mb-[20px] border-b border-b-[#BDC7D5] gap-[10px]"
            >
              <Image
                src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                width={20}
                height={20}
                alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
              />
              <Text>{profileTrigger[triggerType as PROFILE_TRIGGER]}</Text>
            </Flex>
            {/* <Flex
              justify="start"
              align="center"
              className="pb-[20px] mb-[20px] border-b border-b-[#BDC7D5] gap-[10px]"
            >
              <Image
                src="/uploads/icons/select-profile.svg"
                width={20}
                height={20}
                alt="select profile"
              />
              <Text>Select profile picture</Text>
            </Flex> */}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
