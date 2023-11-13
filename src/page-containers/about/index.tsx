"use client";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const About: React.FC = () => {
  return (
    <Grid columns="1">
      <Box>
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link href="/profile/setting">
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
          <Heading mb="3">TEE-UP</Heading>
          <Box className="space-y-4">
            <Text weight="light">
              Hey there! When it comes to figuring out your career path, things can get pretty tricky these days. Big
              changes like the pandemic, globalization, and new technology have completely shaken up the job world.
              Turns out, a lot of us are kind of lost in figuring out how to make our careers work in this new
              landscape.
            </Text>
            <Text weight="light">
              Traditional ways of planning your career just don’t cut it anymore. But guess what? There&#39;s this cool
              new theory called the Hope-Action Theory, created in 2010. It’s like a guidebook based on research from
              top experts that helps you steer through all these modern career challenges.
            </Text>
            <Text weight="light">
              This theory is all about learning how to understand yourself better as you change and grow, and using that
              knowledge to find the right job that really fires you up. It’s got steps like looking back at your
              journey, getting a clear picture of what you want, setting goals, making plans, and being ready to adapt
              along the way. These steps are like your secret weapons for finding your way in this ever-evolving career
              world!
            </Text>
          </Box>
        </Section>
      </Box>
    </Grid>
  );
};

export default About;
