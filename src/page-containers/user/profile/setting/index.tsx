"use client";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { logout } from "@/utils/auth";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { mutate } from "swr";

const Setting: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    logout();
    mutate(
      () => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: false } // do not revalidate
    );
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={val => {
        setOpen(val);
      }}
    >
      <Grid columns="1">
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link className="block" href={"/profile"}>
            <div className="cursor-pointer">
              <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
            </div>
          </Link>
          <Text size="3" className="font-[400]">
            Settings
          </Text>
          <Icons.plus className="text-primary w-[23px] h-[23px] opacity-0" />
        </Flex>
        <Box className="bg-white" mt="5">
          <Section py="4" px="3">
            {/* <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
              <Flex justify="between" align="start">
                <Text as="label" weight="bold" size="3">
                  Allow Notification
                </Text>
                <Switch />
              </Flex>
            </div> */}
            <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
              <Link className="block" href="/about">
                <Flex justify="between" align="start">
                  <Text as="label" className="font-[400]" size="3">
                    About TEE-UP
                  </Text>
                  <Icons.caretRight className="w-[25px!important] h-[25px!important]" />
                </Flex>
              </Link>
            </div>
            <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
              <Link className="block" href="/support/consent">
                <Flex justify="between" align="start">
                  <Text as="label" className="font-[400]" size="3">
                    Consent
                  </Text>
                  <Icons.caretRight className="w-[25px] h-[25px]" />
                </Flex>
              </Link>
            </div>
            <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
              <Link className="block" href="/support/hope-action-theory">
                <Flex justify="between" align="start">
                  <Text as="label" className="font-[400]" size="3">
                    Underlying Theories
                  </Text>
                  <Icons.caretRight className="w-[25px] h-[25px]" />
                </Flex>
              </Link>
            </div>
            <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
              <Link className="block" href="https://www.prudential.com.sg/Privacy-Notice" target="_blank">
                <Flex justify="between" align="start">
                  <Text as="label" className="font-[400]" size="3">
                    Privacy Policy
                  </Text>
                  <Icons.link className="w-[25px] h-[25px]" />
                </Flex>
              </Link>
            </div>
            <div>
              <Link className="block" href="/setting/refer-friend">
                <Flex justify="between" align="start">
                  <Text as="label" className="font-[400]" size="3">
                    Refer a friend
                  </Text>
                  <Icons.caretRight className="w-[25px] h-[25px]" />
                </Flex>
              </Link>
            </div>
            {/* <div className="pb-[15px] mb-[15px] border-b border-b-[#BDC7D5]">
              <Flex justify="between" align="start">
                <Text as="label" weight="bold" size="3">
                  Feedback
                </Text>
                <Icons.caretRight />
              </Flex>
            </div> */}
          </Section>
        </Box>
        <Box className="bg-white" mt="5" p="2">
          <DialogTrigger className="w-full text-primary">
            <Flex justify="center" className="font-bold" align="center">
              Log out
            </Flex>
          </DialogTrigger>
        </Box>
      </Grid>
      <DialogContent isClose={false} className="border-none shadow-none">
        <Flex justify="center" align="center">
          <div className="text-center bg-white h-[270px] p-4 rounded-lg">
            <Text className="text-[#373A36] text-[26px] font-[700] mb-3">Are you sure to log out of account?</Text>
            <Text className="text-[#373A36] mb-6">
              You won’t receive any messages from the app. But you could log in again with your email address.
            </Text>
            <Flex justify="center" className="gap-3">
              <Button className="w-1/2 font-[600]" onClick={handleLogout} loading={isPending}>
                Log out
              </Button>
              <DialogClose className="w-1/2">
                <Button className="w-full" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </Flex>
          </div>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default Setting;
