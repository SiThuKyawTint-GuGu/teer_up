"use client";
import BGImage from "@/components/shared/BGImage";
import { WIDTH_TYPES } from "@/components/shared/enums";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserDimensionResult } from "@/services/dimension";
import { useGetUserById } from "@/services/user";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { UserDimensionResultResponse } from "@/types/Dimension";
import { UserProfileResponse } from "@/types/Profile";
import { getUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Heading, Section, Tabs } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import RadarChart from "./RadarChart";

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
  const [viewImage, setViewImage] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<PROFILE_TRIGGER>();
  const [, startTransition] = useTransition();
  const user = getUserInfo();
  const router = useRouter();
  const { data: profileData } = useGetUserById<UserProfileResponse>(user?.id);
  const { data: userDimensionData } = useGetUserDimensionResult<UserDimensionResultResponse>();
  const userProfile = profileData?.data;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={val => {
          if (userProfile?.cover_url) {
            setOpen(val);
          } else {
            startTransition(() => {
              router.push(`/profile/${user?.id}`);
            });
          }
        }}
      >
        <Grid columns="1">
          <Box className="pb-[55px]">
            <div className="mb-[45px]">
              <div className="fixed top-0 left-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                <Flex justify="center" position="relative" className="bg-white" p="3">
                  <Text size="3" weight="medium">
                    Profile
                  </Text>
                  <Flex justify="center" align="center" className="absolute top-0 right-2 bottom-0">
                    <Link href={`/profile/setting`}>
                      <Icons.profileSetting />
                    </Link>
                  </Flex>
                </Flex>
              </div>
            </div>
            <CardBox className="mb-[7px] rounded-none">
              <Section p="0">
                <DialogTrigger onClick={() => setTriggerType(PROFILE_TRIGGER.COVER)} className="w-full">
                  {userProfile?.cover_url ? (
                    <BGImage width={WIDTH_TYPES.FULL} height="130px" url={userProfile?.cover_url} />
                  ) : (
                    <Flex className="h-[130px] bg-cover relative" justify="center" align="center">
                      <Flex
                        justify="center"
                        align="center"
                        className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full bg-white shadow-profile ring-2 ring-white"
                      >
                        <Icons.profileCamera className="w-[15] h-[15] text-primary" />
                      </Flex>
                    </Flex>
                  )}
                </DialogTrigger>
              </Section>
              <Section className="bg-white pt-[70px]" pb="4" px="3" position="relative">
                <DialogTrigger onClick={() => setTriggerType(PROFILE_TRIGGER.PROFILE)} className="w-full">
                  <div className="absolute -top-[30%]">
                    {userProfile?.profile_url ? (
                      <Flex
                        justify="center"
                        align="center"
                        position="relative"
                        className="w-[120px] h-[120px] rounded-full bg-primary bg-opacity-70 ring-4 ring-white"
                        style={{
                          background: `url(${userProfile?.profile_url}) center / cover`,
                        }}
                      >
                        <Flex
                          justify="center"
                          align="center"
                          className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-white shadow-profile ring-2 ring-white"
                        >
                          <Icons.profileCamera className="w-[15] h-[15] text-primary" />
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex
                        justify="center"
                        align="center"
                        position="relative"
                        className="w-[120px] h-[120px] rounded-full bg-primary bg-opacity-70 ring-4 ring-white"
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
                          className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-white shadow-profile ring-2 ring-white"
                        >
                          <Icons.profileCamera className="w-[15] h-[15] text-primary" />
                        </Flex>
                      </Flex>
                    )}
                  </div>
                </DialogTrigger>
                <div className="absolute top-2 right-2">
                  <Link href={`/profile/${user?.id}`}>
                    <Button variant="outline" className="border-2 border-[#F4153D] rounded-[30px] space-x-[5px]">
                      <Image src="/uploads/icons/pencil.svg" width={20} height={20} alt="pencil" />
                      <Text className="text-primary">Edit Profile</Text>
                    </Button>
                  </Link>
                </div>
                <Heading as="h4" size="6" mb="4">
                  {userProfile?.name}
                </Heading>
                <Text>{userProfile?.bio}</Text>
              </Section>
            </CardBox>
            <CardBox className="mb-[7px] rounded-none">
              <Section className="bg-white" py="4" px="3">
                <Tabs.Root defaultValue="personalDetails">
                  <Tabs.List className="space-x-[20px]">
                    <Tabs.Trigger className="tab-trigger" value="personalDetails">
                      Personal details
                    </Tabs.Trigger>
                    <Tabs.Trigger className="tab-trigger" value="competency">
                      Competency
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="personalDetails">
                    <CardBox className="mb-[7px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Personal information
                        </Heading>
                        <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                          <Flex justify="start" align="center" gap="2">
                            <Image
                              src="/uploads/icons/personal-profile.svg"
                              width={16}
                              height={16}
                              alt="personal profile"
                            />
                            <Text className="capitalize text-[#373A36]">
                              {userProfile?.personal_info?.gender ? userProfile?.personal_info?.gender?.type : "-"}
                            </Text>
                          </Flex>
                        </div>
                        <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                          <Flex justify="start" align="center" gap="2">
                            <Image src="/uploads/icons/birthday.svg" width={16} height={16} alt="birthday" />
                            <Text className="text-[#373A36]">
                              {userProfile?.personal_info?.birthday
                                ? dayjs(userProfile?.personal_info?.birthday).format("MMMM D, YYYY")
                                : "-"}
                            </Text>
                          </Flex>
                        </div>
                        <div className="pb-[10px] mb-[10px]">
                          <Flex justify="start" align="center" gap="2">
                            <Image src="/uploads/icons/mail-outline.svg" width={16} height={16} alt="mail" />
                            <Text className="text-[#373A36]">{userProfile?.email ? userProfile?.email : "-"}</Text>
                          </Flex>
                        </div>
                      </Section>
                    </CardBox>
                    <CardBox className="mb-[7px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Experience
                        </Heading>
                        {userProfile?.experiences?.length
                          ? userProfile?.experiences?.map((each, key) => (
                              <Flex
                                key={key}
                                justify="between"
                                align="start"
                                className={cn(
                                  "pb-[10px] mb-[10px]",
                                  key !== (userProfile?.experiences ? userProfile.experiences.length - 1 : -1) &&
                                    "border-b border-b-[#BDC7D5]"
                                )}
                              >
                                <Flex justify="start" align="start" gap="2">
                                  <Image src="/uploads/icons/experience.svg" width={32} height={32} alt="experience" />
                                  <Flex direction="column" gap="2">
                                    <Text as="label" weight="bold" size="3">
                                      {each?.position}
                                    </Text>
                                    <Text size="2" weight="light">
                                      {each?.company}
                                    </Text>
                                  </Flex>
                                </Flex>
                                <Flex justify="end" align="center" gap="1">
                                  <Text size="2" weight="light">
                                    {dayjs(each?.start_date).format("YYYY")}
                                  </Text>
                                  <Text size="2" weight="light">
                                    -
                                  </Text>
                                  <Text size="2" weight="light">
                                    {each?.end_date ? dayjs(each?.end_date).format("YYYY") : "present"}
                                  </Text>
                                </Flex>
                              </Flex>
                            ))
                          : "-"}
                      </Section>
                    </CardBox>
                    <CardBox className="mb-[7px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Education
                        </Heading>
                        {userProfile?.educations?.length
                          ? userProfile?.educations?.map((each, key) => (
                              <Flex
                                key={key}
                                justify="between"
                                align="start"
                                className={cn(
                                  "pb-[10px] mb-[10px]",
                                  key !== (userProfile?.educations ? userProfile.educations.length - 1 : -1) &&
                                    "border-b border-b-[#BDC7D5]"
                                )}
                              >
                                <Flex justify="start" align="start" gap="2">
                                  <Image src="/uploads/icons/education.svg" width={32} height={32} alt="experience" />
                                  <Flex direction="column" gap="2">
                                    <Text as="label" weight="bold" size="3">
                                      {each.school_name}
                                    </Text>
                                    <Text size="2" weight="light">
                                      {each.degree}
                                    </Text>
                                  </Flex>
                                </Flex>
                                <Flex justify="end" align="center" gap="1">
                                  <Text size="2" weight="light">
                                    {dayjs(each?.start_date).format("YYYY")}
                                  </Text>
                                  <Text size="2" weight="light">
                                    -
                                  </Text>
                                  <Text size="2" weight="light">
                                    {each?.end_date ? dayjs(each?.end_date).format("YYYY") : "present"}
                                  </Text>
                                </Flex>
                              </Flex>
                            ))
                          : "-"}
                      </Section>
                    </CardBox>

                    <CardBox className="mb-[7px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Career interests
                        </Heading>
                        <Flex wrap="wrap" gap="2">
                          {userProfile?.industries?.length
                            ? userProfile?.industries?.map((each, key) => (
                                <Button
                                  key={key}
                                  className="border border-[#EAA1A6] bg-[#F9E9EB] text-black hover:bg-[#F9E9EB]"
                                >
                                  {each.industry.name}
                                </Button>
                              ))
                            : "-"}
                        </Flex>
                      </Section>
                    </CardBox>
                    <CardBox className="mb-[7px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Preferences
                        </Heading>
                        <Flex wrap="wrap" gap="2">
                          {userProfile?.preferences?.length
                            ? userProfile?.preferences?.map((each, key) => (
                                <Button
                                  key={key}
                                  className="border border-[#EAA1A6] bg-[#F9E9EB] text-black hover:bg-[#F9E9EB]"
                                >
                                  {each.preference.name}
                                </Button>
                              ))
                            : "-"}
                        </Flex>
                      </Section>
                    </CardBox>
                  </Tabs.Content>

                  <Tabs.Content value="competency" className="space-y-[7px]">
                    <CardBox>
                      <Section className="bg-white" py="4" px="3">
                        <RadarChart />
                      </Section>
                    </CardBox>
                    <CardBox>
                      <Section className="bg-white" py="4" px="3">
                        <Heading>Here’s what we noticed about your competencies:</Heading>
                        {userDimensionData?.data?.length && (
                          <>
                            {userDimensionData?.data?.map((each, key) => (
                              <Box key={key} className="bg-[#F8F9FB] rounded-[8px]" mb="4" p="3">
                                <Flex justify="start" align="start" gap="2">
                                  <div className="w-[12px] h-[12px] mt-[5px] rounded-sm bg-primary" />
                                  <Text className="w-[calc(100%-12px)]">{each.name}</Text>
                                </Flex>
                              </Box>
                            ))}
                          </>
                        )}
                      </Section>
                    </CardBox>
                    <CardBox>
                      <Section className="bg-white" py="4" px="3">
                        <Heading>Here’s what we noticed about your competencies:</Heading>
                        {userDimensionData?.data?.length && (
                          <>
                            {userDimensionData?.data?.map((each, key) => (
                              <Box key={key} className="bg-[#F8F9FB] rounded-[8px]" mb="4" p="3">
                                <Flex justify="start" align="start" gap="2">
                                  <div className="w-[12px] h-[12px] mt-[5px] rounded-sm bg-primary" />
                                  <Text className="w-[calc(100%-12px)]">{each.skill_body}</Text>
                                </Flex>
                                {each?.content?.id && (
                                  <Flex width="100%">
                                    <Link className="w-full" href={`/content/${each?.content?.slug}`}>
                                      <Button className="w-full">I’d like to work on it</Button>
                                    </Link>
                                  </Flex>
                                )}
                              </Box>
                            ))}
                          </>
                        )}
                      </Section>
                    </CardBox>
                  </Tabs.Content>
                </Tabs.Root>
              </Section>
            </CardBox>
          </Box>
        </Grid>
        <DialogContent
          className={cn(
            "bg-white top-[initial] bottom-0 px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr",
            viewImage && "top-0 rounded-none"
          )}
          handleOnClose={setViewImage}
        >
          {!viewImage ? (
            <Box className="space-y-[40px]">
              <Flex
                justify="start"
                align="center"
                className="pb-[20px] mb-[20px] border-b border-b-[#BDC7D5] gap-[10px]"
                onClick={() => setViewImage(true)}
              >
                <Image
                  src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                  width={20}
                  height={20}
                  alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
                />
                <Text className="text-black">{profileTrigger[triggerType as PROFILE_TRIGGER]}</Text>
              </Flex>
            </Box>
          ) : (
            <Flex justify="center" align="center">
              {triggerType === PROFILE_TRIGGER.COVER ? (
                <img src={userProfile?.cover_url} alt="" />
              ) : (
                <img src={userProfile?.profile_url} alt="" />
              )}
            </Flex>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
