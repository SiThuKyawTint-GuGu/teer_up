"use client";
import { Icons } from "@/components/ui/Images";
import { InputSearch } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useGetIndustry } from "@/services/industry";
import { useGetUserById, useUpdateProfileIndustry } from "@/services/user";
import { IndustryResponse } from "@/types/Industry";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";

const CareerInterests: React.FC = () => {
  const { id } = useParams();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: industryData } = useGetIndustry<IndustryResponse>();
  const { trigger: updateTrigger } = useUpdateProfileIndustry();
  const industries = profileData?.data?.industries;

  const handleCheckedChange = (checked: boolean, industry_id: number) => {
    if (checked) {
      updateTrigger({
        industry_id,
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
            Career Interests
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
            {industryData?.data?.map((each, key) => {
              const isChecked = industries?.find(industry => industry.industry_id === each?.id);

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

export default CareerInterests;
