"use client";
import { Icons } from "@/components/ui/Images";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useGetPreferences } from "@/services/preferences";
import { useGetUserById } from "@/services/user";
import { PreferenceResponse } from "@/types/Preferences";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const Preferences: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: preferencesData } = useGetPreferences<PreferenceResponse>();

  return (
    <>
      <Grid columns="1">
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link href="/profile">
            <Icons.caretLeft className="text-[#373A36] w-[23px] h-[23px]" />
          </Link>
          <Text size="3" weight="medium">
            Preferences
          </Text>
          <Link href={`/profile/${id}/education/create`}>
            <Icons.plus className="text-primary w-[23px] h-[23px]" />
          </Link>
        </Flex>
        <Box className="pb-[7px]">
          <Section className="bg-white" py="4" px="3">
            {preferencesData?.data?.map((each, key) => (
              <Label key={key} className="block mb-[25px]">
                <Flex justify="between" align="start">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="regular" size="3">
                      {each.name}
                    </Text>
                  </Flex>
                  <Checkbox />
                </Flex>
              </Label>
            ))}
          </Section>
        </Box>
      </Grid>
    </>
  );
};

export default Preferences;
