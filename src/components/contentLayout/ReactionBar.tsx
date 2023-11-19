import CommentSection from "@/components/contentLayout/CommentSection";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import { getToken } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import Share from "../../page-containers/admin/content/Share";
import { Text } from "../ui/Typo/Text";

enum dialogTrigger {
  COMMENT = "comment",
  SHARE = "share",
}

interface ReactionBarProp {
  data: ContentData;
  contentMutate: any;
  comments: number;
  setComments: any;
}

const ReactionBar: React.FC<ReactionBarProp> = ({ data, contentMutate, comments, setComments }) => {
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<dialogTrigger>();
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();
  const token = getToken();
  const [reaction, setReaction] = useState({
    likes: 0,
    is_like: false,
    saves: 0,
    is_save: false,
  });

  useEffect(() => {
    setReaction(prev => ({
      ...prev,
      saves: data.saves,
      is_save: data.is_saved,
      likes: data.likes,
      is_like: data.is_liked,
    }));
  }, [data]);

  const likePost = async () => {
    if (reaction.is_like && token) {
      setReaction(prev => ({ ...prev, likes: prev.likes - 1, is_like: false }));
    }
    if (!reaction.is_like && token) {
      setReaction(prev => ({ ...prev, likes: prev.likes + 1, is_like: true }));
    }
    await like({ id: data.id });
  };

  const saveContent = async () => {
    if (reaction.is_save && token) {
      setReaction(prev => ({ ...prev, saves: prev.saves - 1, is_save: false }));
    }
    if (!reaction.is_save && token) {
      setReaction(prev => ({ ...prev, saves: prev.saves + 1, is_save: true }));
    }
    await contentSave({
      id: data.id,
    });
  };

  return (
    <>
      <Dialog onOpenChange={val => !val && setIsCopied(!isCopied)}>
        <div className="w-full py-2">
          <div className="flex justify-between items-center">
            <button className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
              {reaction.is_like ? (
                <Icons.likeFill className="w-[20px] h-[20px] text-primary" />
              ) : (
                <Icons.like className="w-[20px] h-[20px]" />
              )}
              <div className={reaction.is_like ? "text-primary" : ""}>{reaction.likes}</div>
            </button>

            {/**
             * comment button trigger
             */}
            <DialogTrigger onClick={() => setTriggerType(dialogTrigger.COMMENT)}>
              <div
                className="flex items-center flex-wrap gap-x-[10px]"
                // onClick={() => {
                //   setOpenComment(true);
                // }}
              >
                <Icons.comment className="w-[20px] h-[20px]" />
                <div>{comments}</div>
              </div>
            </DialogTrigger>

            {/* {openComment && (
                <DialogContent className="top-[initial] mx-auto bottom-0 max-w-[400px] translate-y-0">
                  <CommentSection data={data} mutateParentData={contentMutate} setComments={setComments} />
                </DialogContent>
              )} */}

            <button className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
              {reaction.is_save ? (
                <Icons.savedFill className="w-[20px] h-[20px] text-primary" />
              ) : (
                <Icons.saved className="w-[20px] h-[20px]" />
              )}

              <div className={reaction.is_save ? "text-primary" : ""}>
                {""}
                {reaction.saves}
              </div>
            </button>

            {/**
             * share button trigger
             */}
            <DialogTrigger onClick={() => setTriggerType(dialogTrigger.SHARE)}>
              <div className="flex items-center flex-wrap gap-x-1 cursor-pointer" onClick={() => setOpenShare(true)}>
                <Icons.share className="w-[20px] h-[20px]" />
                <div>Share</div>
              </div>
            </DialogTrigger>
            {/* <DialogContent className="top-[initial] mx-auto   bottom-0 max-w-[400px] translate-y-0">
                {openShare && <Share url={`/content/${data.slug}`} />}
              </DialogContent> */}
          </div>
        </div>
        <DialogContent className={cn("bg-white top-[initial] bottom-0 px-0 py-2 translate-y-0 rounded-16px-tl-tr")}>
          {triggerType === dialogTrigger.COMMENT ? (
            <CommentSection data={data} mutateParentData={contentMutate} setComments={setComments} />
          ) : (
            <Share url={`/content/${data.slug}`} onClickCopied={setIsCopied} />
          )}
        </DialogContent>
        {isCopied && (
          <DialogContent className="border-0 shadow-none outline-none">
            <Flex justify="center">
              <Box className="w-[180px] px-6 py-3 rounded-full bg-white">
                <Flex justify="center" align="center" className="gap-x-2">
                  <Image src="/uploads/icons/checkmark.svg" width={24} height={24} alt="check" />
                  <Text className="text-[#373A36] text-lg font-semibold">Link copied</Text>
                </Flex>
              </Box>
            </Flex>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ReactionBar;
