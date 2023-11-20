import CmtInput from "@/components/contentLayout/CmtInput";
import { useGetComment, useLikeComment, usePostComment } from "@/services/content";
import { CommentData, ContentData } from "@/types/Content";
import { showTime } from "@/utils/time";
import * as Avatar from "@radix-ui/react-avatar";
import { Flex } from "@radix-ui/themes";
import React, { FormEvent, useEffect, useMemo, useState } from "react";

import { cn } from "@/utils/cn";
import { Button } from "../ui/Button";
import { Icons } from "../ui/Images";
import { Text } from "../ui/Typo/Text";

interface CommentSectionProp {
  data: ContentData;
  mutateParentData: () => any;
  setComments: any;
}

const CommentSection: React.FC<CommentSectionProp> = ({ data, setComments }) => {
  const { data: cmtData, mutate: mutateCmt, setSize } = useGetComment(data.id);

  const commentDataArray: any = useMemo(() => cmtData?.flatMap(page => page?.data) || [], [cmtData]);
  const { trigger: postComment, isMutating } = usePostComment();
  const [commentValue, setCommentValue] = useState<string>("");

  const postSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      // parent_id: data.id,
      id: data.id,
      comment: commentValue,
    };
    setComments((prev: number) => prev + 1);
    await postComment(formData, {
      onSuccess: () => {
        mutateCmt();
        // mutateParentData();
        setCommentValue("");
      },
    });
  };

  const moreReply = () => {
    if (commentDataArray && commentDataArray.length > 0) {
      const lastCommentId = commentDataArray[commentDataArray.length - 1].id;
      setSize(parseInt(lastCommentId));
    }
  };

  return (
    <div className="w-full z-[9999] h-[60vh] bg-white">
      <div className="w-full h-full text-black space-y-4">
        <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
        <div className="space-y-4">
          <Text className="text-[16px] font-[600] px-4">
            {cmtData && cmtData.length > 0 && cmtData[0].total} comments
          </Text>
          <Flex direction="column" justify="between" width="100%" height="100%">
            <div className="overflow-y-auto h-[45vh] no-scrollbar px-4">
              <div>
                {commentDataArray && commentDataArray.length > 0 && (
                  <>
                    {commentDataArray.map((comment: CommentData, index: number) => (
                      <Flex direction="column" className="w-full h-full" key={index}>
                        <SingleComment
                          data={comment}
                          parentData={data}
                          mutateCmt={mutateCmt}
                          lastItem={index === (commentDataArray ? commentDataArray.length - 1 : -1)}
                        />
                      </Flex>
                    ))}
                    {cmtData && cmtData.length > 0 && cmtData[cmtData.length - 1].hasNextPage && (
                      <div
                        className="text-primary cursor-pointer"
                        onClick={() => {
                          moreReply();
                        }}
                      >
                        More Replies
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="w-full px-4 border-top-line pt-2">
              <form onSubmit={postSubmitHandler} autoFocus={false} className="w-full flex">
                <CmtInput className="bg-[#5B6770] bg-opacity-10" setValue={setCommentValue} value={commentValue} />
                <Button
                  type="submit"
                  className={`${isMutating ? "text-slateGray" : "text-primary font-[600] text-[16px]"} p-1`}
                  disabled={isMutating || commentValue === ""}
                  variant="destructive"
                >
                  Send
                </Button>
              </form>
            </div>
          </Flex>
        </div>

        {/* Comment Input */}
      </div>
    </div>
  );
};

export default CommentSection;

type SingleCommentProp = {
  data: CommentData;
  parentData: ContentData;
  mutateCmt: any;
  lastItem?: boolean;
};

const SingleComment: React.FC<SingleCommentProp> = ({ data, parentData, mutateCmt, lastItem }) => {
  const [reaction, setReaction] = useState({
    likes: 0,
    is_liked: false,
  });

  useEffect(() => {
    setReaction(prev => ({
      ...prev,
      ["likes"]: data.comment_likes,
      ["is_liked"]: data.is_liked,
    }));
  }, [data]);

  const { trigger: likeComment } = useLikeComment();
  const LikeCommentHandler = async () => {
    if (reaction.is_liked) {
      setReaction(prev => ({
        ...prev,
        ["likes"]: prev.likes - 1,
        ["is_liked"]: false,
      }));
    }
    if (!reaction.is_liked) {
      setReaction(prev => ({
        ...prev,
        ["likes"]: prev.likes + 1,
        ["is_liked"]: true,
      }));
    }

    await likeComment(
      {
        parent_id: parentData.id,
        id: data.id,
      },
      {
        onSuccess: () => {
          mutateCmt();
        },
      }
    );
  };

  return (
    <Flex>
      {/* <div
        className="rounded-full w-[32px] h-[32px]"
        style={{
          background: `url(${data.user.profile_url ?? "/uploads/icons/user-profile.svg"}) center / cover `,
        }}
      /> */}
      <Avatar.Root className="bg-blackA1 mr-[6px] grow-0 shrink-0 basis-[32px] inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={data?.user?.profile_url}
          alt="User profile"
        />
        <Avatar.Fallback
          style={{ backgroundColor: "#FFC5C5" }}
          className={`text-violet11   leading-1 flex h-full w-full items-center justify-center  text-[15px] font-medium`}
          delayMs={600}
        >
          {data?.user?.name[0]}
        </Avatar.Fallback>
      </Avatar.Root>
      <Flex direction="column" width="100%" className={cn("pb-4 mb-4", !lastItem && "border-line")}>
        <Flex align="center" wrap="wrap" width="100%" className="gap-x-2">
          <Text as="div" className="text-[16px] font-[600]">
            {data.user.name}
          </Text>
          <Text as="span" className="text-[14px] font-[300]">
            {showTime(data.created_at)}
          </Text>
          <Flex justify="end" align="center" className="flex-1 gap-x-1 w-full">
            {!reaction.is_liked ? (
              <Icons.like className="w-[16px] h-[16px]" onClick={LikeCommentHandler} />
            ) : (
              <Icons.likeFill className="w-[16px] h-[16px] text-primary" onClick={LikeCommentHandler} />
            )}
            {reaction.likes}
          </Flex>
        </Flex>
        <div className="text-start">{data.comment}</div>
        {/* <hr className="h-[1px] my-[16px] bg-slateGray w-full" /> */}
      </Flex>
    </Flex>
  );
};
