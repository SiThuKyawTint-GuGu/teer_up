/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import CardBox from "@/components/ui/Card";
import { UserProfileResponse } from "@/types/Profile";
import { cn } from "@/utils/cn";
import { Section, Heading, Flex, Text, Box } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useGetUser, useUploadFile } from "@/services/user";
import { getToken, getUserInfo } from "@/utils/auth";
import HeaderText from "../profile/components/HeaderText";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ReviewInformation() {
  const pathname = usePathname();
  const { data: profileData, mutate: mutateUserProfile } = useGetUser<UserProfileResponse>();
  const currentUrl = pathname;
  const userProfile = profileData?.data;
  const user = getUserInfo();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        setIsLoading(true);
        const response = await useUploadFile(formData);
        mutateUserProfile();
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "Invalid date";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {}, [userProfile]);

  const handleNext = (_: undefined) => {
    router.push("opportunity/additional-questions");
  };

  return (
    <>
      <div className="flex justify-between mb-0">
        <HeaderText text={"Review Information"} />
      </div>
      <Box className="relative bottom-[30px]">
        <CardBox className="mb-4 rounded-md p-3 py-0 ">
          <Section className="bg-white" py="4" px="3">
            <div className="flex justify-between">
              <Heading as="h6" size="4" align="left" mb="4">
                Personal information
              </Heading>
              <Link
                href={{ pathname: `/profile/${user?.id}/personal-details`, query: { from: currentUrl } }}
                className="ml-auto"
              >
                <p className="text-primary text-[16px] font-[600]">Edit</p>
              </Link>
            </div>
            <div className="pb-[10px] mb-[10px] ">
              <Flex justify="start" align="center" gap="2">
                <Image src="/uploads/icons/personal-profile.svg" width={16} height={16} alt="personal profile" />
                <Text className="capitalize text-[#373A36]">{userProfile?.name ? userProfile?.name : "-"}</Text>
              </Flex>
            </div>
            <div className="pb-[10px] mb-[10px] ">
              <Flex justify="start" align="center" gap="2">
                <Image src="/uploads/icons/personal-profile.svg" width={16} height={16} alt="personal profile" />
                <Text className="capitalize text-[#373A36]">
                  {userProfile?.personal_info?.gender ? userProfile?.personal_info?.gender?.type : "-"}
                </Text>
              </Flex>
            </div>
            <div className="pb-[10px] mb-[10px]">
              <Flex justify="start" align="center" gap="2">
                <Image src="/uploads/icons/mail-outline.svg" width={16} height={16} alt="mail" />
                <Text className="text-[#373A36]">{userProfile?.email ? userProfile?.email : "-"}</Text>
              </Flex>
            </div>
            <div className="">
              <Flex justify="start" align="center" gap="2">
                <Image src="/uploads/images/phone.png" width={16} height={16} alt="personal profile" />
                <Text className="capitalize text-[#373A36]">
                  {userProfile?.personal_info?.gender ? userProfile?.personal_info?.phone_number : "-"}{" "}
                </Text>
              </Flex>
            </div>
          </Section>
        </CardBox>

        <CardBox className="mb-4 rounded-md p-3 py-0">
          <Section className="bg-white" py="4" px="3">
            <Flex justify={"between"} align={"baseline"} mb="4">
              <Heading as="h6" size="4" align="left">
                Education
              </Heading>
              <Text className="ml-auto">
                <Link href={{ pathname: `/profile/${user?.id}/education`, query: { from: currentUrl } }}>
                  <p className="text-primary text-[16px] font-[600] me-3">Edit</p>
                </Link>
              </Text>
            </Flex>
            {userProfile?.educations?.length ? (
              userProfile?.educations?.slice(0, 2).map((each, key) => (
                <React.Fragment key={each.id}>
                  <Flex
                    justify="between"
                    align="start"
                    className={cn(
                      key !== (userProfile?.educations ? userProfile.educations.slice(0, 2).length - 1 : -1) &&
                        "border-b border-b-[#BDC7D5] pb-[10px] mb-[10px]"
                    )}
                  >
                    <Flex justify="start" align="start" gap="2">
                      <Image src="/uploads/icons/education.svg" width={32} height={32} alt="experience" />
                      <Flex direction="column" gap="2">
                        <Text as="label" weight="bold" size="3">
                          {each.degree_id ? each.degree_relation?.name : each.other_school_degree}
                        </Text>
                        <Text size="2" weight="light">
                          {each.school_id ? each.school?.name : each.other_school_name}
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
                </React.Fragment>
              ))
            ) : (
              <Flex direction="column" justify="center" align="center">
                <Text size="2" weight="light">
                  You haven’t added any education yet.
                </Text>
                <Link href={{ pathname: `/profile/${user?.id}/education/create`, query: { from: currentUrl } }}>
                  <Button variant="link" className="text-base">
                    + Add education
                  </Button>
                </Link>
              </Flex>
            )}
          </Section>
        </CardBox>

        <CardBox className=" rounded-md p-4 py-0">
          <Section className="bg-white" py="4" px="3">
            <Flex justify={"between"} align={"baseline"} mb="4">
              <Heading as="h6" size="4" align="left">
                Experience
              </Heading>
              <Text className="ml-auto">
                <Link href={`/profile/${user?.id}/experience`}>
                  <Button variant="link" className="text-primary font-bold">
                    <p className="text-primary text-[16px] font-[600]">Edit</p>
                  </Button>
                </Link>
              </Text>
            </Flex>
            {userProfile?.experiences?.length ? (
              userProfile?.experiences?.slice(0, 2).map((each: any, key: any) => (
                <Flex
                  key={key}
                  justify="between"
                  align="start"
                  className={cn(
                    key !== (userProfile?.experiences ? userProfile.experiences.slice(0, 2).length - 1 : -1)
                      ? "pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]"
                      : ""
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

        <CardBox className="rounded-md p-4 py-0 ">
          <Section className="" py="4" px="3">
            {userProfile?.resume_url && (
              <Box>
                <Flex justify={"between"} align={"baseline"} mb="4">
                  <Heading as="h6" size="4" align="left">
                    Attach Resume
                  </Heading>
                </Flex>
                {/* <Box className="flex justify-center">
            <button className="">Use</button>
          </Box> */}
                <Box className="border-b border-b-[#BDC7D5] pb-[10px] ">
                  <p className="text-[16px] font-[600] text-[#373A36]">
                    {userProfile?.resume_url &&
                      userProfile.resume_url
                        .split("/")
                        .pop()
                        .replace("%20", " ")
                        ?.split("-")
                        .slice(2)
                        .join("-")
                        .replace("%20", " ")}
                  </p>
                  <p className="text-[14px] font-[300] text-[#373A36]">
                    {" "}
                    Uploaded on {formatDate(userProfile?.resume_created_at)}
                  </p>
                </Box>
              </Box>
            )}
            {isLoading && (
              <Flex className=" justify-center py-2">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </Flex>
            )}
            {/* <Box className="justify-center flex ">
              <p className="text-[16px] font-[600] text-[##373A36] ">or</p>
            </Box> */}
            <Box>
              <div className="flex items-center justify-center w-full mt-4">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[98px] border-2 border-[#DA291C] border-dashed rounded-lg cursor-pointer bg-[#DA291C0D]"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-primary"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-primary text-[14px] font-[400]">Tap to upload file</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </Box>
            <Flex className="justify-end gap-3 mt-5">
              <Button className="px-[35px] h-[40px] text-[18px] font-[600]">Back</Button>
              <Button onClick={() => handleNext(undefined)} className="px-[35px] h-[40px] text-[18px] font-[600]">
                Next
              </Button>
            </Flex>
          </Section>
        </CardBox>
      </Box>
    </>
  );
}

export default ReviewInformation;
