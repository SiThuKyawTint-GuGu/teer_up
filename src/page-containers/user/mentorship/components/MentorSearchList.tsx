"use client";

import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { InputSearch } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Link, Section } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

type DataProp = {
  name: string;
};

type MentorSearchListProp = {
  title: String;
  data: DataProp[];
};

export const MentorSearchList: React.FC<MentorSearchListProp> = ({ title, data }) => {
  const router = useRouter();

  return (
    <>
      <Grid columns="1" className="">
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="bg-white" p="3">
              <div className="cursor-pointer" onClick={() => router.back()}>
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </div>
              <Text size="3" weight="medium">
                {title}
              </Text>
              <Link href="/" className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>

        <Box className="pb-[65px] h-[100vh-56px] bg-white">
          <Section className="bg-white" py="4" px="3">
            <Flex justify="center" align="center" className="mb-[40px] mt-[10px]">
              <InputSearch onChange={() => {}} placeholder="Search Interests" inputClassName="p-[10px]" />
            </Flex>
            {data?.map((each, key) => {
              const isChecked = false;

              return (
                <Label key={key} className="block mb-[20px]">
                  <Flex justify="between" align="start">
                    <Flex direction="column" gap="2">
                      <Text as="label" weight="regular" size="3">
                        {each.name}
                      </Text>
                    </Flex>
                    <Checkbox defaultChecked={!!isChecked} onCheckedChange={() => {}} />
                  </Flex>
                </Label>
              );
            })}
          </Section>
          <Button onClick={() => {}} className="w-full h-[40px]">
            Save
          </Button>
        </Box>
      </Grid>
    </>
  );
};
