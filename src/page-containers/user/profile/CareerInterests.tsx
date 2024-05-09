"use client";
import { Button } from "@/components/ui/Button";
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
import { debounce } from "lodash";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CareerInterests: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { id } = useParams();
  const router = useRouter();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: industryData } = useGetIndustry<IndustryResponse>(searchValue);
  const { trigger: updateTrigger } = useUpdateProfileIndustry();
  const industries = profileData?.data?.industries;
  const inputRef = useRef<any>(null);
  const [selectId, setSelectId] = useState<number[]>([]);

  useEffect(()=>{
      console.log(selectId);
  },[selectId])

  const handleCheckedChange = (checked: boolean, industry_id: number) => {
    console.log(industry_id);
    setSelectId([...selectId,industry_id]);
    console.log(selectId)
    // updateTrigger({
    //   industry_id,
    // });
  };

  const debouncedOnChange = debounce(() => {
    setSearchValue(inputRef?.current?.value);
  }, 500);

  const handleSave = (_:undefined) =>{
    selectId.map(item =>
      updateTrigger({
        industry_id:item
      })
    );
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

        <Box className="mb-[56px] h-[100%]">
          <Section className="bg-white h-[100%]" py="4" px="3">
            <Flex justify="center" align="center" className="mb-[40px] mt-[10px]">
              {/* <InputSearch placeholder="Search Interests" /> */}
              <InputSearch
                onChange={debouncedOnChange}
                ref={inputRef}
                placeholder="Search Interests"
                inputClassName="p-[10px]"
              />
            </Flex>
            <div className="space-y-4">
              {industryData?.data?.published?.map((each, key) => {
                const isChecked = industries?.find(industry => industry.industry_id === each?.id);

                return (
                  <Label key={key} className="block mb-[15px] asd">
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

              <div className="mt-[30px]">
                <Button onClick={()=>handleSave()} className="w-full h-[40px]">Save</Button>
              </div>
              {/* <Text size="3" weight="bold">
                Coming Soon
              </Text>
              {industryData?.data?.unpublished?.map((each, key) => {
                return (
                  <Label key={key} className="block mb-[15px] asd">
                    <Flex justify="between" align="start">
                      <Flex direction="column" gap="2">
                        <Text as="label" weight="regular" size="3" className="text-[#909090]">
                          {each.name}
                        </Text>
                      </Flex>
                      <Checkbox disabled />
                    </Flex>
                  </Label>
                );
              })} */}
            </div>
          </Section>
        </Box>
      </Grid>
    </>
  );
};

export default CareerInterests;
