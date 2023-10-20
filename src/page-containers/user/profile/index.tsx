"use client";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { getUserInfo } from "@/utils/auth";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { useState } from "react";

const Profile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const getUser = getUserInfo();
  console.log("user => ", getUser);
  // const { data } = useGetUserById();

  return (
    <>
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <Grid columns="1">
          <Box>
            <Flex justify="center" className="bg-white" p="3">
              <Text size="3" weight="medium">
                Profile
              </Text>
            </Flex>
            <Box className="pb-[7px]">
              <Section p="0">
                <DialogTrigger className="w-full">
                  <Flex className="h-[130px] bg-[#D9D9D9]" justify="center" align="center">
                    <Icons.profileCamera className="w-[24px] h-[24px]" />
                  </Flex>
                </DialogTrigger>
              </Section>
              <Section className="bg-white pt-[70px]" pb="4" px="3" position="relative">
                <div className="absolute -top-[38%]">
                  <Image
                    src="/uploads/icons/profile.svg"
                    width={120}
                    height={120}
                    alt="profile icon"
                  />
                </div>
                <Heading as="h4" size="5" mb="4">
                  Kyaw Nyein Naing
                </Heading>
                <Text>
                  A dedicated UI/UX designer with a passion for crafting delightful digital
                  experiences.{" "}
                </Text>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  Personal information
                </Heading>
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
                    <Text>December 7,1998</Text>
                  </Flex>
                </div>
                <div className="pb-[10px] mb-[10px]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Email
                    </Text>
                    <Text>sheinkoko.designer@gmail.com</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  Education
                </Heading>
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
                <Heading as="h6" size="4" align="left" mb="4">
                  Career interests
                </Heading>
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
                <Heading as="h6" size="4" align="left" mb="4">
                  Career interests
                </Heading>
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

export default Profile;
