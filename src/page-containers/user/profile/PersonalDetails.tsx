import CardBox from "@/components/ui/Card";
import { UserProfileResponse } from "@/types/Profile";
import { cn } from "@/utils/cn";
import { Section, Heading, Flex, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface PersonalDetailsProps {
  user: any;
  userProfile: UserProfileResponse;
}


function PersonalDetails({ user, userProfile: { data: userProfile } }: PersonalDetailsProps) {
  return (
    <>
      <div className="flex justify-between mb-2">
        <div></div>
        {/* <Link href={`/profile/${user?.id}`} className="ml-auto">
          <Button variant="ghost" className="">
            <Image src="/uploads/icons/pencil-square.svg" width={20} height={20} alt="pencil" />
            <Text className="text-primary">Edit Profile</Text>
          </Button>
        </Link> */}
      </div>
      <CardBox className="mb-4 rounded-md ">
        <Section className="bg-white" py="4" px="3">
          <div className="flex justify-between">
            <Heading as="h6" size="4" align="left" mb="4">
              Personal information
            </Heading>
            <Link href={`/profile/${user?.id}/personal-details`} className="ml-auto">
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
          {/* <div className="pb-[10px] mb-[10px] ">
            <Flex justify="start" align="center" gap="2">
              <Image src="/uploads/icons/birthday.svg" width={16} height={16} alt="birthday" />
              <Text className="text-[#373A36]">
                {userProfile?.personal_info?.birthday
                  ? dayjs(userProfile?.personal_info?.birthday).format("MMMM D, YYYY")
                  : "-"}
              </Text>
            </Flex>
          </div> */}
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

      <CardBox className="mb-4 rounded-md">
        <Section className="bg-white" py="4" px="3">
          <Flex justify={"between"} align={"baseline"} mb="4">
            <Heading as="h6" size="4" align="left">
              Job Experience
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
            userProfile?.experiences?.slice(0, 2).map((each, key) => (
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

      <CardBox className="mb-4 rounded-md">
        <Section className="bg-white" py="4" px="3">
          <Flex justify={"between"} align={"baseline"} mb="4">
            <Heading as="h6" size="4" align="left">
              Education
            </Heading>

            <Text className="ml-auto">
              <Link href={`/profile/${user?.id}/education`}>
                <p className="text-primary text-[16px] font-[600] me-3">Edit</p>
              </Link>
            </Text>
          </Flex>
          {userProfile?.educations?.length ? (
            userProfile?.educations?.slice(0, 2).map((each, key) => (
              <>
                {console.log(each)}
                <Flex
                  key={key}
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
              </>
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

      <CardBox className="mb-4 rounded-md">
        <Section className="bg-white" py="4" px="3">
          <Flex>
            <Heading as="h6" size="4" align="left" mb="4">
              Department
            </Heading>
            <Link href={`/profile/${user?.id}/department`}>
              <p className="text-primary text-[16px] font-[600] ms-3">Edit</p>
            </Link>
          </Flex>
          <Flex wrap="wrap" gap="2">
            {userProfile?.departments?.length
              ? userProfile?.departments?.map((each, key) => (
                  <Button key={key} className="border border-[#EAA1A6] bg-[#F9E9EB] text-black hover:bg-[#F9E9EB]">
                    {each.department.name}
                  </Button>
                ))
              : "-"}
          </Flex>
        </Section>
      </CardBox>

      <CardBox className="mb-4 rounded-md">
        <Section className="bg-white" py="4" px="3">
          <Flex>
            <Heading as="h6" size="4" align="left" mb="4">
              Industry (Career Interest)
            </Heading>
            <Link href={`/profile/${user?.id}/career-interests`}>
              <p className="text-primary text-[16px] font-[600] ms-3">Edit</p>
            </Link>
          </Flex>
          <Flex wrap="wrap" gap="2">
            {userProfile?.industries?.length
              ? userProfile?.industries?.map((each, key) => (
                  <Button key={key} className="border border-[#EAA1A6] bg-[#F9E9EB] text-black hover:bg-[#F9E9EB]">
                    {each.industry.name}
                  </Button>
                ))
              : "-"}
          </Flex>
        </Section>
      </CardBox>
    </>
  );
}

export default PersonalDetails;
