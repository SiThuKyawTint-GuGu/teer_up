import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { copyUrl } from "@/utils/helper";
import { Flex } from "@radix-ui/themes";
import React, { useState } from "react";

const Share: React.FC = () => {
  const [copy, setCopy] = useState<boolean>(false);
  return (
    <div className="bg-white w-screen  max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
      <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
      <div className="text-[24px] font-[700]">Share To</div>
      <Flex gap="5" className="py-[20px]">
        <Flex direction="column" align="center">
          <Flex
            justify="center"
            className="bg-slateGray w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
            onClick={() => {
              copyUrl();
              setCopy(true);
            }}
          >
            <Icons.shareLink className="text-[24px]  text-white text-center" />
          </Flex>
          <Text as="div">Copy Link</Text>
        </Flex>

        {/* <Flex direction="column" align="center" className="cursor-pointer">
          <Icons.facebook className="w-[40px] h-[40px] text-[#4167b2]" />

          <Text as="div">Facebook</Text>
        </Flex> */}

        {/* <Flex direction="column" align="center" className="curosr-pointer">
          <Icons.telegram className="w-[40px] h-[40px] text-[#26a4e2]" />
          <Text as="div">Telegram</Text>
        </Flex> */}
      </Flex>
      {copy && (
        <Text as="div" className="text-green-700 w-full text-center">
          Copy
        </Text>
      )}
    </div>
  );
};

export default Share;
