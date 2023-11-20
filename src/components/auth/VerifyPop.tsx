"use client";

import { useVerifyModal } from "@/store/authStore";
import { Box, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/Button";
import { Dialog, DialogContent } from "../ui/Dialog";
import { Text } from "../ui/Typo/Text";

const VerifyPop: React.FC = () => {
  const { openVerifyModal, verifyModalCloseHandler } = useVerifyModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Dialog open={openVerifyModal}>
        <DialogContent isClose={true} closeStyles="top-3 right-3" handleOnClose={verifyModalCloseHandler}>
          <Box width="100%" className="bg-white h rounded-md px-4 pb-6 pt-12">
            <Flex position="relative" direction="column" gap="5" className="space-y-4">
              <Text className="w-full text-center text-[28px] font-[700]">You&apos;re not logged in</Text>
              <Text className="w-full text-center">
                Log in now to comment and save the contents for better experience
              </Text>
              <Button
                disabled={isPending}
                className="mb-4"
                onClick={() => {
                  verifyModalCloseHandler();
                  startTransition(() => {
                    router.push("/auth/login");
                  });
                }}
              >
                Login
              </Button>
            </Flex>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerifyPop;
