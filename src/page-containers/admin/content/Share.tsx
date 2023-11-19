import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { copyUrl } from "@/utils/helper";
import { Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import React, { useMemo } from "react";

const Share: React.FC<{ url: string; onClickCopied: (arg: boolean) => void }> = ({ url, onClickCopied }) => {
  // const [copy, setCopy] = useState<boolean>(false);
  const domain: string = window.location.host;
  const shareLink = useMemo(() => `https://` + domain + url, [domain, url]);

  return (
    <div className="bg-white w-full">
      <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
      <Text className="text-[24px] font-[700] px-4">Share To</Text>
      <Grid columns="4" className="py-[15px]">
        <Flex direction="column" align="center" className="cursor-pointer space-y-1">
          <Flex
            justify="center"
            align="center"
            className="bg-[#BDC7D5] w-10 h-10 rounded-full cursor-pointer"
            onClick={() => {
              copyUrl(shareLink);
              onClickCopied(true);
            }}
          >
            <Icons.shareLink className="text-2xl text-white text-center" />
          </Flex>
          <Text as="div" className="text-center">
            Copy Link
          </Text>
        </Flex>

        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
          className="w-full h-full items-center flex flex-col space-y-1"
          target="_blank"
        >
          <Icons.facebook className="w-[40px] h-[40px] text-[#4167b2]" />
          <Text as="div" className="text-center ">
            Facebook
          </Text>
        </Link>

        <Link
          href={`https://t.me/share/url?url=${shareLink}`}
          target="_blank"
          className="w-full h-full items-center flex flex-col space-y-1"
        >
          <Icons.telegram className="w-[40px] h-[40px] text-[#26a4e2]" />
          <Text as="div" className="text-center">
            Telegram
          </Text>
        </Link>

        <Link
          href={`https://api.whatsapp.com/send?text=${shareLink}`}
          target="_blank"
          className="w-full h-full items-center flex flex-col space-y-1"
        >
          <Icons.whatapp className="w-[40px] h-[40px] text-green-600" />
          <Text as="div" className="text-center w-full">
            WhatsApp
          </Text>
        </Link>
      </Grid>

      {/* {copy && (
        <Text as="div" className="text-green-700 w-full text-center">
          Copied
        </Text>
      )} */}
    </div>
  );
};

export default Share;
