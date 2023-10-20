import { Icons } from "@/components/ui/Images";
import { useLikeContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import Image from "next/image";
import React from "react";

type ContentlayoutProps = {
  children: React.ReactNode;
  data: ContentData;
  contentMutate: any;
  type: string;
};

const ContentLayout: React.FC<ContentlayoutProps> = ({ children, data, contentMutate, type }) => {
  const { trigger: like } = useLikeContent();
  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };
  return (
    <div className="w-full h-full">
      <div className="w-full mx-auto relative p-2">
        <Image
          src={data.image_url}
          className="w-full h-[200px]"
          width={358}
          height={200}
          alt={data.title}
        />
        <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg">
          {type}
        </div>
      </div>
      <div className="w-full px-[16px] bg-white">
        <div>
          <h1 className="font-[700] text-[24px]">{data.title}</h1>
          <div className="h-[40vh]">{children}</div>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex items-center flex-wrap gap-x-[10px]">
            <Icons.like className="w-[26px]" onClick={likePost} />
            <div>
              {""}
              {data.likes}
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-x-[10px]">
            <Icons.comment className="w-[26px]" />
            <div>
              {""}
              {data.comments}
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-x-[10px]">
            <Icons.saved className="w-[26px]" />
            <div>{""}0</div>
          </div>
          <div className="flex items-center flex-wrap gap-x-1">
            <Icons.share className="w-[26px]" />
            <div>
              {""}
              Shares
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
