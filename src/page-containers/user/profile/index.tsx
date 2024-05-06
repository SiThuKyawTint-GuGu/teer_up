"use client";
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
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import CareerMuscles from "./CareerMuscles";
import PersonalDetails from "./PersonalDetails";

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
  const { trigger: onBoardingStatus, isMutating: statusLoading } = useUpdateUserOnboardingStatus();

  const { trigger: deleteCoverTrigger } = useDeleteCoverPhoto();
  const { trigger: deleteProfileTrigger } = useDeleteProfilePhoto();

  const { data: getOnboardingStatus } = useGetUserOnboardingStatus<UserOnboardingStatusResponse>();

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
              <Section className="pt-[40px]" pb="0" px="3" position="relative">
                <DialogTrigger onClick={() => setTriggerType(PROFILE_TRIGGER.PROFILE)} className="w-full">
                  <div className="grid place-items-center">
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
                          className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-white  ring-2 ring-white"
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
                <Heading as="h4" className="text-center" size="6" my="4">
                  {userProfile?.name}
                </Heading>
                <Text className="text-center">{userProfile?.bio}</Text>
              </Section>
            </Box>
            <CardBox className="mb-[7px] rounded-none">
              <Section className="" pt="4" pb="0">
                <Tabs.Root defaultValue={(get("tab") ? get("tab") : "competency") ?? ""}>
                  <Tabs.List className="space-x-[20px] px-3 flex justify-center mb-2">
                    <Tabs.Trigger
                      onClick={() => handleTabTrigger("competency")}
                      className="tab-trigger cursor-pointer text-lg"
                      value="competency"
                    >
                      Your Career Muscles
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      onClick={() => handleTabTrigger("personalDetails")}
                      className="tab-trigger cursor-pointer text-lg"
                      value="personalDetails"
                    >
                      Personal details
                    </Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="competency" className="space-y-[7px] p-2">
                    <CareerMuscles
                      userDimensionData={userDimensionData as UserDimensionResultResponse}
                      statusLoading={statusLoading}
                      getOnboardingStatus={getOnboardingStatus as UserOnboardingStatusResponse}
                      scoresLoading={scoresLoading}
                      handleContinueAssessment={handleContinueAssessment}
                      handleRetakeAssessment={handleRetakeAssessment}
                    />
                  </Tabs.Content>

                  <Tabs.Content value="personalDetails" className="p-2">
                    <PersonalDetails
                      user={user}
                      userProfile={
                        {
                          data: userProfile,
                        } as UserProfileResponse
                      }
                    />
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
                /* eslint-disable @next/next/no-img-element */
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
