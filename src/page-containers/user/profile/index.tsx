"use client";
import BGImage from "@/components/shared/BGImage";
import { WIDTH_TYPES } from "@/components/shared/enums";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Animate, Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserDimensionResult } from "@/services/dimension";
import {
  useDeleteCoverPhoto,
  useDeleteProfilePhoto,
  useGetUser,
  useGetUserOnboardingStatus,
  useResetScores,
  useUpdateUserOnboardingStatus,
} from "@/services/user";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { UserDimensionResultResponse } from "@/types/Dimension";
import { UserProfileResponse } from "@/types/Profile";
import { UserOnboardingStatusResponse } from "@/types/User";
import { setLocalStorage } from "@/utils";
import { getUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Heading, Section, Tabs } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import { mutate } from "swr";
import RadarChart from "./RadarChart";

const profileTrigger = {
  [PROFILE_TRIGGER.COVER]: "See cover picture",
  [PROFILE_TRIGGER.PROFILE]: "See profile picture",
};
const profileEditTrigger = {
  [PROFILE_TRIGGER.COVER]: "Change cover picture",
  [PROFILE_TRIGGER.PROFILE]: "Change profile picture",
};
const profileCreateTrigger = {
  [PROFILE_TRIGGER.COVER]: "Select cover picture",
  [PROFILE_TRIGGER.PROFILE]: "Select profile picture",
};
const profileDeleteTrigger = {
  [PROFILE_TRIGGER.COVER]: "Delete cover picture",
  [PROFILE_TRIGGER.PROFILE]: "Delete profile picture",
};

const profileTriggerIcon = {
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/select-profile.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/see-profile.svg",
};

