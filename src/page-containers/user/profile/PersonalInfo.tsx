"use client";
import { InputText } from "@/components/ui/Inputs";
import Radio from "@/components/ui/Inputs/Radio";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById } from "@/services/user";
import { UserProfileResponse } from "@/types/Profile";
import { FormControl, RadioGroup } from "@mui/material";
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
              <FormControl
                sx={{
                  "&.MuiFormControl-root": {
                    width: "100%",
                  },
                }}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <Label className="border-b border-b-[#BDC7D5]">
                    <Flex justify="between" align="center">
                      Female
                      <Radio value="female" />
                    </Flex>
                  </Label>
                  <Label className="border-b border-b-[#BDC7D5]">
                    <Flex justify="between" align="center">
                      Male
                      <Radio value="male" />
                    </Flex>
                  </Label>
                  <Label>
                    <Flex justify="between" align="center">
                      More options
                      <Radio value="other" />
                    </Flex>
                  </Label>
                </RadioGroup>
              </FormControl>
            </Section>
          </Box>

          <Box className="pb-[7px]">
            <Section className="bg-white" py="4" px="3">
              <Heading as="h6" size="4" align="left" mb="4">
                Email
              </Heading>
              <InputText />
            </Section>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default PersonalInfo;
