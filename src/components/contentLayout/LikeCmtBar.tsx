"use client";
import { useLikeContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { Button } from "../ui/Button";
import { Icons } from "../ui/Images";

type Props = {
  data: ContentData;
  mutate: any;
};
const LikeCmtBar: React.FC<Props> = ({ data, mutate }) => {
  const { trigger: like } = useLikeContent();

  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => mutate(),
      }
    );
  };
  return (
    <div className="bg-white flex py-5 items-center">
      {data.type === "event" && (
        <Button size="sm" className="w-[166px]">
          Join now
        </Button>
      )}
      {data.type === "opportunity" && (
        <Button size="sm" className="w-[166px]">
          Apply now
        </Button>
      )}

      <div className="flex justify-between p-3 w-full flex-1">
        <div className="flex items-center flex-wrap gap-x-[5px]">
          <Icons.like
            className={`w-[20px] h-[20px] ${data.is_liked && "text-primary"}`}
            onClick={likePost}
          />
          <div className="text-[14px]">{data.likes}</div>
        </div>
        <DialogTrigger>
          <div className="flex items-center flex-wrap  gap-x-[5px]">
            <Icons.comment className="w-[20px] h-[20px]" />
            <div>{data.comments}</div>
          </div>
        </DialogTrigger>
        <div className="flex items-center flex-wrap  gap-x-[5px]">
          <Icons.saved className="w-[20px] h-[20px]" />
          <div>0</div>
        </div>
      </div>
    </div>
  );
};

export default LikeCmtBar;
