"use client";
import { Button } from "@/components/ui/Button";
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
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Preferences: React.FC = () => {
  const { id } = useParams();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: preferencesData } = useGetPreferences<PreferenceResponse>();
  const { trigger: updateTrigger } = useUpdateProfilePreference();
  const preferences = profileData?.data?.preferences;
  const router = useRouter();

  const handleCheckedChange = (checked: boolean, preference_id: number) => {
    if (checked) {
      updateTrigger({
        preference_id,
      });
    }
  };

  const handleSave = () =>{
    router.back();
  }
  return (
    <>
      <Grid columns="1">
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="bg-white" p="3">
              <div className="cursor-pointer" onClick={() => router.back()}>
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </div>
              <Text size="3" weight="medium">
                Preferences
              </Text>
              <Link href="/" className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>

        <Box className="pb-[7px]">
          <Section className="bg-white" py="4" px="3">
            <Flex justify="center" align="center" className="mb-[25px] mt-[10px]">
              <InputSearch placeholder="Search Interests" />
            </Flex>
            {preferencesData?.data?.map((each, key) => {
              const isChecked = preferences?.find(preference => preference.preference_id === each?.id);

              return (
                <Label key={key} className="block mb-[20px]">
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

            <Button onClick={() => handleSave()} className="w-full h-[40px]">
              Save
            </Button>
          </Section>
        </Box>
      </Grid>
    </>
  );
};

export default Preferences;
