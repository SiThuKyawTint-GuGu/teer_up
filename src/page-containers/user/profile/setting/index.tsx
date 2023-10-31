"use client";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Typo/Text";
import { logout } from "@/utils/auth";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Setting: React.FC = () => {
  const router = useRouter();
  return (
    <Grid columns="1">
      <Flex justify="between" align="center" className="bg-white" p="3">
        <Link href={`/profile`}>
          <Icons.caretLeft className="text-[#373A36] w-[23px] h-[23px]" />
        </Link>
        <Text size="3" weight="medium">
          Settings
        </Text>
        <Icons.plus className="text-primary w-[23px] h-[23px] opacity-0" />
      </Flex>
      <Box className="bg-white" mt="5">
        <Section py="4" px="3">
          <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="start">
              <Text as="label" weight="bold" size="3">
                Allow Notification
              </Text>
              <Switch />
            </Flex>
          </div>
          <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
            <Link href="/about">
              <Flex justify="between" align="start">
                <Text as="label" weight="bold" size="3">
                  About TEE-UP
                </Text>
                <Icons.caretRight />
              </Flex>
            </Link>
          </div>
          <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
            <Link href="/support/privacy-policy">
              <Flex justify="between" align="start">
                <Text as="label" weight="bold" size="3">
                  Privacy Policy
                </Text>
                <Icons.caretRight />
              </Flex>
            </Link>
          </div>
          <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="start">
              <Text as="label" weight="bold" size="3">
                Feedback
              </Text>
              <Icons.caretRight />
            </Flex>
          </div>
        </Section>
      </Box>
      <Box className="bg-white" mt="5" p="2">
        <Flex
          justify="center"
          align="start"
          onClick={() => {
            logout();
            router.push("/home");
          }}
        >
          <Button className="w-full" variant="link">
            Log out
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
};

export default Setting;
