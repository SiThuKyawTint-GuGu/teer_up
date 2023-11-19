"use client";

import Share from "@/page-containers/admin/content/Share";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { Dialog, DialogContent } from "../ui/Dialog";
import { Icons } from "../ui/Images";
import { Text } from "../ui/Typo/Text";

type ContentDetailHeaderProps = {
  title: string;
};
const ContentDetailHeader: React.FC<ContentDetailHeaderProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    <Dialog open={modalOpen} onOpenChange={val => setModalOpen(val)}>
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
        {modalOpen && (
          // <Modal onClose={() => setModalOpen(false)}>
          //   <Share url={pathname} />
          // </Modal>
          <DialogContent className="top-[initial] bottom-0 max-w-[400px] pt-[10px] mx-auto translate-y-0 ">
            <Share url={pathname} />
          </DialogContent>
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
