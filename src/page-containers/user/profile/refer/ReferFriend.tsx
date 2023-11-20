"use client";
import { Button } from "@/components/ui/Button";
import { Animate, Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import Share from "@/page-containers/admin/content/Share";
import { getUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const ReferFriend = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const user = getUserInfo();
  console.log(user);
  return (
    <Dialog onOpenChange={val => !val && setIsCopied(false)}>
      <Grid columns="1">
        <Box>
          <Flex justify="between" align="center" className="bg-white" p="3">
            <Link href="/profile/setting">
              <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
            </Link>
            <Text size="3" weight="medium">
              Refer a friend
            </Text>
            <Link href="/" className="opacity-0">
              <Icons.plus className="text-primary w-[23px] h-[23px]" />
            </Link>
          </Flex>
        </Box>
        <Box>
          <Section py="4" px="3">
            <Heading mb="3">Refer a friend</Heading>
            <Box className="space-y-4">
              <Text className="text-[16px] font-[400]">
                This is the text for how the refer works. And how this action would benefit both parties.
              </Text>
              <Text className="text-[16px] font-[400]">
                nascetur faucibus. Turpis quis ligula sit maecenas pretium anlandit nascetur faucibus. Turpis quis
                ligula sit
              </Text>
              <Text className="text-[16px] font-[400]">
                maecenas pretium ante commodo quis velit. Id et augue in fermentum pellentesque diam. Ultricies at
                turpis eget in vitae sit velit id proin. Lorem ipsum dolor sit amet consectetur. Pharetra sed habitant
                nullam odio blandit nascetur faucibus. Turpis quis ligula
              </Text>
            </Box>
          </Section>
          <div className="px-2">
            <DialogTrigger className="w-full">
              <Button onClick={() => setModalOpen(true)} className="w-full font-[600] text-[18px] ">
                Share Link
              </Button>
            </DialogTrigger>
          </div>
        </Box>
      </Grid>
      {modalOpen && (
        // <Modal onClose={() => setModalOpen(false)}>
        //   <Share url={pathname} />
        // </Modal>
        <DialogContent
          animate={Animate.SLIDE}
          className={cn("bg-white top-[initial] bottom-0 px-0 py-2 translate-y-0 rounded-16px-tl-tr")}
        >
          <Share
            url={`/auth/signup?referalCode=${user.referral_code}`}
            header={"Share Link To"}
            onClickCopied={setIsCopied}
          />
        </DialogContent>
      )}
      {isCopied && (
        <DialogClose asChild>
          <DialogContent animate={Animate.SLIDE} className="border-0 shadow-none outline-none">
            <Flex justify="center" align="center">
              <Box className="w-[180px] h-[52px] px-6 py-3 rounded-full bg-white">
                <Flex justify="center" align="center" className="gap-x-2">
                  <Image src="/uploads/icons/checkmark.svg" width={24} height={24} alt="check" />
                  <Text className="text-[#373A36] text-lg font-semibold">Link copied</Text>
                </Flex>
              </Box>
            </Flex>
          </DialogContent>
        </DialogClose>
      )}
    </Dialog>
  );
};

export default ReferFriend;
