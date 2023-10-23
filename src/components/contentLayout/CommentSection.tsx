import CmtInput from "@/components/ui/Inputs/CmtInput";
import { Text } from "@/components/ui/Typo/Text";

import { useGetComment, usePostComment } from "@/services/content";
import { ParamsType } from "@/services/user";
import { CommentData, CommentResponse, ContentData } from "@/types/Content";
import { showTime } from "@/utils/time";
import React, { useState } from "react";
type CommentSectionProp = {
  data: ContentData;
  mutateParentData: () => any;
};
const CommentSection: React.FC<CommentSectionProp> = ({ data, mutateParentData }) => {
  const { data: cmtsArray, mutate: mutateCmt } = useGetComment<ParamsType>(data.id, {
    cursor: 1,
    pageSize: 20,
  });

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
  const [commentValue, setCommentValue] = useState<string>("");
  return (
    <div className="pb-5">
      <div className="w-fullrounded-t-[16px] bg-white p-[8px] z-[9999999] text-black">
        <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
        <div className="my-3 text-[16px] font-[600]">
          {cmtsArray && cmtsArray.length > 0 && cmtsArray[0].total}comments
        </div>
        {cmtsArray && cmtsArray.length > 0 && (
          <div className="h-[50vh] overflow-y-auto">
            {cmtsArray.map((cmts: CommentResponse, index: number) => (
              <div key={index}>
                {cmts?.data.length !== 0 &&
                  cmts?.data.map((data: CommentData, index: number) => (
                    <div className="flex items-start  w-full h-full mb-2 z-[9999999] " key={index}>
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
              </div>
            ))}
          </div>
        )}

        {/* Comment Input */}
        <div className="w-full h-full relative z-[9999999]">
          <div className=" w-full">
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
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
