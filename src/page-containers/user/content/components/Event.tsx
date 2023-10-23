import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typo/Text";
import { ContentData } from "@/types/Content";
import { useRouter } from "next/navigation";
import React from "react";
import ContentLayout from "./ContentLayout";
type EventProps = {
  data: ContentData;
  contentMutate: any;
};
const Event: React.FC<EventProps> = ({ data, contentMutate }) => {
  const router = useRouter();
  return (
    <ContentLayout data={data} contentMutate={contentMutate}>
      <div
        className="mt-2 cursor-pointer  h-full w-full flex justify-between flex-col"
        onClick={() => router.push(`/events/${data.slug}`)}
      >
        {data.description && (
          <div>
            <div className="flex flex-col">
              {(() => {
                const temporaryDiv = document.createElement("div");
                temporaryDiv.innerHTML = data.description && data.description.toString();
                if (!temporaryDiv.textContent) return "";
                if (temporaryDiv.textContent.length > 300)
                  return temporaryDiv.textContent.substring(0, 300) + "...";
                return temporaryDiv.textContent;
              })()}
              <Text as="span" className="text-primary">
                See more
              </Text>
            </div>
          </div>
        )}

        <Button>Join Now</Button>
      </div>
    </ContentLayout>
  );
};

export default Event;
