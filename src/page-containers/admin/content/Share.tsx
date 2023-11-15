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
    <div className="bg-white w-full">
      <div className="bg-primary rounded-[6px]  w-[60px] h-[2px] mx-auto" />
      <Text className="text-[24px] font-[700]">Share To</Text>
      <Flex gap="5" className="py-[15px]">
        <Flex direction="column" align="center" className=" cursor-pointer me-[32px]">
          <Flex
            justify="center"
            className="bg-slateGray w-[40px] h-[40px] gap-3 flex justify-center items-center rounded-full cursor-pointer"
            onClick={() => {
              copyUrl(shareLink);
              setCopy(true);
            }}
          >
            <Icons.shareLink className="text-[24px]  text-white text-center mb-1" />
          </Flex>
          <Text as="div" className="text-center">
            Copy Link
          </Text>
        </Flex>

        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
          className="w-full h-full items-center me-[32px] flex flex-col"
          target="_blank"
        >
          <Icons.facebook className="w-[40px] h-[40px] text-[#4167b2] mb-1" />
          <Text as="div" className="text-center ">
            Facebook
          </Text>
        </Link>

        <Link
          href={`https://t.me/share/url?url=${shareLink}`}
          target="_blank"
          className="w-full h-full items-center me-[32px] flex flex-col"
        >
          <Icons.telegram className="w-[40px] h-[40px] text-[#26a4e2] mb-1" />
          <Text as="div" className="text-center">
            Telegram
          </Text>
        </Link>

        <Link
          href={`https://api.whatsapp.com/send?text=${shareLink}`}
          target="_blank"
          className="w-full h-full items-center me-[32px] flex flex-col"
        >
          <Icons.whatapp className="w-[40px] h-[40px] text-green-600 mb-1" />
          <Text as="div" className="text-center w-full">
            WhatsApp
          </Text>
        </Link>
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
