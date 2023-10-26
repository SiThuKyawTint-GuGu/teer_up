import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CommentSection from "../../../../components/contentLayout/CommentSection";

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
      <div className="w-full h-full">
        <div className="w-full mx-auto relative p-2">
          <Link href={redir}>
            <Image
              src={data.image_url}
              className="w-full"
              width={400}
              height={200}
              alt={data.title}
            />
          </Link>

          <div className="absolute z-[999] top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg uppercase">
            {data.type}
          </div>
        </div>
        <div className="w-full h-full bg-white">
          <CardBox className="w-full px-3">
            <h1 className="font-[700] text-[24px]">{data.title}</h1>
            <div>
              <Link href={redir}>
                <div className="mt-2 cursor-pointer  h-full w-full flex justify-between flex-col">
                  {data.description && (
                    <div className="w-full h-full">
                      <div className="flex flex-col w-full h-[40vh]">
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
                  {data.type === "event" && (
                    <Button onClick={() => router.push(redir)}>Join Now</Button>
                  )}
                  {data.type === "opportunity" && (
                    <Button onClick={() => router.push(redir)}>Apply Now</Button>
                  )}
                  {data.type === "pathway" && (
                    <Button onClick={() => router.push(redir)}>Join Now</Button>
                  )}
                </div>
              </Link>
            </div>
            <div className="flex justify-between p-3 w-full">
              <div className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
                {data.is_liked ? (
                  <Icons.likefill className="w-[20px] h-[20px] text-primary" />
                ) : (
                  <Icons.like className="w-[20px] h-[20px]" />
                )}
                <div>
                  {""}
                  {data.likes}
                </div>
              </div>
              <DialogTrigger>
                <div className="flex items-center flex-wrap gap-x-[10px]">
                  <Icons.comment className="w-[20px] h-[20px]" />
                  <div>
                    {""}
                    {data.comments}
                  </div>
                </div>
              </DialogTrigger>
              <div className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
                {data.is_saved ? (
                  <Icons.savedFill className="w-[20px] h-[20px] text-yellow-400" />
                ) : (
                  <Icons.saved className="w-[20px] h-[20px]" />
                )}

                <div>
                  {""}
                  {data.saves}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-x-1">
                <Icons.share className="w-[20px] h-[20px]" />
                <div>
                  {""}
                  Share
                </div>
              </div>
            </div>
          </CardBox>
          <div className="py-4 text-center font-[300] w-full">Swipe up for more</div>
        </div>
      </div>
      {openModal && (
        <DialogContent className="absolute top-[initial] bottom-0 w-full z-[99999]">
          <CommentSection data={data} mutateParentData={contentMutate} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ContentLayout;
