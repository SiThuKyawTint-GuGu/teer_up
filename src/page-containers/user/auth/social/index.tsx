"use client";
import { Icons } from "@/components/ui/Images";
import { LogosLinkedinIcon, SkillIconsInstagram } from "@/components/ui/Images/Icons";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialAuth: React.FC = () => {
  const router = useRouter();

  return (
    <Grid columns="1">
      <Box className="h-[100dvh-96px]" p="4">
        <Flex direction="column" position="relative" height="100%">
          <Flex justify="between" align="center">
            <Button onClick={() => router.back()} className="p-0" variant="ghost">
              <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
            </Button>
          </Flex>
          <Flex direction="column" mt="6" gap="5">
            <button className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold">
              Login with
              <FcGoogle size={28} />
            </button>
            <button className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold">
              Login with
              <LogosLinkedinIcon />
            </button>
            <button className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold">
              Login with
              <SkillIconsInstagram />
            </button>
          </Flex>
        </Flex>
      </Box>
    </Grid>
  );
};

export default SocialAuth;
