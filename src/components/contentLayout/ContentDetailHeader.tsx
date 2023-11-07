"use client";

import Share from "@/page-containers/admin/content/Share";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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

  return (
    <div className="flex justify-between h-[48px] z-50 px-2 items-center bg-white fixed top-0 w-full max-w-[400px] mx-auto">
      <div onClick={() => router.back()}>
        <Icons.back className="w-[20px] h-[20px]" />
      </div>
      <Text as="div" className="capitalize">
        {title}
      </Text>
      <Dialog open={modalOpen} onOpenChange={val => setModalOpen(val)}>
        <DialogTrigger>
          <div onClick={() => setModalOpen(true)}>
            <Icons.share className="w-[20px] h-[20px]" />
          </div>
        </DialogTrigger>
        {modalOpen && (
          // <Modal onClose={() => setModalOpen(false)}>
          //   <Share url={pathname} />
          // </Modal>
          <DialogContent className="bg-white top-[initial] h-auto bottom-0 max-w-[400px] px-4 translate-y-0 rounded-10px-tl-tr">
            <Share url={pathname} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ContentDetailHeader;
