"use client";

import { Animate, Dialog, DialogClose, DialogContent } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import Share from "@/page-containers/admin/content/Share";
import { cn } from "@/utils/cn";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Box, Flex } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import styled from "styled-components";

type ContentDetailHeaderProps = {
  title: string;
};
const ContentDetailHeader: React.FC<ContentDetailHeaderProps> = ({ title }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const textRef = useRef<any>();
  const divRef = useRef<any>();
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current && divRef.current) {
        const shouldShowMarquee = textRef.current.offsetWidth > divRef.current.offsetWidth;
        setShouldMarquee(shouldShowMarquee);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [title]);

  return (
    <Dialog onOpenChange={val => !val && setIsCopied(false)}>
      <div className="flex justify-between h-[48px] z-50  items-center bg-white fixed top-0 w-full max-w-[400px] mx-auto">
        <div
          className="w-[40px] h-full flex items-center px-2 justify-start cursor-pointer"
          onClick={() => router.back()}
        >
          <Icons.back className="w-[20px] h-[20px]" />
        </div>
        <div className="flex justify-center" style={{ width: 300, padding: "0 20px" }} ref={divRef}>
          {shouldMarquee ? (
            <Marquee>
              <MarqueeText
                className="capitalize font-[600] text-[16px] flex justify-start items-center gap-5"
                ref={textRef}
              >
                <span>{title}</span>
                <span />
              </MarqueeText>
            </Marquee>
          ) : (
            <MarqueeText className="capitalize font-[600] text-[16px]" ref={textRef}>
              {title}
            </MarqueeText>
          )}
        </div>

        <DialogTrigger>
          <div onClick={() => setModalOpen(true)} className="w-[40px] h-[48px] justify-end flex items-center  px-2">
            <Icons.share className="w-[20px] h-[20px]" />
          </div>
        </DialogTrigger>
        <DialogContent
          animate={Animate.SLIDE}
          className={cn("bg-white top-[initial] bottom-0 px-0 py-2 translate-y-0 rounded-16px-tl-tr")}
        >
          <Share url={pathname} onClickCopied={setIsCopied} />
        </DialogContent>
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
      </div>
    </Dialog>
  );
};

export default ContentDetailHeader;

const MarqueeText = styled(Text)`
  /* text-wrap: nowrap; */
  white-space: nowrap;
`;
