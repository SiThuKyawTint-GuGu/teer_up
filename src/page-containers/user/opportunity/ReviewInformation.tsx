"use client"
import CardBox from "@/components/ui/Card";
import { UserProfileResponse } from "@/types/Profile";
import { cn } from "@/utils/cn";
import { Section, Heading, Flex, Text, Box } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import {
  useGetUser,
} from "@/services/user";
import { getUserInfo } from "@/utils/auth";
import HeaderText from "../profile/components/HeaderText";
import { useRouter,usePathname } from "next/navigation";

function ReviewInformation() {
  const pathname = usePathname();
  const { data: profileData } = useGetUser<UserProfileResponse>();
  const currentUrl = pathname;
  const userProfile = profileData?.data;
  const user = getUserInfo();
  const router = useRouter();

  const handleNext = (_:undefined) =>{
    console.log("next");
    router.push('opportunity/additional-questions')
  }
  return (
    <>
      <div className="flex justify-between mb-2">
        <HeaderText text={"Review Information"} />
      </div>
      <CardBox className="mb-4 rounded-md ">
        <Section className="bg-white" py="4" px="3">
          <div className="flex justify-between">
            <Heading as="h6" size="4" align="left" mb="4">
              Personal information
            </Heading>
            <Link href={{ pathname: `/profile/${user?.id}/personal-details`, query: { from: currentUrl } }} className="ml-auto">
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
              <Image src="/uploads/icons/personal-profile.svg" width={16} height={16} alt="personal profile" />
              <Text className="capitalize text-[#373A36]">
                {userProfile?.personal_info?.gender ? userProfile?.personal_info?.phone_number : "-"}{" "}
              </Text>
            </Flex>
          </div>
        </Section>
      </CardBox>

      <CardBox className=" rounded-md p-4">
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

      <CardBox className="rounded-md p-4 ">
        <Section className="" py="4" px="3">
          <Flex justify={"between"} align={"baseline"} mb="4">
            <Heading as="h6" size="4" align="left">
              Attach Resume
            </Heading>
          </Flex>
          <Box className="flex justify-center">
            <button className="">Use</button>
          </Box>
          <Box className="border-b border-b-[#BDC7D5] pb-[10px] ">
            <p className="text-[16px] font-[600] text-[#373A36]">Resume_Julia_Nov_2023.docx</p>
            <p className="text-[14px] font-[300] text-[#373A36]">Uploaded on 26 Nov 2023</p>
          </Box>
          <Box className="justify-center flex ">
            <p className="text-[16px] font-[600] text-[##373A36] ">or</p>
          </Box>
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p> */}
                  <p className="mb-2 text-sm text-primary text-[14px] font-[400]">Tap to upload file</p>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
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
    </>
  );
}

export default ReviewInformation;
