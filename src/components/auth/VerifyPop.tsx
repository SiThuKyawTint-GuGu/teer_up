"use client";

import { useVerifyModal } from "@/store/authStore";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/Button";
import { Icons } from "../ui/Images";
import Modal from "../ui/Modal";
import { Text } from "../ui/Typo/Text";

const VerifyPop: React.FC = () => {
  const { openVerifyModal, verifyModalCloseHandler } = useVerifyModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {openVerifyModal && (
        <Modal onClose={() => verifyModalCloseHandler()}>
          <Flex className="px-[16px] py-[40px] w-full  max-w-[400px]" position="relative" direction="column" gap="5">
            <Text as="div" className="w-full text-center text-[36px] font-700">
              You&apos;re not logg in
            </Text>
            <Text as="div" className="w-full text-center">
              Log in now to comment and save the contents for better experience
            </Text>
            <Button
              size="lg"
              disabled={isPending}
              className="mb-5"
              onClick={() =>
                startTransition(() => {
                  router.push("/auth/login");
                })
              }
            >
              Login
            </Button>
            <div className="absolute top-3 right-3" onClick={verifyModalCloseHandler}>
              <Icons.closeCircle className="w-[24px] h-[24px] text-slateGray" />
            </div>
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default VerifyPop;
