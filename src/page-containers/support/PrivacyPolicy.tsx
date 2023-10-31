"use client";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Heading, Link, Section } from "@radix-ui/themes";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <Grid columns="1">
      <Box>
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link href={`/profile/setting`}>
            <Icons.caretLeft className="text-[#373A36] w-[23px] h-[23px]" />
          </Link>
          <Text size="3" weight="medium">
            Privacy Policy
          </Text>
          <Link href="/" className="opacity-0">
            <Icons.plus className="text-primary w-[23px] h-[23px]" />
          </Link>
        </Flex>
      </Box>
      <Box>
        <Section py="4" px="3">
          <Heading mb="3">Privacy Policy</Heading>
          <Text weight="light">
            Lorem ipsum dolor sit amet consectetur. Pharetra sed habitant nullam odio blandit nascetur faucibus. Turpis
            quis ligula sit maecenas pretium ante commodo quis velit. Id et augue in fermentum pellentesque diam.
            Ultricies at turpis eget in vitae sit velit id proin. Lorem ipsum dolor sit amet consectetur. Pharetra sed
            habitant nullam odio blandit nascetur faucibus. Turpis quis ligula sit  maecenas pretium ante commodo quis
            velit. Id et augue in fermentum pellentesque diam. Ultricies at turpis eget in vitae sit velit id proin.
            Lorem ipsum dolor sit amet consectetur. Pharetra sed habitant nullam odio blandit nascetur faucibus. Turpis
            quis ligula sit maecenas pretium ante commodo quis velit. Id et augue in fermentum pellentesque diam.
            Ultricies at turpis eget in vitae sit velit id proin.
          </Text>
        </Section>
      </Box>
    </Grid>
  );
};

export default PrivacyPolicy;
