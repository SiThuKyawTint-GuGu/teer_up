"use client";
import CardBox from "@/components/ui/Card";
import { DialogTrigger } from "@/components/ui/Dialog";
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
import { Box, Flex, Grid, Heading, Section, Tabs } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import CareerMuscles from "./CareerMuscles";
import PersonalDetails from "./PersonalDetails";
import ProfilePhotoModal from "./ProfilePhotoModal";

const profileEditTrigger = {
  [PROFILE_TRIGGER.COVER]: "Change cover picture",
  [PROFILE_TRIGGER.PROFILE]: "Change profile picture",
};
const profileCreateTrigger = {
  [PROFILE_TRIGGER.COVER]: "Select cover picture",
  [PROFILE_TRIGGER.PROFILE]: "Select profile picture",
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
    mounted && (
      <>
        <ProfilePhotoModal
          open={open}
          setOpen={setOpen}
          viewImage={viewImage}
          setViewImage={setViewImage}
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          triggerType={triggerType as PROFILE_TRIGGER}
          setTriggerType={setTriggerType}
          isPending={isPending}
          handleDeletePhoto={handleDeletePhoto}
          handleUploadImage={handleUploadImage}
          showEditDeleteProilPhoto={showEditDeleteProilPhoto as boolean}
          showEditDeleteCoverPhoto={showEditDeleteCoverPhoto as boolean}
          CreateUpdateLabelForPhoto={CreateUpdateLabelForPhoto}
          userProfile={{ data: userProfile } as UserProfileResponse}
        >
          <Grid columns="1">
            <Box className="pb-[55px]">
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
        </ProfilePhotoModal>
      </>
    )
  );
};
export default Profile;
