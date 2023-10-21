"use client";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById } from "@/services/user";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProfileEdit: React.FC = () => {
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
                Edit Profile
              </Text>
            </Flex>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <div>
                  <Flex justify="between" align="center" mb="4">
                    <Heading as="h6" size="4" align="left">
                      Cover photo
                    </Heading>
                    <Text className="text-primary">Edit</Text>
                  </Flex>
                  <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                    <Flex className="h-[130px] bg-[#D9D9D9]" justify="center" align="center"></Flex>
                  </div>
                </div>
                <div>
                  <Flex justify="between" align="center" mb="4">
                    <Heading as="h6" size="4" align="left">
                      Cover photo
                    </Heading>
                    <Text className="text-primary">Edit</Text>
                  </Flex>
                  <div className="pb-[10px] mb-[10px]">
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
                  </div>
                </div>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Brief bio
                  </Heading>
                  <Link href={`/profile/${id}/personal-info`}>
                    <Text className="text-primary">Edit</Text>
                  </Link>
                </Flex>
                <Text>{userProfile?.bio}</Text>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Personal information
                  </Heading>
                  <Text className="text-primary">Edit</Text>
                </Flex>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Gender
                    </Text>
                    <Text>Male</Text>
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
                    <Text>{userProfile?.email}</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Education
                  </Heading>
                  <Text className="text-primary">Edit</Text>
                </Flex>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      MUFL
                    </Text>
                    <Text>Post Graduate Diploma</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      MUFL
                    </Text>
                    <Text>Post Graduate Diploma</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      MUFL
                    </Text>
                    <Text>Post Graduate Diploma</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Career interests
                  </Heading>
                  <Text className="text-primary">Edit</Text>
                </Flex>
                <Flex wrap="wrap" gap="2">
                  <Button className="bg-[#d1d5d8] text-black">Human Resources</Button>
                  <Button className="bg-[#d1d5d8] text-black">Design</Button>
                  <Button className="bg-[#d1d5d8] text-black">Engineering</Button>
                  <Button className="bg-[#d1d5d8] text-black">Tourism and hospitality</Button>
                </Flex>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading as="h6" size="4" align="left">
                    Preferences
                  </Heading>
                  <Text className="text-primary">Edit</Text>
                </Flex>
                <Flex wrap="wrap" gap="2">
                  <Button className="bg-[#d1d5d8] text-black">Animation</Button>
                  <Button className="bg-[#d1d5d8] text-black">Art</Button>
                  <Button className="bg-[#d1d5d8] text-black">Reading</Button>
                  <Button className="bg-[#d1d5d8] text-black">Dance</Button>
                </Flex>
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

export default ProfileEdit;
