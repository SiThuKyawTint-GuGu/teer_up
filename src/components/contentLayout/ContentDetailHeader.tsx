"use client";

import Share from "@/page-containers/user/content/components/Share";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../ui/Images";
import Modal from "../ui/Modal";
import { Text } from "../ui/Typo/Text";

type ContentDetailHeaderProps = {
  title: string;
};
const ContentDetailHeader: React.FC<ContentDetailHeaderProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-between h-[48px] items-center   bg-white fixed top-0 w-full max-w-[400px] mx-auto">
      <div onClick={() => router.back()}>
        <Icons.back className="w-[20px] h-[20px]" />
      </div>
      <Text as="div" className="capitalize">
        {title}
      </Text>
      <div onClick={() => setModalOpen(true)}>
        <Icons.share className="w-[20px] h-[20px]" />
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <Share url={pathname} />
        </Modal>
      )}
    </div>
  );
};

export default ContentDetailHeader;
