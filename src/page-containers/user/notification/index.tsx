"use client";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const NotificationPage: React.FC = () => {
  return (
    <Grid columns="1">
      <Box>
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link href="/home">
            <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
          </Link>
          <Text size="3" weight="medium">
            About TEE-UP
          </Text>
          <Link href="/" className="opacity-0">
            <Icons.plus className="text-primary w-[23px] h-[23px]" />
          </Link>
        </Flex>
      </Box>
      <Box>
        <Section py="4" px="3">
          <Heading mb="3">Notifications</Heading>
          <Box className="space-y-4">
            <Text className="text-sm">Notifications</Text>
          </Box>
        </Section>
      </Box>
    </Grid>
  );
};

export default NotificationPage;