const profileEditTriggerIcon = {
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/photo-edit.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/photo-edit.svg",
};
const Profile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [viewImage, setViewImage] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<PROFILE_TRIGGER>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const user = getUserInfo();
  const { get } = useSearchParams();
  const { data: profileData, mutate: mutateUser } = useGetUser<UserProfileResponse>();
  const { data: userDimensionData } = useGetUserDimensionResult<UserDimensionResultResponse>();
  const { trigger: onBoardingStatus } = useUpdateUserOnboardingStatus();

  const { trigger: deleteCoverTrigger } = useDeleteCoverPhoto();
  const { trigger: deleteProfileTrigger } = useDeleteProfilePhoto();

  const { data: getOnboardingStatus, isLoading: statusLoading } =
    useGetUserOnboardingStatus<UserOnboardingStatusResponse>();

  const { trigger: resetScores, isMutating: scoresLoading } = useResetScores();

  const userProfile = profileData?.data;
  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = await getFileFromEvent(event);
    if (file) {
      if (triggerType !== PROFILE_TRIGGER.PROFILE) {
        setLocalStorage("coverPhoto", URL.createObjectURL(file));
        setLocalStorage("profilePhoto", userProfile?.profile_url || "");
        router.push("/profile/preview/cover-photo");
        return;
      }
      setLocalStorage("profilePhoto", URL.createObjectURL(file));
      router.push("/profile/preview/profile-photo");
    }
  };
  const handleContinueAssessment = async () => {
    setLocalStorage("content", "0");
    mutate(
      () => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: true } // do not revalidate
    );
    await onBoardingStatus(
      { in_progress: true },
      {
        onSuccess: () => {
          startTransition(() => router.push(`/profile/onboarding`));
        },
      }
    );
  };

  const handleRetakeAssessment = async () => {
    setLocalStorage("content", "1");
    mutate(
      () => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: true } // do not revalidate
    );
    await resetScores();
    startTransition(() => router.push("/profile/onboarding"));
  };

  const handleDeletePhoto = async () => {
    const triggerFunction = triggerType === PROFILE_TRIGGER.PROFILE ? deleteProfileTrigger() : deleteCoverTrigger();
    try {
      await triggerFunction;
      await mutateUser();
      setDeleteModalOpen(false);
      setOpen(!open);
    } catch (error) {
      console.error("Upload failed =>", error);
    }
  };
  const getFileFromEvent = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement?.files;
    return files ? files[0] : null;
  };
  const handleTabTrigger = (key: string) => {
    router.push(`${pathname}?tab=${key}`);
  };
  const showEditDeleteProilPhoto = triggerType === PROFILE_TRIGGER.COVER && userProfile?.cover_url;
  const showEditDeleteCoverPhoto = triggerType === PROFILE_TRIGGER.PROFILE && userProfile?.profile_url;
  const CreateUpdateLabelForPhoto =
    triggerType === PROFILE_TRIGGER.COVER
      ? userProfile?.cover_url
        ? profileEditTrigger[triggerType as PROFILE_TRIGGER]
        : profileCreateTrigger[triggerType as PROFILE_TRIGGER]
      : userProfile?.profile_url
      ? profileEditTrigger[triggerType as PROFILE_TRIGGER]
      : profileCreateTrigger[triggerType as PROFILE_TRIGGER];
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={val => {
          setOpen(val);
          setViewImage(false);
        }}
      >
        <Grid columns="1">
          <Box className="pb-[55px]">
            <div className="mb-[45px]">
              <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                <Flex justify="center" position="relative" className="bg-white" p="3">
                  <Text size="3" weight="medium">
                    Profile
                  </Text>
                  <Flex justify="center" align="center" className="absolute top-0 right-6 bottom-0">
                    <Link href={`/profile/setting`}>
                      <Icons.profileSetting />
                    </Link>
                  </Flex>
                </Flex>
              </div>
            </div>
            <Box className="mb-[0px] rounded-none">
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
              <Section className="bg-white pt-[70px]" pb="0" px="3" position="relative">
                <DialogTrigger onClick={() => setTriggerType(PROFILE_TRIGGER.PROFILE)} className="w-full">
                  <div className="absolute -top-[30%]">
                    {userProfile?.profile_url ? (
                      <Flex
                        justify="center"
                        align="center"
                        position="relative"
                        className="w-[96px] h-[96px] rounded-full bg-primary bg-opacity-70 ring-4 ring-white"
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
                        className="w-[96px] h-[96px] rounded-full ring-4 ring-white bg-gradient-to-b from-white to-red-500 "
                      >
                        <Image
                          className=""
                          width={61}
                          height={65}
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
                <div className="absolute top-6 right-2">
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
            </Box>
            <CardBox className="mb-[7px] rounded-none">
              <Section className="bg-white" pt="4" pb="0">
                <Tabs.Root defaultValue={(get("tab") ? get("tab") : "competency") ?? ""}>
                  <Tabs.List className="space-x-[20px] px-3">
                    <Tabs.Trigger
                      onClick={() => handleTabTrigger("competency")}
                      className="tab-trigger cursor-pointer"
                      value="competency"
                    >
                      Your Career Muscles
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      onClick={() => handleTabTrigger("personalDetails")}
                      className="tab-trigger cursor-pointer"
                      value="personalDetails"
                    >
                      Personal details
                    </Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="competency" className="space-y-[7px]">
                    <CardBox className="rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Your Career Muscles{" "}
                          <span className="text-md font-normal">
                            are competencies that you need to navigate the world of jobs
                          </span>
                        </Heading>
                        <Box className="w-full h-full flex-wrap">
                          <RadarChart />
                          <Button
                            onClick={handleContinueAssessment}
                            loading={statusLoading}
                            disabled={getOnboardingStatus?.data?.completed}
                            className="w-full"
                          >
                            Continue Questionnaire
                          </Button>
                          <Button
                            onClick={handleRetakeAssessment}
                            loading={scoresLoading}
                            variant="link"
                            className="w-full"
                          >
                            Retake Questionnaire
                          </Button>
                        </Box>
                      </Section>
                    </CardBox>
                    {/* <CardBox>
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Here’s what we noticed about your competencies:
                        </Heading>
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
                    </CardBox> */}
                    <CardBox className="rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Here&#39;s what we noticed about you
                        </Heading>
                        {userDimensionData?.data?.length && (
                          <>
                            {userDimensionData?.data?.map((each, key) => {
                              return (
                                <Box
                                  key={key}
                                  position="relative"
                                  className="bg-[#F8F9FB] rounded-[8px] space-y-4"
                                  mb="4"
                                  p="3"
                                >
                                  <Flex justify="start" align="start" gap="2">
                                    <div className="w-[12px] h-[12px] mt-[5px] rounded-sm bg-primary" />
                                    <Flex className="w-[calc(100%-12px)] relative" direction="column" align="start">
                                      <Flex justify="start" align="center" gap="2">
                                        <Text size="3" weight="bold">
                                          {each.short_name}
                                        </Text>
                                        {/* <Tooltip content={each.name} open={key === touched?.key || touched?.open}>
                                          <Icons.info onClick={() => handleTouchedTooltip(key)} />
                                        </Tooltip> */}
                                        <div className="group inline-block duration-300">
                                          <Icons.info />
                                          <div className="absolute -left-4 top-6 hidden group-hover:flex px-2 py-1 bg-gray-700 rounded-lg text-white text-sm">
                                            {each.name}
                                          </div>
                                        </div>
                                      </Flex>
                                      <Text>{each.skill_body}</Text>
                                    </Flex>
                                  </Flex>
                                  {each?.content?.id && (
                                    <Flex width="100%">
                                      <Link className="w-full" href={`/content/${each?.content?.slug}`}>
                                        <Button className="w-full">I&#39;m ready to dive in and explore</Button>
                                      </Link>
                                    </Flex>
                                  )}
                                </Box>
                              );
                            })}
                          </>
                        )}
                      </Section>
                    </CardBox>
                  </Tabs.Content>

                  <Tabs.Content value="personalDetails">
                    <CardBox className="mb-[2px] rounded-none">
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
                    <CardBox className="mb-[2px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Job Experience
                        </Heading>
                        {userProfile?.experiences?.length ? (
                          userProfile?.experiences?.map((each, key) => (
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
                                  {dayjs(each?.start_date).format("MMM, YYYY")}
                                </Text>
                                <Text size="2" weight="light">
                                  -
                                </Text>
                                {each?.is_present === true ? (
                                  <Text size="2" weight="light">
                                    {"Present"}
                                  </Text>
                                ) : (
                                  <Text size="2" weight="light">
                                    {each?.end_date ? dayjs(each?.end_date).format("MMM, YYYY") : "-"}
                                  </Text>
                                )}
                              </Flex>
                            </Flex>
                          ))
                        ) : (
                          <Flex direction="column" justify="center" align="center">
                            <Text size="2" weight="light">
                              You haven’t added any experience yet.
                            </Text>
                            <Link href={`/profile/${user?.id}/experience/create`}>
                              <Button variant="link" className="text-base">
                                + Add experience
                              </Button>
                            </Link>
                          </Flex>
                        )}
                      </Section>
                    </CardBox>

                    <CardBox className="mb-[2px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Education
                        </Heading>
                        {userProfile?.educations?.length ? (
                          userProfile?.educations?.map((each, key) => (
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
                                    {each.degree}
                                  </Text>
                                  <Text size="2" weight="light">
                                    {each.school_name}
                                  </Text>
                                </Flex>
                              </Flex>
                              <Flex justify="end" align="center" gap="1">
                                <Text size="2" weight="light">
                                  {dayjs(each?.start_date).format("MMM, YYYY")}
                                </Text>
                                <Text size="2" weight="light">
                                  -
                                </Text>
                                {each?.is_present === true ? (
                                  <Text size="2" weight="light">
                                    {"Present"}
                                  </Text>
                                ) : (
                                  <Text size="2" weight="light">
                                    {each?.end_date ? dayjs(each?.end_date).format("MMM, YYYY") : "-"}
                                  </Text>
                                )}
                                {/* <Text size="2" weight="light">
                                  {each?.end_date ? dayjs(each?.end_date).format("MMM, YYYY") : "present"}
                                </Text> */}
                              </Flex>
                            </Flex>
                          ))
                        ) : (
                          <Flex direction="column" justify="center" align="center">
                            <Text size="2" weight="light">
                              You haven’t added any education yet.
                            </Text>
                            <Link href={`/profile/${user?.id}/education/create`}>
                              <Button variant="link" className="text-base">
                                + Add education
                              </Button>
                            </Link>
                          </Flex>
                        )}
                      </Section>
                    </CardBox>

                    {/* <CardBox className="mb-[7px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Department
                        </Heading>
                        {userProfile?.departments?.length
                          ? userProfile?.departments?.map((each, key) => (
                              <Flex
                                key={key}
                                justify="between"
                                align="start"
                                className={cn(
                                  "pb-[10px] mb-[10px]",
                                  key !== (userProfile?.departments ? userProfile.departments.length - 1 : -1) &&
                                    "border-b border-b-[#BDC7D5]"
                                )}
                              >
                                <Flex justify="start" align="start" gap="2">
                                  <Image src="/uploads/icons/education.svg" width={32} height={32} alt="experience" />
                                  <Flex direction="column" gap="2">
                                    <Text as="label" weight="bold" size="3">
                                      {each.department.name}
                                    </Text>
                                  </Flex>
                                </Flex>
                              </Flex>
                            ))
                          : "-"}
                      </Section>
                    </CardBox> */}
                    <CardBox className="mb-[2px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Career interests
                        </Heading>
                        <Flex wrap="wrap" gap="2">
                          {userProfile?.departments?.length
                            ? userProfile?.departments?.map((each, key) => (
                                <Button
                                  key={key}
                                  className="border border-[#EAA1A6] bg-[#F9E9EB] text-black hover:bg-[#F9E9EB]"
                                >
                                  {each.department.name}
                                </Button>
                              ))
                            : "-"}
                        </Flex>
                      </Section>
                    </CardBox>

                    <CardBox className="mb-[5px] rounded-none">
                      <Section className="bg-white" py="4" px="3">
                        <Heading as="h6" size="4" align="left" mb="4">
                          Industry interests
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
                    {/* <CardBox className="mb-[7px] rounded-none">
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
                    </CardBox> */}
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
          animate={Animate.SLIDE}
        >
          {!viewImage ? (
            <Box className="space-y-[20px]">
              {showEditDeleteProilPhoto ? (
                <Flex
                  justify="start"
                  align="center"
                  className="pb-[16px] mb-[16px] border-b border-b-[#BDC7D5] gap-[10px]"
                  onClick={() => setViewImage(true)}
                >
                  <Image
                    src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                    width={20}
                    height={20}
                    alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
                  />
                  <Text className="text-black ml-2">{profileTrigger[triggerType as PROFILE_TRIGGER]}</Text>
                </Flex>
              ) : (
                showEditDeleteCoverPhoto && (
                  <Flex
                    justify="start"
                    align="center"
                    className="pb-[16px] mb-[16px] border-b border-b-[#BDC7D5] gap-[10px]"
                    onClick={() => setViewImage(true)}
                  >
                    <Image
                      src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                      width={20}
                      height={20}
                      alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
                    />
                    <Text className="text-black ml-2">{profileTrigger[triggerType as PROFILE_TRIGGER]}</Text>
                  </Flex>
                )
              )}

              <Flex
                justify="start"
                align="center"
                position="relative"
                className={`pb-[16px]  gap-[10px]  ${
                  (showEditDeleteProilPhoto || showEditDeleteCoverPhoto) && "border-b border-b-[#BDC7D5] mb-[16px]"
                }                 `}
              >
                <input
                  type="file"
                  onChange={handleUploadImage}
                  className="absolute top-0 left-0 w-full h-full opacity-0 z-50"
                />
                <Image
                  src={profileEditTriggerIcon[triggerType as PROFILE_TRIGGER]}
                  width={20}
                  height={20}
                  alt={profileCreateTrigger[triggerType as PROFILE_TRIGGER]}
                />
                <Text className="text-black">{CreateUpdateLabelForPhoto}</Text>
              </Flex>
              {showEditDeleteProilPhoto ? (
                <Flex
                  justify="start"
                  align="center"
                  className="pb-[16px] mb-[16px] border-b border-b-[#BDC7D5] gap-[10px]"
                  onClick={() => {
                    setDeleteModalOpen(true);
                  }}
                >
                  <Icons.deleteCross className="w-7 h-7 text-[#373A36]" />
                  <Text className="text-black">{profileDeleteTrigger[triggerType as PROFILE_TRIGGER]}</Text>
                </Flex>
              ) : (
                showEditDeleteCoverPhoto && (
                  <Flex
                    justify="start"
                    align="center"
                    className="pb-[16px] mb-[16px] gap-[10px]"
                    onClick={() => {
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Icons.deleteCross className="w-7 h-7 text-[#373A36]" />
                    <Text className="text-black">{profileDeleteTrigger[triggerType as PROFILE_TRIGGER]}</Text>
                  </Flex>
                )
              )}
            </Box>
          ) : (
            <Flex className="relative" justify="center" align="center">
              {triggerType === PROFILE_TRIGGER.COVER ? (
                <img src={userProfile?.cover_url} alt="" />
              ) : (
                <img src={userProfile?.profile_url} alt="" />
              )}
            </Flex>
          )}
        </DialogContent>
        {deleteModalOpen && (
          <DialogContent isClose={false} className="border-none shadow-none h-fit top-[50%] translate-y-[-50%]">
            <div className="text-center space-y-[10px] bg-white p-4 rounded-lg">
              <Text className="text-[#373A36] text-[20px] font-[700]">
                {" "}
                Are you sure to delete your {triggerType?.toLocaleLowerCase()} picture?
              </Text>
              <Text className="text-[#373A36]">
                Your {triggerType?.toLocaleLowerCase()} picture will be displayed as default
                {triggerType?.toLocaleLowerCase()} after you deleted.
              </Text>
              <Flex justify="center" className="gap-3">
                <Button className="w-1/2 font-[600]" onClick={handleDeletePhoto} loading={isPending}>
                  Delete
                </Button>

                <Button
                  onClick={() => {
                    setDeleteModalOpen(false);
                  }}
                  className="w-1/2"
                  variant="outline"
                >
                  Cancel
                </Button>
              </Flex>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Profile;
