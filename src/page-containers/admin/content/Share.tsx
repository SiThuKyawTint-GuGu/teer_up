import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { copyUrl } from "@/utils/helper";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const Share: React.FC<{ url: string }> = ({ url }) => {
  const [copy, setCopy] = useState<boolean>(false);
  const domain: string = window.location.host;
  const shareLink = useMemo(() => domain + url, [domain, url]);
  return (
    <div className="bg-white w-full px-4  pb-2 ">
      <div className="bg-primary  rounded-[6px]  w-[60px] h-[2px] mx-auto" />
      <Text className="text-[24px] font-[700]">Share To</Text>
      <Flex gap="5" className="py-[15px]">
        <Flex direction="column" align="center" className=" cursor-pointer pe-[32px]">
          <Flex
            justify="center"
            className="bg-slateGray w-[40px] h-[40px] gap-3 flex justify-center items-center rounded-full cursor-pointer"
            onClick={() => {
              copyUrl(shareLink);
              setCopy(true);
            }}
          >
            <Icons.shareLink className="text-[24px]  text-white text-center" />
          </Flex>
          <Text as="div">Copy Link</Text>
        </Flex>

        <Flex direction="column" align="center" className="cursor-pointer pe-[32px]">
          <Link href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target="_blank">
            <Icons.facebook className="w-[40px] h-[40px] text-[#4167b2]" />

            <Text as="div">Facebook</Text>
          </Link>
        </Flex>

        <Flex direction="column" align="center" className="curosr-pointer pe-[32px]">
          <Link href={`https://t.me/share/url?url=${shareLink}`} target="_blank">
            <Icons.telegram className="w-[40px] h-[40px] text-[#26a4e2]" />
            <Text as="div">Telegram</Text>
          </Link>
        </Flex>
      </Flex>
      {copy && (
        <Text as="div" className="text-green-700 w-full text-center">
          Copied
        </Text>
      )}
    </div>
  );
};

export default Share;
