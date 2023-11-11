import CmtInput from "@/components/contentLayout/CmtInput";

import { useGetComment, usePostComment } from "@/services/content";
import { CommentData, ContentData } from "@/types/Content";
import { showTime } from "@/utils/time";
import { Flex } from "@radix-ui/themes";
import React, { useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { Text } from "../ui/Typo/Text";
type CommentSectionProp = {
  data: ContentData;
  mutateParentData: () => any;
  total: number;
};
const CommentSection: React.FC<CommentSectionProp> = ({ data, mutateParentData, total }) => {
  const { data: cmtsArray, mutate: mutateCmt, setSize } = useGetComment(data.id);

  const commentDataArray: any = useMemo(() => cmtsArray?.flatMap(page => page?.data) || [], [cmtsArray]);
  console.log(cmtsArray);
  const { trigger: postComment, isMutating } = usePostComment();

  const postSubmitHandler = async () => {
    const formData = {
      // parent_id: data.id,
      id: data.id,
      comment: commentValue,
    };
    await postComment(formData, {
      onSuccess: () => {
        mutateCmt();
        mutateParentData();
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
        <div className="my-3 text-[16px] font-[600]">{total} comments</div>
        <Flex direction="column" justify="between" className="w-full h-full">
          <div className="overflow-y-auto h-[45vh]">
            <div>
              <div>
                {commentDataArray && commentDataArray.length > 0 && (
                  <>
                    {commentDataArray.map((data: CommentData, index: number) => (
                      <div className="flex items-start  w-full h-full mb-2  " key={index}>
                        <div className="bg-slateGray  rounded-full w-[32px] h-[32px]" />
                        <div className="flex flex-col w-full ms-2">
                          <div className="flex items-center flex-wrap gap-x-2">
                            <Text as="div" className="text-[16px] font-[600]">
                              {data.user.name}
                            </Text>
                            <Text as="span" className="text-[14px] font-[300]">
                              {showTime(data.created_at)}
                            </Text>
                          </div>
                          <div className="text-start">{data.comment}</div>
                        </div>
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
            <div className="w-full flex font-[16px]">
              <CmtInput setValue={setCommentValue} value={commentValue} />
              <Button
                onClick={postSubmitHandler}
                className={`${isMutating ? "text-slateGray" : "text-primary"} p-1`}
                disabled={isMutating}
                loading={isMutating}
                variant="destructive"
              >
                Send
              </Button>
            </div>
          </div>
        </Flex>

        {/* Comment Input */}
      </div>
    </div>
  );
};

export default CommentSection;
