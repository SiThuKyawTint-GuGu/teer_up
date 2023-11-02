import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Typo/Text";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CommentSection from "../../../../components/contentLayout/CommentSection";
import Share from "./Share";

type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  redir: string;
};

const ContentLayout: React.FC<ContentlayoutProps> = ({ data, contentMutate, redir }) => {
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);

  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };

  const saveContent = async () => {
    await contentSave(
      {
        id: data.id,
      },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };

  return (
    <Dialog open={openModal} onOpenChange={val => setOpenModal(val)}>
      <div className="w-full bg-white shadow-lg rounded-lg h-[90%] justify-start flex-col">
        <div className="h-full w-full flex flex-col">
          <div className="w-full h-[70%]  mx-auto relative">
            <Link href={redir}>
              <div
                className="relative w-full max-w-[400px] h-full  rounded-t-lg"
                style={{
                  background: `url(${data.image_url}) center / cover`,
                }}
              >
                {data.type !== "video" && (
                  <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg uppercase">
                    {data.type}
                  </div>
                )}
              </div>
            </Link>
          </div>
          <div className="w-full h-full">
            <div className="w-full h-full px-3">
              <div className="flex flex-col justify-between w-full h-full">
                <Link href={redir}>
                  <h1 className="font-[700] text-[24px]">{data.title}</h1>
                  {data.description && (
                    <div className="w-full h-full">
                      <div className="flex flex-col w-full">
                        <Text>
                          {data.description.slice(0, 100)}

                          {data.description.length > 100 && (
                            <Text as="span" className="text-primary">
                              {"..."}See more
                            </Text>
                          )}
                        </Text>
                      </div>
                    </div>
                  )}
                </Link>
                <div>
                  <div className="mt-2 cursor-pointer  w-full flex justify-between flex-col">
                    {data.type === "event" && <Button onClick={() => router.push(redir)}>Join Now</Button>}
                    {data.type === "opportunity" && <Button onClick={() => router.push(redir)}>Apply Now</Button>}
                    {data.type === "pathway" && <Button onClick={() => router.push(redir)}>Join Now</Button>}
                    {data.type === "mentor" && <Button onClick={() => router.push(redir)}>Request Mentorship</Button>}
                  </div>
                  <div className="flex justify-between p-3 w-full">
                    <button className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
                      {data.is_liked ? (
                        <Icons.likefill className="w-[20px] h-[20px] text-primary" />
                      ) : (
                        <Icons.like className="w-[20px] h-[20px]" />
                      )}
                      <div>
                        {""}
                        {data.likes}
                      </div>
                    </button>
                    <DialogTrigger>
                      <div className="flex items-center flex-wrap gap-x-[10px]">
                        <Icons.comment className="w-[20px] h-[20px]" />
                        <div>
                          {""}
                          {data.comments}
                        </div>
                      </div>
                    </DialogTrigger>
                    <button className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
                      {data.is_saved ? (
                        <Icons.savedFill className="w-[20px] h-[20px] text-primary" />
                      ) : (
                        <Icons.saved className="w-[20px] h-[20px]" />
                      )}

                      <div>
                        {""}
                        {data.saves}
                      </div>
                    </button>

                    <button className="flex items-center flex-wrap gap-x-1" onClick={() => setOpenShare(true)}>
                      <Icons.share className="w-[20px] h-[20px]" />
                      <div>
                        {""}
                        Share
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
          <CommentSection data={data} mutateParentData={contentMutate} />
        </DialogContent>
      )}
      {openShare && (
        <Modal onClose={() => setOpenShare(false)}>
          <Share url={`/content/${data.slug}`} />
        </Modal>
      )}
    </Dialog>
  );
};

export default ContentLayout;
