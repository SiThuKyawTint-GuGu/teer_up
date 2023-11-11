import CmtInput from "@/components/contentLayout/CmtInput";

import { useGetComment, useLikeComment, usePostComment } from "@/services/content";
import { CommentData, ContentData } from "@/types/Content";
import { showTime } from "@/utils/time";
import { Flex } from "@radix-ui/themes";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { Icons } from "../ui/Images";
import { Text } from "../ui/Typo/Text";
type CommentSectionProp = {
  data: ContentData;
  mutateParentData: () => any;
  total: number;
};
const CommentSection: React.FC<CommentSectionProp> = ({ data, mutateParentData, total }) => {
  const { data: cmtsArray, mutate: mutateCmt, setSize } = useGetComment(data.id);

  const commentDataArray: any = useMemo(() => cmtsArray?.flatMap(page => page?.data) || [], [cmtsArray]);
  const { trigger: postComment, isMutating } = usePostComment();

  const postSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      // parent_id: data.id,
      id: data.id,
      comment: commentValue,
    };
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

  const [commentValue, setCommentValue] = useState<string>("");

  return (
    <div className="w-full z-[9999]  h-[60vh] bg-white">
      <div className="w-full rounded-t-[16px] h-full flex flex-col justify-end p-[8px] z-[9] text-black">
        <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
        <div className="my-3 text-[16px] font-[600]">
          {cmtsArray && cmtsArray.length > 0 && cmtsArray[0].total} comments
        </div>
        <Flex direction="column" justify="between" className="w-full h-full">
          <div className="overflow-y-auto h-[45vh]">
            <div>
              <div>
                {commentDataArray && commentDataArray.length > 0 && (
                  <>
                    {commentDataArray.map((comment: CommentData, index: number) => (
                      <div className="flex items-start  w-full h-full mb-2  " key={index}>
                        <SingleComment data={comment} parentData={data} mutateCmt={mutateCmt} />
                      </div>
                    ))}
                    {cmtsArray && cmtsArray.length > 0 && cmtsArray[cmtsArray.length - 1].hasNextPage && (
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
          </div>

          <div className="w-full z-[9]">
            <form onSubmit={postSubmitHandler} className="w-full flex font-[16px]">
              <CmtInput setValue={setCommentValue} value={commentValue} />
              <Button
                type="submit"
                className={`${isMutating ? "text-slateGray" : "text-primary"} p-1`}
                disabled={isMutating || commentValue === ""}
                variant="destructive"
              >
                Send
              </Button>
            </form>
          </div>
        </Flex>

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
};
const SingleComment: React.FC<SingleCommentProp> = ({ data, parentData, mutateCmt }) => {
  const [reaction, setReacion] = useState({
    likes: 0,
    is_liked: false,
  });

  useEffect(() => {
    setReacion(prev => ({
      ...prev,
      ["likes"]: data.comment_likes,
      ["is_liked"]: data.is_liked,
    }));
  }, [data]);

  console.log("re", reaction);
  const { trigger: likeComment } = useLikeComment();
  const LikeCommentHandler = async () => {
    if (reaction.is_liked) {
      setReacion(prev => ({
        ...prev,
        ["likes"]: prev.likes - 1,
        ["is_liked"]: false,
      }));
    }
    if (!reaction.is_liked) {
      setReacion(prev => ({
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
    <>
      <div
        className="rounded-full w-[32px] h-[32px]"
        style={{
          background: `url(${data.user.profile_url ?? "/mainLogo.png"}) center / cover `,
        }}
      />

      <div className="flex flex-col w-full ms-2">
        <div className="flex w-full items-center flex-wrap gap-x-2">
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
              <Icons.likefill className="w-[16px] h-[16px] text-primary" onClick={LikeCommentHandler} />
            )}
            {reaction.likes}
          </Flex>
        </div>

        <div className="text-start">{data.comment}</div>
      </div>
    </>
  );
};
