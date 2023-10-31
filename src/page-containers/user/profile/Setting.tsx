"use client";
import { Icons } from "@/components/ui/Images";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Setting: React.FC = () => {
  const { id } = useParams();

  return (
    <Grid columns="1">
      <Flex justify="between" align="center" className="bg-white" p="3">
        <Link href={`/profile/${id}`}>
          <Icons.caretLeft className="text-[#373A36] w-[23px] h-[23px]" />
        </Link>
        <Text size="3" weight="medium">
          Settings
        </Text>
        <Icons.plus className="text-primary w-[23px] h-[23px] opacity-0" />
      </Flex>
      <Box>
        <Section py="4" px="3">
          <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="start">
              <Text as="label" weight="bold" size="3">
                Allow Notification
              </Text>
              <Switch />
            </Flex>
          </div>
        </Section>
      </Box>
    </Grid>
  );
};

export default Setting;
