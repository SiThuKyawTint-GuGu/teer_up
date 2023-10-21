"use client";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById } from "@/services/user";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useState } from "react";

const PersonalInfo: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const userProfile = profileData?.data;

  return (
    <>
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <Grid columns="1">
          <Box>
            <Flex justify="center" className="bg-white" p="3">
              <Text size="3" weight="medium">
                Personal Information
              </Text>
            </Flex>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Gender
                  </Heading>
                  <Text className="text-primary">Edit</Text>
                </Flex>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text>Female</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text>Male</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text>More options</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
          </Box>
        </Grid>
        <DialogContent className="bg-white top-[initial] bottom-0 px-4 py-8 translate-y-0">
          <Box className="space-y-[40px]">
            <Flex
              justify="start"
              align="center"
              className="pb-[20px] mb-[20px] border-b border-b-[#BDC7D5] gap-[10px]"
            >
              <Image
                src="/uploads/icons/see-profile.svg"
                width={20}
                height={20}
                alt="see profile"
              />
              <Text>See profile picture</Text>
            </Flex>
            <Flex
              justify="start"
              align="center"
              className="pb-[20px] mb-[20px] border-b border-b-[#BDC7D5] gap-[10px]"
            >
              <Image
                src="/uploads/icons/select-profile.svg"
                width={20}
                height={20}
                alt="select profile"
              />
              <Text>Select profile picture</Text>
            </Flex>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalInfo;
