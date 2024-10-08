/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import {
  useDeleteCoverPhoto,
  useDeleteProfilePhoto,
  useGetGenders,
  useUpdatePersonalInfo,
} from "@/services/user";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { setLocalStorage } from "@/utils";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import { useParams, useRouter,useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import HeaderText from "./components/HeaderText";
import { InputText, InputTextArea, InputTextAreaBgWhite } from "@/components/ui/Inputs";
import { useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Inputs/Select";
import { useGetUser } from "@/services/user";

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

interface GenderProps {
  id:number,
  type:string,
}

const PersonalDetailsEdit: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<PROFILE_TRIGGER>();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const referrer = searchParams.get("from");
  const [isPending] = useTransition();
  const { data: profileData, mutate: mutateUser } = useGetUser<UserProfileResponse>();
  const userProfile = profileData?.data;
  const { trigger, isMutating } = useUpdatePersonalInfo();
  const { data: genderData } = useGetGenders<GenderProps[]>();
  const { trigger: deleteCoverTrigger } = useDeleteCoverPhoto();
  const { trigger: deleteProfileTrigger } = useDeleteProfilePhoto();
  const [selectedGender, setSelectedGender] = useState<any>(profileData?.data?.personal_info?.gender_id);


  const form = useForm({
    defaultValues: {
      name: profileData?.data?.name,
      email: profileData?.data?.email,
      bio: profileData?.data?.bio,
      phone_number: profileData?.data?.personal_info?.phone_number,
      gender: profileData?.data?.personal_info?.gender?.type,
    },
  });

   useEffect(() => {
   }, [referrer]);

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

  const handleChange = (_: undefined) => {
    setTriggerType(PROFILE_TRIGGER.PROFILE);
  };


   const submit = async (data: any) => {
      const submitData = {
        ...data,
        gender_id: parseInt(selectedGender,10),
      };
      console.log(submitData);

      await trigger(submitData, {
      onSuccess: () => {
        if(referrer){
            router.push(`/opportunity`);
        }else{
          router.push(`/profile?tab=personalDetails`);
        }
      },
    });
    };

  return (
    <>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(submit)}>
          <Dialog open={open} onOpenChange={val => setOpen(val)}>
            <Grid columns="1">
              <Box className="pb-[55px] bg-white">
                <HeaderText text="Application for UX Designer Intern" />
                <CardBox className="rounded-none">
                  <Section className="bg-white" py="4" px="3">
                    <DialogTrigger onClick={() => handleChange(undefined)} className="w-full">
                      <div className="grid place-items-center">
                        {userProfile?.profile_url ? (
                          <div className="p-1 border-dotted rounded-[50%] border-2 border-[#F4153D]">
                            <Flex
                              justify="center"
                              align="center"
                              position="relative"
                              className="w-[75px] h-[75px]  rounded-full bg-primary bg-opacity-70 ring-4 ring-white"
                              style={{
                                background: `url(${userProfile?.profile_url}) center / cover`,
                              }}
                            >
                              <Flex
                                justify="center"
                                align="center"
                                className="absolute top-0 left-[80%] w-[30px] h-[30px] rounded-full bg-white  ring-2 ring-white"
                              >
                                <Icons.profileCamera className="w-[15] h-[15] text-primary" />
                              </Flex>
                            </Flex>
                          </div>
                        ) : (
                          <div className="p-1 border-dotted rounded-[50%] border-2 border-[#F4153D]">
                            <Flex
                              justify="center"
                              align="center"
                              position="relative"
                              className="w-[75px] h-[75px] rounded-full ring-4 ring-white bg-gradient-to-b from-white to-red-500 "
                            >
                              <Image
                                className=""
                                width={40}
                                height={40}
                                src="/uploads/icons/user-profile.svg"
                                alt="user profile"
                              />
                              <Flex
                                justify="center"
                                align="center"
                                className="absolute top-0 left-[80%] w-[30px] h-[30px] rounded-full bg-white shadow-profile ring-2 ring-white"
                              >
                                <Icons.profileCamera className="w-[15] h-[15] text-primary" />
                              </Flex>
                            </Flex>
                          </div>
                        )}
                      </div>
                    </DialogTrigger>
                    <Flex justify="center" align="center" mb="4">
                      <p className="text-[24px] font-[700] text-[#373A36]">Julia</p>
                    </Flex>
                  </Section>
                </CardBox>

                <CardBox className="mb-[2px] rounded-none">
                  <Section className="bg-white" py="4" px="3">
                    <Flex justify="between" align="center" mb="4">
                      <p className="text-[20px] font-[700] text-[#373A36]">Personal Detail</p>
                    </Flex>
                    <div className="pb-[10px] mb-[10px]">
                      <Flex direction="column" gap="2">
                        <p className="text-[14px] font-[400] text-[#222222]">Name</p>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <InputText type="text" placeholder="Enter Your Name" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Flex>
                    </div>

                    <div className="pb-[10px] mb-[10px]">
                      <Flex direction="column" gap="2">
                        <p className="text-[14px] font-[400] text-[#222222]"> Gender</p>
                        {/* value={userProfile?.personal_info?.gender ? userProfile?.personal_info?.gender?.type : "-"}
                      onChange= */}
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  onValueChange={(value: string) => {
                                    const selectedGender = genderData?.find(
                                      (item: { type: string }) => item.type === value
                                    );

                                    setSelectedGender(selectedGender ? String(selectedGender.id) : null);
                                    field.onChange(selectedGender?.type || "");
                                  }}
                                  value={String(field.value)}
                                >
                                  <SelectTrigger className="border-none outline-none shadow-md bg-white border-gray-700 ">
                                    {field.value || "Select a Gender"}
                                  </SelectTrigger>
                                  <SelectContent className="bg-white">
                                    {genderData?.map((item: any, index: number) => (
                                      <SelectItem key={index} value={item.type}>
                                        <Text>{item.type}</Text>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Flex>
                    </div>
                    <div className="pb-[10px] mb-[10px]">
                      <Flex direction="column" gap="2">
                        <p className="text-[14px] font-[400] text-[#222222]"> Email Address</p>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <InputText type="text" placeholder="Enter Your Email" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Flex>
                    </div>
                    <div className="pb-[10px] mb-[10px]">
                      <Flex direction="column" gap="2">
                        <p className="text-[14px] font-[400] text-[#222222]">Phone Number</p>
                        <FormField
                          control={form.control}
                          name="phone_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <InputText type="text" placeholder="Enter Your Phone" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Flex>
                    </div>
                    <div className="pb-[10px] mb-[10px]">
                      <Flex direction="column" gap="2">
                        <p className="text-[14px] font-[400] text-[#222222]">About me</p>
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <InputTextAreaBgWhite type="text" placeholder="Describe about yourself" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Flex>
                    </div>
                  </Section>
                </CardBox>
                <Flex justify={"end"}>
                  <Button type="submit" className="me-2 px-8">
                    Done
                  </Button>
                </Flex>
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
        </form>
      </Form>
    </>
  );
};

export default PersonalDetailsEdit;

function mutate() {
  throw new Error("Function not implemented.");
}
