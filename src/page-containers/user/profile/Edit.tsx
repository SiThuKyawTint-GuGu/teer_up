"use client";
import BGImage from "@/components/shared/BGImage";
import { bgTypes, WIDTH_TYPES } from "@/components/shared/enums";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import {
  useDeleteCoverPhoto,
  useDeleteProfilePhoto,
  useGetUserById,
  useUploadCover,
  useUploadProfile,
} from "@/services/user";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { setLocalStorage } from "@/utils";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";

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
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/photo-edit.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/photo-edit.svg",
};

const ProfileEdit: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<PROFILE_TRIGGER>();
  const { id } = useParams();
  const [isPending] = useTransition();
  const { data: profileData, mutate } = useGetUserById<UserProfileResponse>(id as string);
  const { trigger: uploadProfileTrigger } = useUploadProfile();
  const { trigger: uploadCoverTrigger } = useUploadCover();
  const { trigger: deleteCoverTrigger } = useDeleteCoverPhoto();
  const { trigger: deleteProfileTrigger } = useDeleteProfilePhoto();
  const userProfile = profileData?.data;
  const router = useRouter();
  const handleDeletePhoto = async () => {
    const triggerFunction = triggerType === PROFILE_TRIGGER.PROFILE ? deleteProfileTrigger() : deleteCoverTrigger();
    try {
      await triggerFunction;
      await mutate();
      setDeleteModalOpen(false);
      setOpen(!open);
    } catch (error) {
      console.error("Upload failed =>", error);
    }
  };
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

  const getFileFromEvent = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement?.files;
    return files ? files[0] : null;
  };
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
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <Grid columns="1">
          <Box className="pb-[55px]">
            <div className="mb-[45px]">
              <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                <Flex justify="between" align="center" className="bg-white" p="3">
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
                  </div>
                  <Text size="3" weight="medium">
                    Edit Profile
                  </Text>
                  <Link href="/" className="opacity-0">
                    <Icons.plus className="text-primary w-[23px] h-[23px]" />
                  </Link>
                </Flex>
              </div>
            </div>
            <CardBox className="mb-[2px] rounded-none">
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
                      <>
                        <BGImage width={bgTypes[WIDTH_TYPES.FULL]} height="130px" url={userProfile?.cover_url} />
                      </>
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
            </CardBox>
            <CardBox className="mb-[2px] rounded-none">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Brief bio
                  </Heading>
                  <Link href={`/profile/${id}/bio`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
                <Text>{userProfile?.bio ? userProfile?.bio : "-"}</Text>
              </Section>
            </CardBox>
            <CardBox className="mb-[2px] rounded-none">
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
                      Name
                    </Text>
                    <Text className="capitalize">{userProfile?.name ? userProfile?.name : "-"}</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Gender
                    </Text>
                    <Text className="capitalize">
                      {userProfile?.personal_info?.gender ? userProfile?.personal_info?.gender?.type : "-"}
                    </Text>
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
                    <Text>{userProfile?.email ? userProfile?.email : "-"}</Text>
                  </Flex>
                </div>
              </Section>
            </CardBox>

            <CardBox className="mb-[2px] rounded-none">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Job Experience
                  </Heading>
                  {userProfile?.experiences !== undefined && userProfile?.experiences.length > 0 && (
                    <Link href={`/profile/${id}/experience`}>
                      <Text className="text-primary">Edit</Text>
                    </Link>
                  )}
                </Flex>
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
                      <Flex direction="column" gap="2">
                        <Text as="label" weight="bold" size="3">
                          {each?.position}
                        </Text>
                        <Text size="2">{each?.company}</Text>
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
                      You haven’t added any experience yet.
                    </Text>
                    <Link href={`/profile/${id}/experience/create`}>
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
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Education
                  </Heading>
                  {userProfile?.educations !== undefined && userProfile?.educations.length > 0 && (
                    <Link href={`/profile/${id}/education`}>
                      <Text className="text-primary">Edit</Text>
                    </Link>
                  )}
                </Flex>
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
                      <Flex direction="column" gap="2">
                        <Text as="label" weight="bold" size="3">
                          {each.degree}
                        </Text>
                        <Text size="2">{each.school_name}</Text>
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
                    <Link href={`/profile/${id}/education/create`}>
                      <Button variant="link" className="text-base">
                        + Add education
                      </Button>
                    </Link>
                  </Flex>
                )}
              </Section>
            </CardBox>

            <CardBox className="mb-[2px] rounded-none">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Career interests
                  </Heading>
                  <Link href={`/profile/${id}/department`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
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

            <CardBox className="mb-[7px] rounded-none">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Industry interests
                  </Heading>
                  <Link href={`/profile/${id}/career-interests`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
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
            {/* <CardBox className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Preferences
                  </Heading>
                  <Link href={`/profile/${id}/preferences`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
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
          </Box>
        </Grid>

        <DialogContent className="bg-white top-[initial] bottom-0 px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
          <Box>
            <Flex
              justify="start"
              align="center"
              position="relative"
              className={`pb-[16px]  gap-[10px] ${
                ((triggerType === PROFILE_TRIGGER.COVER && userProfile?.cover_url) ||
                  (triggerType === PROFILE_TRIGGER.PROFILE && userProfile?.profile_url)) &&
                " border-b border-b-[#BDC7D5] mb-[16px]"
              }`}
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
                alt={profileCreateTrigger[triggerType as PROFILE_TRIGGER]}
              />
              <Text className="text-black">{CreateUpdateLabelForPhoto}</Text>
            </Flex>
            {triggerType === PROFILE_TRIGGER.COVER && userProfile?.cover_url ? (
              <Flex
                justify="start"
                align="center"
                className="  pb-[16px] gap-[10px]"
                onClick={() => setDeleteModalOpen(true)}
              >
                <Icons.deleteCross className="w-7 h-7 text-[#373A36]" />
                <Text className="text-black">{profileDeleteTrigger[triggerType as PROFILE_TRIGGER]}</Text>
              </Flex>
            ) : (
              triggerType === PROFILE_TRIGGER.PROFILE &&
              userProfile?.profile_url && (
                <Flex
                  justify="start"
                  align="center"
                  className=" pb-[16px] gap-[10px]"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  <Icons.deleteCross className="w-7 h-7 text-[#373A36]" />
                  <Text className="text-black">{profileDeleteTrigger[triggerType as PROFILE_TRIGGER]}</Text>
                </Flex>
              )
            )}
          </Box>
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

export default ProfileEdit;
