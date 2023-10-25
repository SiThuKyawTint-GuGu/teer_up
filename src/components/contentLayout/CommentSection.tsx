import CmtInput from "@/components/ui/Inputs/CmtInput";

import { useGetComment, usePostComment } from "@/services/content";
import { ParamsType } from "@/services/user";
import { CommentData, CommentResponse, ContentData } from "@/types/Content";
import { showTime } from "@/utils/time";
import { Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { Text } from "../ui/Typo/Text";
type CommentSectionProp = {
  data: ContentData;
  mutateParentData: () => any;
};
const CommentSection: React.FC<CommentSectionProp> = ({ data, mutateParentData }) => {
  const [cursor, setCursor] = useState<number>(0);
  const { data: cmtsArray, mutate: mutateCmt } = useGetComment<ParamsType>(data.id, {
    cursor: cursor,
    pageSize: 10,
  });

  // const pp: any = useMemo(() => cmtsArray?.flatMap(page => page?.data) || [], [cmtsArray]);

  // console.log(pp);

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
    if (cmtsArray && cmtsArray.length > 0) {
      const lastElementOfCmtArray = cmtsArray[cmtsArray.length - 1];
      const contentData: ContentData[] = lastElementOfCmtArray.data;
      const lastIdofComments = contentData[contentData.length - 1].id;
      setCursor(parseInt(lastIdofComments));
    }
  };
  const [commentValue, setCommentValue] = useState<string>("");
  return (
    <div className="w-full z-[99] pb-[50px] h-[60vh] bg-white">
      <div className="w-full rounded-t-[16px] h-full flex flex-col justify-end p-[8px] z-[9] text-black">
        <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
        <div className="my-3 text-[16px] font-[600]">
          {cmtsArray && cmtsArray.length > 0 && cmtsArray[0].total}comments
        </div>
        <Flex direction="column" justify="between" className="w-full h-full">
          {cmtsArray && cmtsArray.length > 0 && (
            <div className="overflow-y-auto">
              <div>
                {cmtsArray.map((cmts: CommentResponse, cmtArrayIndex: number) => (
                  <div key={cmtArrayIndex}>
                    {cmts?.data.length !== 0 && (
                      <>
                        {cmts?.data.map((data: CommentData, index: number) => (
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
                        {cmts.hasNextPage && (
                          <div className="text-primary cursor-pointer" onClick={moreReply}>
                            More Replies
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="w-full z-[9]">
            <div className="w-full flex font-[16px]">
              <CmtInput setValue={setCommentValue} value={commentValue} />
              <button
                onClick={postSubmitHandler}
                className={`${isMutating ? "text-slateGray" : "text-primary"} p-1`}
                disabled={isMutating}
              >
                Send
              </button>
            </div>
          </div>
        </Flex>

        {/* Comment Input */}
      </div>
    </div>
  );
};

export default CommentSection;
