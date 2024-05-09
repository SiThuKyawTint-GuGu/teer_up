"use client";
import { Icons } from "@/components/ui/Images";
import { LogosLinkedinIcon, SkillIconsInstagram } from "@/components/ui/Images/Icons";
import { useOAuthLogin } from "@/services/user";
import { setLocalStorage } from "@/utils";
import { setUserInfo } from "@/utils/auth";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  forLogin?: boolean;
};

const SocialAuth: React.FC = ({ forLogin = true }: Props) => {
  const { isMutating, trigger } = useOAuthLogin();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: codeResponse => {
      trigger(
        { accessToken: codeResponse.access_token },
        {
          onSuccess: res => {
            setUserInfo(res.data.token, res.data.data);
            startTransition(() => {
              if (forLogin) {
                router.push("/");
              } else {
                setLocalStorage("content", 0);
                router.push("/industry");
              }
              router.refresh();
            });
          },
        }
      );
    },
  });

  return (
    <Grid columns="1">
      <Box className="h-[100dvh-96px]" p="4">
        <Flex direction="column" position="relative" height="100%">
          <Flex justify="between" align="center">
            <Button onClick={() => router.back()} className="p-0" variant="ghost">
              <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
            </Button>
          </Flex>
          <Flex direction="column" mt="6" gap="4">
            <button
              onClick={() => loginWithGoogle()}
              className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold"
            >
              <FcGoogle size={28} />
              {isMutating || isPending ? "Loading..." : "Login with"} Google
            </button>
            <button className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold">
              <LogosLinkedinIcon />
              Login with LinkedIn
            </button>
            <button className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold">
              <SkillIconsInstagram />
              Login with Instagram
            </button>
          </Flex>
        </Flex>
      </Box>
    </Grid>
  );
};

export default SocialAuth;
