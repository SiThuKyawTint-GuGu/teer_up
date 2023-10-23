"use client";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserEducations } from "@/services/education";
import { useGetUserById } from "@/services/user";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const Education: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: educationList } = useGetUserEducations();
  const userProfile = profileData?.data;

  console.log("educationList -> ", educationList);

  return (
    <>
      <Grid columns="1">
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link href="/profile">
            <Icons.caretLeft className="text-[#373A36] w-[23px] h-[23px]" />
          </Link>
          <Text size="3" weight="medium">
            Education
          </Text>
          <Link href={`/profile/${id}/education/create`}>
            <Icons.plus className="text-primary w-[23px] h-[23px]" />
          </Link>
        </Flex>
        <Box className="pb-[7px]">
          <Section className="bg-white" py="4" px="3">
            {[0, 1, 2].map((each, key) => (
              <div key={key} className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                <Flex justify="between" align="start">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      MUFL
                    </Text>
                    <Text>Post Graduate Diploma</Text>
                  </Flex>
                  <Link href={`/profile/${id}/education/edit`}>
                    <Image src="/uploads/icons/pencil.svg" width={20} height={20} alt="pencil" />
                  </Link>
                </Flex>
              </div>
            ))}
          </Section>
        </Box>
      </Grid>
    </>
  );
};

export default Education;
