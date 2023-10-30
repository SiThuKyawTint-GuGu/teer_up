"use client";
import { Icons } from "@/components/ui/Images";
import { InputSearch } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useGetPreferences } from "@/services/preferences";
import { useGetUserById, useUpdateProfilePreference } from "@/services/user";
import { PreferenceResponse } from "@/types/Preferences";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";

const Preferences: React.FC = () => {
  const { id } = useParams();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: preferencesData } = useGetPreferences<PreferenceResponse>();
  const { trigger: updateTrigger } = useUpdateProfilePreference();
  const preferences = profileData?.data?.preferences;

  const handleCheckedChange = (checked: boolean, preference_id: number) => {
    if (checked) {
      updateTrigger({
        preference_id,
      });
    }
  };

  return (
    <>
      <Grid columns="1">
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link href={`/profile/${id}`}>
            <Icons.caretLeft className="text-[#373A36] w-[23px] h-[23px]" />
          </Link>
          <Text size="3" weight="medium">
            Preferences
          </Text>
          <Link href="/" className="opacity-0">
            <Icons.plus className="text-primary w-[23px] h-[23px]" />
          </Link>
        </Flex>
        <Box className="pb-[7px]">
          <Section className="bg-white" py="4" px="3">
            <Flex justify="center" align="center" className="mb-[25px]">
              <InputSearch placeholder="Search Interests" />
            </Flex>
            {preferencesData?.data?.map((each, key) => {
              const isChecked = preferences?.find(preference => preference.preference_id === each?.id);

              return (
                <Label key={key} className="block mb-[25px]">
                  <Flex justify="between" align="start">
                    <Flex direction="column" gap="2">
                      <Text as="label" weight="regular" size="3">
                        {each.name}
                      </Text>
                    </Flex>
                    <Checkbox
                      defaultChecked={isChecked && true}
                      onCheckedChange={(checked: boolean) => handleCheckedChange(checked, each?.id)}
                    />
                  </Flex>
                </Label>
              );
            })}
          </Section>
        </Box>
      </Grid>
    </>
  );
};

export default Preferences;
