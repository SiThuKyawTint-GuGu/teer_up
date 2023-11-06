import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typo/Text";
import ReactionBar from "@/page-containers/admin/content/ReactionBar";
import { ContentData } from "@/types/Content";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  redir: string;
  contentRef?: any;
  contentVisible?: boolean;
  index?: number;
};

const ContentLayout: React.FC<ContentlayoutProps> = ({ data, contentMutate, redir }) => {
  const router = useRouter();
  const [ispending, startTransition] = useTransition();

  return (
    <div className="w-full  rounded-lg h-[90%] justify-start flex-col">
      <div className="h-full w-full flex flex-col bg-white shadow-lg">
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
                  <Button
                    disabled={ispending}
                    onClick={() =>
                      startTransition(() => {
                        router.push(`/content/${data.slug}`);
                      })
                    }
                  >
                    {(data.type === "event" || data.type === "pathway") && "Join Now"}
                    {data.type === "opportunity" && "Apply Now"}
                    {data.type === "mentor" && "Request Mentorship"}
                  </Button>
                </div>

                <ReactionBar data={data} contentMutate={contentMutate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
