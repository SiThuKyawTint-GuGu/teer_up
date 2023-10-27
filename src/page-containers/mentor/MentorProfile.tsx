"use client";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetContentBySlug } from "@/services/content";
import { useGetUserById } from "@/services/user";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { ContentData } from "@/types/Content";
import { UserProfileResponse } from "@/types/Profile";
import { getUserInfo } from "@/utils/auth";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useState } from "react";

const profileTrigger = {
  [PROFILE_TRIGGER.COVER]: "See cover picture",
  [PROFILE_TRIGGER.PROFILE]: "See profile picture",
};

const profileTriggerIcon = {
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/select-profile.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/see-profile.svg",
};

const MentorProfile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<PROFILE_TRIGGER>();
  const user = getUserInfo();
  const { slug }: { slug: string } = useParams();
  const { data } = useGetContentBySlug<ContentData>(slug);

  const { data: profileData } = useGetUserById<UserProfileResponse>(user?.id);
  const userProfile = profileData?.data;
  console.log(data?.data);
  return (
    <>
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        {data && (
          <Grid columns="1">
            <Box className="pb-[55px]">
              <Box className="pb-[7px]">
                <Section p="0">
                  {userProfile?.cover_url ? (
                    <div
                      style={{
                        background: `url(${data.data.mentor.cover_url}) center / cover`,
                        height: "130px",
                      }}
                    />
                  ) : (
                    <Flex className="h-[130px] bg-[#D9D9D9]" justify="center" align="center">
                      <Icons.profileCamera className="w-[24px] h-[24px]" />
                    </Flex>
                  )}
                </Section>
                <Section className="bg-white pt-[70px]" pb="4" px="3" position="relative">
                  <div className="absolute -top-[36%]">
                    {data.data.profile_url ? (
                      <Flex
                        justify="center"
                        align="center"
                        position="relative"
                        className="w-[120px] h-[120px] rounded-full bg-[#D9D9D9] ring-4 ring-white"
                        style={{
                          background: `url(${data.data.mentor.profile_url}) center / cover`,
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

                  <Heading as="h4" size="5" mb="4">
                    {}
                  </Heading>
                  <Text>{data?.data?.mentor.bio}</Text>
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
                      <Text>24th December 2002</Text>
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
                  <Heading as="h6" size="4" align="left" mb="4">
                    Experties
                  </Heading>
                  <span className="px-2 py-1 rounded-xl text-center text-[14px] bg-secondary border-[1px] border-primary">
                    Programming
                  </span>
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Career interests
                  </Heading>
                  <Flex wrap="wrap" gap="2">
                    {userProfile?.industries?.map((each, key) => (
                      <Button key={key} className="bg-[#d1d5d8] text-black">
                        {each.industry.name}
                      </Button>
                    ))}
                  </Flex>
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Experience
                  </Heading>
                  <Flex wrap="wrap" gap="2">
                    Frontend Developer
                  </Flex>
                </Section>
              </Box>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  Education
                </Heading>

                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      National Management Degree Collegue
                    </Text>
                    <Text>BA</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
            <DialogContent className="bg-white top-[initial] bottom-0 px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
              <Box className="space-y-[40px]">
                <Flex
                  justify="start"
                  align="center"
                  className="pb-[20px] mb-[20px] border-b border-b-[#BDC7D5] gap-[10px]"
                >
                  <Image
                    src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                    width={20}
                    height={20}
                    alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
                  />
                  <Text className="text-black">
                    {profileTrigger[triggerType as PROFILE_TRIGGER]}
                  </Text>
                </Flex>
              </Box>
            </DialogContent>
          </Grid>
        )}
      </Dialog>
    </>
  );
};

export default MentorProfile;
